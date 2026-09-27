import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/sound';

interface NetworkCoreProps {
  onNodeClick?: () => void;
  pulseTrigger?: number;
}

export const NetworkCore3D: React.FC<NetworkCoreProps> = ({ onNodeClick, pulseTrigger }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const pulseRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    if (pulseTrigger) {
      pulseRef.current = 1.0;
      sound.playPulse(580, 0.1);
    }
  }, [pulseTrigger]);

  useEffect(() => {
    // Check if user has prefers-reduced-motion active
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWebGLFailed(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    // Performance optimization: IntersectionObserver to pause loop when out of viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = isMobile ? 26 : 24;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile, // antialias on desktop, disabled on low-power mobile for battery optimization
        powerPreference: 'high-performance'
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      // Clamp pixel ratio to 1.5 on mobile to avoid GPU thermal throttling
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLFailed(true);
      return;
    }

    // Geometry: Geodesic network sphere with nodes and lines (fewer nodes on mobile for maximum battery & frame rate efficiency)
    const nodeCount = isMobile ? 28 : 42;
    const radius = isMobile ? 7.5 : 8.5;
    const nodePositions: THREE.Vector3[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < nodeCount; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodeGeometry = new THREE.SphereGeometry(isMobile ? 0.28 : 0.24, isMobile ? 8 : 12, isMobile ? 8 : 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00629B,
      transparent: true,
      opacity: 0.85
    });

    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: 0x0284C7,
      transparent: true,
      opacity: 0.95
    });

    const nodeMeshes: THREE.Mesh[] = [];
    nodePositions.forEach((pos, idx) => {
      const mesh = new THREE.Mesh(nodeGeometry, idx % 5 === 0 ? highlightMaterial : nodeMaterial);
      mesh.position.copy(pos);
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
    });

    // Connection lines
    const linePositions: number[] = [];
    const maxDistance = isMobile ? 6.8 : 6.2;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = nodePositions[i].distanceTo(nodePositions[j]);
        if (d < maxDistance) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00629B,
      transparent: true,
      opacity: isMobile ? 0.28 : 0.22
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodeGroup.add(lines);

    // Inner wireframe sphere
    const coreGeometry = new THREE.IcosahedronGeometry(isMobile ? 3.6 : 4.2, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x0284C7,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    nodeGroup.add(coreMesh);

    // Mouse & Touch Drag Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerPosition.x;
        const deltaY = e.clientY - previousPointerPosition.y;
        nodeGroup.rotation.y += deltaX * (isMobile ? 0.012 : 0.008);
        nodeGroup.rotation.x += deltaY * (isMobile ? 0.012 : 0.008);
      }
      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip GPU render when hero is scrolled out of viewport
      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!isDragging) {
        nodeGroup.rotation.y += 0.0035;
        nodeGroup.rotation.x = mouse.y * 0.25;
        nodeGroup.rotation.z = mouse.x * 0.15;
      }

      coreMesh.rotation.y -= 0.005;

      if (pulseRef.current > 0) {
        pulseRef.current -= delta * 1.5;
        const scale = 1 + Math.sin(pulseRef.current * Math.PI) * 0.12;
        nodeGroup.scale.set(scale, scale, scale);
        lineMaterial.opacity = (isMobile ? 0.28 : 0.22) + Math.max(0, pulseRef.current) * 0.45;
      } else {
        nodeGroup.scale.set(1, 1, 1);
        lineMaterial.opacity = isMobile ? 0.28 : 0.22;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  if (webGLFailed) {
    return <NetworkCoreFallback />;
  }

  return (
    <div
      ref={mountRef}
      onClick={() => {
        sound.playPulse(620, 0.08);
        onNodeClick?.();
      }}
      style={{ touchAction: 'pan-y' }} // Allows smooth vertical native page scrolling while touching on phones
      className="w-full h-full cursor-grab active:cursor-grabbing relative select-none"
      aria-label="Interactive 3D Network Core"
    />
  );
};

export const NetworkCoreFallback: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 select-none">
      <svg className="w-full h-full max-w-xs sm:max-w-md max-h-xs sm:max-h-md text-[#00629B]/30 animate-pulse" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="30" r="5" fill="#00629B" />
        <circle cx="170" cy="100" r="5" fill="#00629B" />
        <circle cx="100" cy="170" r="5" fill="#00629B" />
        <circle cx="30" cy="100" r="5" fill="#00629B" />
        <circle cx="145" cy="55" r="4" fill="#0284C7" />
        <circle cx="55" cy="145" r="4" fill="#0284C7" />
        <line x1="100" y1="30" x2="170" y2="100" stroke="#00629B" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="170" y1="100" x2="100" y2="170" stroke="#00629B" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="100" y1="170" x2="30" y2="100" stroke="#00629B" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="30" y1="100" x2="100" y2="30" stroke="#00629B" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="145" y1="55" x2="55" y2="145" stroke="#0284C7" strokeWidth="0.8" strokeOpacity="0.3" />
      </svg>
    </div>
  );
};
