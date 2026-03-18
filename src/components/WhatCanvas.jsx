import { useEffect, useRef } from "react";
import * as THREE from "three";

const WhatCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Floating orbs ──
    const orbData = [
      { x: -1.2, y:  0.6, z: 0,    size: 0.35, speed: 0.8,  color: 0x5eead4 },
      { x:  1.0, y: -0.8, z: -0.5, size: 0.22, speed: 1.2,  color: 0x22d3ee },
      { x: -0.4, y: -1.2, z: 0.3,  size: 0.18, speed: 0.6,  color: 0x14b8a6 },
      { x:  1.4, y:  1.0, z: -0.3, size: 0.28, speed: 1.0,  color: 0x5eead4 },
      { x:  0.2, y:  1.5, z: 0.2,  size: 0.14, speed: 1.4,  color: 0x22d3ee },
      { x: -1.5, y: -0.3, z: -0.2, size: 0.20, speed: 0.9,  color: 0x14b8a6 },
    ];

    const orbs = orbData.map(({ x, y, z, size, color }) => {
      const geo = new THREE.SphereGeometry(size, 32, 32);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15,
        wireframe: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);

      // Wireframe shell
      const wireMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.25,
        wireframe: true,
      });
      const wire = new THREE.Mesh(geo, wireMat);
      mesh.add(wire);

      return mesh;
    });

    // ── Connecting lines between orbs ──
    const lineMat = new THREE.LineBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.08 });
    const linePositions = [];
    orbData.forEach((a, i) => {
      orbData.forEach((b, j) => {
        if (j > i) {
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      });
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    // ── Mouse ──
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener("mousemove", onMouseMove);

    // ── Resize ──
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ──
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      target.x += (mouse.x - target.x) * 0.05;
      target.y += (mouse.y - target.y) * 0.05;

      orbs.forEach((orb, i) => {
        const d = orbData[i];
        // Float up/down
        orb.position.y = d.y + Math.sin(t * d.speed + i) * 0.2;
        orb.position.x = d.x + Math.cos(t * d.speed * 0.7 + i) * 0.1;
        // React to mouse
        orb.position.x += target.x * 0.15;
        orb.position.y += target.y * 0.15;
        orb.rotation.y += 0.005;
        orb.rotation.x += 0.003;
      });

      // Whole scene tilts with mouse
      scene.rotation.y = target.x * 0.3;
      scene.rotation.x = target.y * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="what-canvas" />;
};

export default WhatCanvas;
