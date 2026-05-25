import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Full-viewport plasma shader. Same conceptual basis as AuraCanvas (Ashima
// simplex + domain-warped fBm) but tuned for the bigger surface area:
//   - 3 octaves instead of 4 (cheaper per-pixel at full-screen scale)
//   - Lower spatial frequency (noise sampled at 0.8–1.4 instead of 1.2–2.2)
//     so the colour regions are large and recognisable
//   - Slower time multipliers (0.05–0.10 instead of 0.10–0.18) so it reads
//     as ambient drift, not an active animation
//   - More transparent (alpha 0.55) so section content stays legible
//   - uScrollY drives a subtle palette shift teal-dominant → blue-dominant
//     as the user scrolls down the page
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScrollY;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // 3-octave fBm — one octave cheaper than the button aura.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Aspect-correct UV so the noise pattern doesn't horizontally stretch
    // on wide viewports.
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 uv = vUv * aspect;

    // Domain warp — first noise sample perturbs UVs.
    vec2 q;
    q.x = fbm(uv * 0.9 + vec2(0.0, uTime * 0.06));
    q.y = fbm(uv * 0.9 + vec2(uTime * 0.05, 0.0));

    // Second warp — sample noise at the first-warped position.
    vec2 r;
    r.x = fbm(uv * 1.2 + q + vec2(uTime * 0.08, 0.0));
    r.y = fbm(uv * 1.2 + q + vec2(0.0, uTime * 0.07));

    float n = fbm(uv * 1.4 + r);
    float t = clamp(n * 0.5 + 0.5, 0.0, 1.0);

    // Brand palette.
    vec3 teal = vec3(0.0, 1.0, 0.8);    // #00ffcc
    vec3 sky  = vec3(0.0, 0.67, 1.0);   // #00aaff
    vec3 blue = vec3(0.0, 0.33, 1.0);   // #0055ff

    // Scroll-driven shift: at the top of the page (uScrollY ≈ 0) the teal
    // anchor lands earlier in the palette ramp; near the bottom the ramp
    // shifts toward blue dominance. Subtle — a 0.15-unit shift across the
    // full document.
    float shift = clamp(uScrollY, 0.0, 1.0) * 0.15;

    vec3 color = mix(blue, sky, smoothstep(0.0, 0.55 - shift, t));
    color = mix(color, teal, smoothstep(0.55 - shift, 1.0, t));

    // Vignette toward the edges so the centre of the viewport reads as
    // brighter / more "active." Tightened (0.5..1.0 instead of 0.7..1.0)
    // to preserve the centre-vs-edge contrast after the 1.4× brightness
    // lift below pushes mid-tones toward saturation.
    float dist = distance(vUv, vec2(0.5));
    float vignette = smoothstep(0.9, 0.3, dist);
    color *= mix(0.5, 1.0, vignette);

    // Brightness lift so the plasma bands actually pop. Channels that
    // exceed 1.0 clamp at display — the highlight tones drift toward
    // pure cyan as intended (the brand's "energy" reading).
    color *= 1.4;

    gl_FragColor = vec4(color, 0.85);
  }
`

function PlasmaPlane() {
  const matRef = useRef(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollY: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  )

  useFrame((state) => {
    const mat = matRef.current
    if (!mat) return
    mat.uniforms.uTime.value = state.clock.getElapsedTime()

    // Normalised scroll progress (0..1 across the document). Reading
    // scrollY / scrollHeight every frame is cheap — both are getters that
    // don't force a layout when nothing has changed.
    if (typeof window !== 'undefined') {
      const doc = document.documentElement
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1)
      mat.uniforms.uScrollY.value = window.scrollY / max
    }

    const { width, height } = state.size
    mat.uniforms.uResolution.value.set(width, height)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

// HeroShaderBackground — full-viewport ambient plasma. Mounted by App as
// a sibling to the rest of the page tree, positioned fixed behind all
// content. DPR capped at 1.5 so retina screens don't double the fragment
// shader cost across the whole viewport.
export default function HeroShaderBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ overflow: 'hidden' }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], near: 0, far: 2, zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, premultipliedAlpha: false }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <PlasmaPlane />
      </Canvas>
    </div>
  )
}
