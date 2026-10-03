"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_pixelRatio;
  
  // Noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  // Fractal Brownian Motion
  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
      v += a * snoise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y; // correct aspect ratio
    
    // Mouse magnetic field
    vec2 mouse = u_mouse.xy / u_resolution.xy;
    mouse.x *= u_resolution.x / u_resolution.y;
    float distToMouse = distance(st, mouse);
    float mouseInfluence = smoothstep(0.6, 0.0, distToMouse);
    
    // Grid (Subtle technical)
    vec2 gridUv = gl_FragCoord.xy;
    float grid1 = smoothstep(0.0, 1.0, 1.0 - abs(mod(gridUv.x, 40.0) - 20.0));
    float grid2 = smoothstep(0.0, 1.0, 1.0 - abs(mod(gridUv.y, 40.0) - 20.0));
    float gridLines = max(grid1, grid2) * 0.02; // very subtle
    
    // Domain Warping
    vec2 q = vec2(0.0);
    q.x = fbm(st + 0.00 * u_time);
    q.y = fbm(st + vec2(1.0));
    
    vec2 r = vec2(0.0);
    // mouse pulls the noise field
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time + mouseInfluence * 0.5);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time - mouseInfluence * 0.5);
    
    float f = fbm(st + r);
    
    // Colors
    vec3 bgColor = vec3(0.02, 0.024, 0.031); // #050608 base
    vec3 color1 = vec3(1.0, 0.3, 0.0); // #FF4D00 Orange
    vec3 color2 = vec3(0.3, 0.05, 0.0); // Dark red-orange
    vec3 color3 = vec3(0.05, 0.05, 0.06); // Dark charcoal
    
    // Mix based on noise
    vec3 finalColor = mix(bgColor, color3, clamp((f*f)*4.0, 0.0, 1.0));
    finalColor = mix(finalColor, color2, clamp(length(q), 0.0, 1.0));
    finalColor = mix(finalColor, color1, clamp(length(r.x), 0.0, 1.0) * 0.3 * (f * f * f));
    
    // Mouse glow interaction
    finalColor += color1 * mouseInfluence * 0.15;
    
    // Add grid overlay
    finalColor += vec3(gridLines);
    
    // Add subtle ambient noise/dithering to prevent banding
    float n = snoise(st * 500.0) * 0.02;
    finalColor += vec3(n);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function LiquidBackgroundWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    
    // Compile shader helper
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;
    
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);
    
    // Geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Uniforms
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    
    let animationFrameId: number;
    let startTime = Date.now();
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const resize = () => {
      // Limit pixel ratio for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      
      // Initial mouse target at center
      targetMouseX = canvas.width / 2;
      targetMouseY = canvas.height / 2;
      mouseX = targetMouseX;
      mouseY = targetMouseY;
    };
    
    window.addEventListener("resize", resize);
    resize();
    
    const handleMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      targetMouseX = e.clientX * dpr;
      targetMouseY = (window.innerHeight - e.clientY) * dpr; // WebGL Y is inverted
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    const render = () => {
      // Smooth interpolation for mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      gl.uniform1f(uTime, (Date.now() - startTime) * 0.001);
      gl.uniform2f(uMouse, mouseX, mouseY);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050608]">
      {/* WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-80 mix-blend-screen" 
      />
      
      {/* Quiet Zone for text readability */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_center,_rgba(5,6,8,0.7)_0%,_transparent_70%)] pointer-events-none" />

      {/* Static reduced motion fallback */}
      <div className="absolute inset-0 bg-[#050608] opacity-100 block md:hidden md:opacity-0 transition-opacity">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      </div>
    </div>
  );
}
