import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticleField = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── Sphere of particles ──
    const count = 2200;
    const positions = new Float32Array(count * 3);
    const radius = 1.8;

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even spread
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      // Add slight random offset so it looks organic not perfect
      const r = radius + (Math.random() - 0.5) * 0.3;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.018,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);

    // ── Inner glow core ──
    const coreGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.04,
      wireframe: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // ── Wireframe rings ──
    const ringData = [
      { radius: 1.8, tilt: 0 },
      { radius: 1.8, tilt: Math.PI / 3 },
      { radius: 1.8, tilt: -Math.PI / 4 },
    ];
    ringData.forEach(({ radius: r, tilt }) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.003, 2, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x5eead4,
        transparent: true,
        opacity: 0.15,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tilt;
      scene.add(ring);
    });

    // ── Mouse interaction ──
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ──
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ──
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      // Rotate sphere based on mouse + slow auto spin
      sphere.rotation.y += 0.0015 + target.x * 0.003;
      sphere.rotation.x += 0.0005 + target.y * 0.002;

      // Pulse core opacity
      core.material.opacity = 0.03 + Math.sin(Date.now() * 0.001) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="particle-field" />;
};

export default ParticleField;
