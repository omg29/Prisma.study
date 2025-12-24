"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader with Prismatic Colors (Cyan & Magenta)
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        // Cyan color (#22D3EE) = rgb(34, 211, 238) normalized
        vec3 cyan = vec3(0.133, 0.827, 0.933);
        
        // Magenta color (#E879F9) = rgb(232, 121, 249) normalized
        vec3 magenta = vec3(0.910, 0.475, 0.976);
        
        // Purple accent (#A78BFA) = rgb(167, 139, 250) normalized
        vec3 purple = vec3(0.655, 0.545, 0.980);

        float intensity = 0.0;
        for(int i=0; i < 5; i++){
          intensity += lineWidth*float(i*i) / abs(fract(t - 0.01*float(i))*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
        }
        
        // Mix between cyan, magenta, and purple based on position and time
        float mixFactor = sin(length(uv) * 3.0 - t * 2.0) * 0.5 + 0.5;
        float mixFactor2 = cos(uv.x * 2.0 + t) * 0.5 + 0.5;
        
        vec3 color1 = mix(cyan, magenta, mixFactor);
        vec3 color2 = mix(magenta, purple, mixFactor2);
        vec3 finalColor = mix(color1, color2, 0.5) * intensity;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)

    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    // Initial resize
    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: "#000",
        overflow: "hidden",
        zIndex: -1,
      }}
    />
  )
}
