import * as THREE from 'three';
import gsap from 'gsap';
import { Sky, Sparkles, Stars, useTexture } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { config, useSpring, animated } from '@react-spring/three';
import { BoxBufferGeometry, GridHelper } from 'three';

export default function ThreeContent({ scale = Array.from({ length: 50 }, () => 0.5 + Math.random() * 4) }) {

    return (
        <>
            <Lightning />
            <Scene />
            <Sparkles count={50} size={scale} position={[0, 0, 0]} scale={[4, 1.5, 4]} speed={0.3} />
            <Stars radius={50} depth={45} count={1000} factor={4} saturation={0} fade speed={2} />
            {/* <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25}  /> */}
        </>
    )

}

function Scene() {


    return (
        <>
            <Cube />
        </>
    )

}

function Cube() {

    const cubeRef = useRef();

    const [active, setActive] = useState(false);

    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.wobbly,
    });

    const textures = useTexture({
        map: '/texture_abstract/abstract_color.png',
        displacementMap: '/texture_abstract/abstract_height.png',
        aoMap: '/texture_abstract/abstract_ao.png',
        metalnessMap: '/texture_abstract/abstract_metalness.png',
        normalMap: '/texture_abstract/abstract_normal.png',
        roughnessMap: '/texture_abstract/abstract_roughness.png',
        emissiveMap: '/texture_abstract/abstract_emissive_orange.png'
    })

    // function spin() {
    //     console.log('cubespin')
    //     gsap.to(
    //         cubeRef.current.rotation, {
    //         duration: 1.5,
    //         ease: 'power2.inOut',
    //         x: '+=6',
    //         y: '+=3',
    //         z: '+=1.5'
    //     }
    //     )
    // }

    


    useFrame(({ clock }) => {

        if (cubeRef.current) {
            cubeRef.current.rotation.y = clock.elapsedTime * 0.12
            cubeRef.current.rotation.x = clock.elapsedTime * 0.1
            cubeRef.current.rotation.z = clock.elapsedTime * 0.08

        }

    })



    return (
        <mesh ref={cubeRef} position={[1, -0.2, 0]} >
            <boxBufferGeometry args={[1, 1, 1, 64, 64]} />
            <meshStandardMaterial {...textures} displacementScale={0} emissive={"#ffff00"} />
        </mesh>
    )
    // color={"#f6b26b"}

}

function Lightning() {

    return (
        <>
            <ambientLight args={["#ffffff", 0.2]} />
            <directionalLight position={[1, 1, 4]} args={["#ffffff", 0.5]} />
        </>
    )

}