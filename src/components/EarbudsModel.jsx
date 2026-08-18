'use client';
import { useRef, useLayoutEffect, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export default function EarbudsModel() {
  const groupRef = useRef();
  const floatGroupRef = useRef();
  const caseMeshes = useRef([]);
  const rightEarbudMeshes = useRef([]);
  const leftEarbudParts = useRef([]);

  const { scene, animations } = useGLTF('/models/earbuds.gltf');
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimName = Object.keys(actions)[0];
      const action = actions[firstAnimName];
      if (action) {
        action.reset();
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.play();
      }
    }
  }, [actions]);

  // Free-Fall Floating Physics
  useFrame((state) => {
    if (floatGroupRef.current) {
      const t = state.clock.getElapsedTime();
      floatGroupRef.current.position.y = Math.sin(t * 1.5) * 0.1;
      floatGroupRef.current.position.x = Math.cos(t * 1.1) * 0.04;
      floatGroupRef.current.rotation.z = Math.sin(t * 0.9) * 0.03;
    }
  });

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

    caseMeshes.current = cMeshes;
    rightEarbudMeshes.current = rightBud;
    leftEarbudParts.current = leftBudParts;
  }, [scene]);

  useGSAP(() => {
    if (!groupRef.current) return;

    const leftMeshes = leftEarbudParts.current.map((p) => p.mesh);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    // PAGE 1 -> PAGE 2 (Acoustics: Front-facing dimension straight to camera screen)
    tl.to(groupRef.current.position, { x: -0.8, y: -0.1, z: 1, duration: 1.5, ease: 'power2.inOut' }, 'page2')
      .to(groupRef.current.rotation, { x: 0, y: Math.PI * 2, z: 0, duration: 1.5, ease: 'power2.inOut' }, 'page2') // Face completely straight forward
      .to(groupRef.current.scale, { x: 22, y: 22, z: 22, duration: 1.5, ease: 'power2.inOut' }, 'page2');

    // Slight un-docking on Page 2 for 3D depth
    leftEarbudParts.current.forEach((p, i) => {
      tl.to(
        p.mesh.position,
        {
          x: p.origPos.x - 0.08 * (i + 1),
          y: p.origPos.y + 0.05 * (i + 1),
          z: p.origPos.z + 0.1 * (i + 1),
          duration: 1.5,
          ease: 'power2.out',
        },
        'page2'
      );
    });

    // PAGE 2 -> PAGE 3 (Instant elimination as background image takes over)
    tl.to(groupRef.current.position, { y: -5, z: -2, duration: 0.4, ease: 'power2.in' }, 'eliminate')
      .to(groupRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.4, ease: 'power2.in' }, 'eliminate')
      .set(caseMeshes.current, { visible: false }, 'eliminate+=0.2')
      .set(rightEarbudMeshes.current, { visible: false }, 'eliminate+=0.2')
      .set(leftMeshes, { visible: false }, 'eliminate+=0.2');

  }, [actions]);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
      <group ref={floatGroupRef}>
        <primitive object={scene} scale={[18, 18, 18]} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/earbuds.gltf');