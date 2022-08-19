import * as THREE from 'three';
import gsap from 'gsap';
import { useTexture } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { config, useSpring, animated } from '@react-spring/three';

export default function ThreeContent() {

    return (
        <>
        <Lightning/>
        <SceneTerrain/>
        <Cube/>
        </>
    )

}

function SceneTerrain() {

    return(
        <mesh rotation-x={- Math.PI / 2} position-y={-0.5}>
            <planeBufferGeometry args={[12, 12, 6, 6]}/>
            <meshStandardMaterial wireframe/>
        </mesh>
    )

}

function Cube() {

    const cubeRef = useRef();

    const [active, setActive] = useState(false);

    const {scale} = useSpring({
        scale: active ? 1.5 : 1,
        config: config.wobbly,
    });

    useFrame(({clock}) => {

        if(cubeRef.current) {
            cubeRef.current.rotation.y = clock.elapsedTime
            cubeRef.current.rotation.x = clock.elapsedTime * 0.5
            cubeRef.current.rotation.z = clock.elapsedTime * 0.3
        }

    })

    

    return (
        <animated.mesh ref={cubeRef} scale={scale} onClick={() => setActive(!active)}>
            <boxBufferGeometry args={[0.5, 0.5, 0.5]}/>
            <meshStandardMaterial color={"#f6b26b"}/>
        </animated.mesh>
    )

}

function Lightning() {

    return(
        <>
        <ambientLight args={["#b9d5ff", 0.2]}/>
        <directionalLight position={[5, 8, -3]} args={["#ffffff", 0.5]}/>
        </>
    )

}