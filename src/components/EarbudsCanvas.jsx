'use client';
import { useRef, useLayoutEffect, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function Model() {
  const groupRef = useRef();
  const caseMeshes = useRef([]);
  const rightEarbudMeshes = useRef([]);
  const leftEarbudParts = useRef([]);
  const bobTween = useRef(null);

  const { scene, animations } = useGLTF('/models/earbuds.gltf');
  const { actions } = useAnimations(animations, groupRef);

  // 1. FRONT PAGE INITIAL ANIMATION (Fixed Autoplay on Load)
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimName = Object.keys(actions)[0];
      const action = actions[firstAnimName];
      if (action) {
        action.reset();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.play(); // Auto-plays on page refresh
      }
    }
  }, [actions]);

  // 2. Classify Meshes
  useLayoutEffect(() => {
    const cMeshes = [];
    const rightBud = [];
    const leftBudParts = [];

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.castShadow = true;
        child.receiveShadow = true;

        const name = child.name.toLowerCase();

        if (name.includes('case') || name.includes('box') || name.includes('lid') || name.includes('body_1')) {
          cMeshes.push(child);
        } else if (name.includes('right') || name.includes('r_') || name.includes('002')) {
          rightBud.push(child);
        } else {
          leftBudParts.push({
            mesh: child,
            origPos: child.position.clone(),
          });
        }
      }
    });

    leftBudParts.sort((a, b) => a.origPos.z - b.origPos.z || a.origPos.x - b.origPos.x);

    caseMeshes.current = cMeshes;
    rightEarbudMeshes.current = rightBud;
    leftEarbudParts.current = leftBudParts;
  }, [scene]);

  // 3. Scroll Animations Sync
  useGSAP(() => {
    if (!groupRef.current) return;

    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // ==============================================
    // PAGE 1 -> PAGE 2 (ACOUSTICS)
    // ==============================================
    tl.to(groupRef.current.position, { x: -1.0, y: -0.5, z: 0, duration: 1 }, 'page2')
      .to(groupRef.current.rotation, { x: 0.1, y: Math.PI * 0.7, z: 0, duration: 1 }, 'page2');

    caseMeshes.current.forEach((c) => tl.to(c, { visible: true, duration: 0.1 }, 'page2'));
    rightEarbudMeshes.current.forEach((r) => tl.to(r, { visible: true, duration: 0.1 }, 'page2'));
    leftEarbudParts.current.forEach((p) => {
      tl.to(p.mesh, { visible: true, duration: 0.1 }, 'page2');
      tl.to(p.mesh.position, { x: p.origPos.x, y: p.origPos.y, z: p.origPos.z, duration: 1 }, 'page2');
    });

    // ==============================================
    // PAGE 2 -> PAGE 3 (NOISE CONTROL)
    // ==============================================
    tl.to(groupRef.current.position, { x: 1.0, y: -0.4, z: 0, duration: 1 }, 'page3')
      .to(groupRef.current.rotation, { x: 0, y: Math.PI * 2.2, z: 0, duration: 1 }, 'page3');

    caseMeshes.current.forEach((c) => tl.to(c, { visible: false, duration: 0.1 }, 'page3'));
    rightEarbudMeshes.current.forEach((r) => tl.to(r, { visible: true, duration: 0.1 }, 'page3'));
    leftEarbudParts.current.forEach((p) => {
      tl.to(p.mesh, { visible: true, duration: 0.1 }, 'page3');
      tl.to(p.mesh.position, { x: p.origPos.x, y: p.origPos.y, z: p.origPos.z, duration: 1 }, 'page3');
    });

    // ==============================================
    // PAGE 3 -> PAGE 4 (COMPONENTS: LOWERED POSITION TO PREVENT NAVBAR OVERLAP)
    // ==============================================
    tl.to(groupRef.current.position, { x: -0.9, y: -0.5, z: 0, duration: 1 }, 'page4')
      .to(groupRef.current.rotation, { x: 0, y: Math.PI * 1.5, z: 0, duration: 1 }, 'page4');

    caseMeshes.current.forEach((c) => tl.to(c, { visible: false, duration: 0.1 }, 'page4'));
    rightEarbudMeshes.current.forEach((r) => tl.to(r, { visible: false, duration: 0.1 }, 'page4'));

    const totalParts = leftEarbudParts.current.length;
    leftEarbudParts.current.forEach((partObj, i) => {
      const { mesh, origPos } = partObj;

      tl.to(mesh, { visible: true, duration: 0.1 }, 'page4');
      const offset = (i - (totalParts - 1) / 2) * 0.025;

      tl.to(
        mesh.position,
        {
          x: origPos.x,
          y: origPos.y,
          z: origPos.z + offset,
          duration: 1,
          ease: 'power1.inOut',
        },
        'page4'
      );
    });

    // ==============================================
    // PAGE 4 -> PAGE 5 (LAST PAGE: LOCKED TO SCREENSHOT POSITION & SHIFTED LOWER)
    // ==============================================
    tl.to(groupRef.current.position, { x: 0, y: -0.7, z: 0.3, duration: 1 }, 'page5')
      .to(groupRef.current.rotation, { x: 0.2, y: Math.PI * 2.0, z: 0, duration: 1 }, 'page5');

    // Restore Case & Both Earbuds on Last Page
    caseMeshes.current.forEach((c) => tl.to(c, { visible: true, duration: 0.1 }, 'page5'));
    rightEarbudMeshes.current.forEach((r) => tl.to(r, { visible: true, duration: 0.1 }, 'page5'));

    // Re-assemble Left Earbud
    leftEarbudParts.current.forEach((p) => {
      tl.to(p.mesh.position, { x: p.origPos.x, y: p.origPos.y, z: p.origPos.z, duration: 1 }, 'page5');
    });

    // Hover Bobbing for Components Page
    ScrollTrigger.create({
      trigger: '#components',
      start: 'top center',
      end: 'bottom center',
      onEnter: startBob,
      onEnterBack: startBob,
      onLeave: stopBob,
      onLeaveBack: stopBob,
    });

    function startBob() {
      if (bobTween.current) return;
      const targets = leftEarbudParts.current.map((p) => p.mesh);
      if (targets.length === 0) return;

      bobTween.current = gsap.to(targets, {
        y: '+=0.04',
        duration: 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    function stopBob() {
      if (bobTween.current) {
        bobTween.current.kill();
        bobTween.current = null;
        leftEarbudParts.current.forEach((p) => {
          gsap.set(p.mesh.position, { y: p.origPos.y });
        });
      }
    }

  }, [actions]);

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} rotation={[0, 0, 0]}>
      <primitive object={scene} scale={[15, 15, 15]} />
    </group>
  );
}

export default function EarbudsCanvas() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        
        <Environment preset="city" />

        <Model />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/earbuds.gltf');