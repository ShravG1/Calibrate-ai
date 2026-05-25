import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Plasma fragment shader. Uses Ashima's 2D simplex noise + fBm with domain
// warping — sample noise at coordinates that are themselves perturbed by
// earlier noise. That's what gives the "flowing taffy" look instead of a
// shimmer-in-place. Three brand colours are mixed by the final noise value;
// a cursor-driven smoothstep adds a bright accent under the pointer.
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
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Ashima 2D simplex noise — public-domain reference implementation.
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

  // 4-octave fractal Brownian motion.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Domain warp — distort UVs with flowing noise. Time on the third
    // "axis" drives the flow.
    vec2 q;
    q.x = fbm(uv * 2.2 + vec2(0.0, uTime * 0.18));
    q.y = fbm(uv * 2.2 + vec2(uTime * 0.14, 0.0));

    // Second-level warp — sample noise of the first warp. Multiplied
    // domain warping is what gives the surface its taffy / oil-in-water
    // character.
    vec2 r;
    r.x = fbm(uv * 1.6 + q + vec2(uTime * 0.12, 0.0));
    r.y = fbm(uv * 1.6 + q + vec2(0.0, uTime * 0.10));

    float n = fbm(uv * 1.2 + r);

    // Brand palette — only these three colours, blended by noise value.
    vec3 teal = vec3(0.0, 1.0, 0.8);    // #00ffcc
    vec3 sky  = vec3(0.0, 0.67, 1.0);   // #00aaff
    vec3 blue = vec3(0.0, 0.33, 1.0);   // #0055ff

    // Remap noise (-1..1ish) to 0..1.
    float t = clamp(n * 0.5 + 0.5, 0.0, 1.0);
    vec3 color = mix(blue, sky, smoothstep(0.0, 0.55, t));
    color = mix(color, teal, smoothstep(0.5, 1.0, t));

    // Cursor glow — bright teal accent fading off at distance 0.4 in UV
    // space. Aspect-corrected so the glow stays roughly circular on wide
    // buttons.
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    float d = distance(vUv * aspect, uMouse * aspect);
    float glow = smoothstep(0.45, 0.0, d);
    color += teal * glow * 0.55;

    gl_FragColor = vec4(color, 0.78);
  }
`

// The shader-bearing plane. Lives inside <Canvas>, updates uniforms on
// every frame via useFrame.
function PlasmaPlane({ mouseRef }) {
  const matRef = useRef(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  )

  useFrame((state) => {
    const mat = matRef.current
    if (!mat) return
    mat.uniforms.uTime.value = state.clock.getElapsedTime()
    if (mouseRef && mouseRef.current) {
      mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
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

// AuraCanvas — R3F surface positioned absolutely above a button's gradient
// and below its text content. Mounted lazily on first hover so we don't
// allocate a WebGL context for buttons that are never interacted with;
// kept mounted once shown. frameloop toggles to 'demand' when inactive so
// the GPU isn't doing work on hidden canvases.
export default function AuraCanvas({ active, mouseRef }) {
  // Latch: once `active` has been true at least once, stay mounted. Set
  // during render (not in an effect) — this is the React-recommended
  // pattern for deriving sticky state from a prop.
  const [mounted, setMounted] = useState(false)
  if (active && !mounted) setMounted(true)

  if (!mounted) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity: active ? 1 : 0,
        transition: 'opacity 300ms ease',
      }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], near: 0, far: 2, zoom: 1 }}
        frameloop={active ? 'always' : 'demand'}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: false, premultipliedAlpha: false }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <PlasmaPlane mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
