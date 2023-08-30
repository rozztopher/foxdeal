import React from 'react'
// import React, { Suspense, useEffect, useRef, useState } from 'react'
// import * as THREE from 'three'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { useGLTF } from '@react-three/drei'
import { Link } from 'react-router-dom'

const HomeHero = () => {

    // function Fox(props) {
    //     const group = useRef()
    //     const mesh = useRef()
    //     const { nodes, materials, animations } = useGLTF('/3d/Fox.gltf')
    //     const [mixer] = useState(() => new THREE.AnimationMixer())
    //     useEffect(() => void mixer.clipAction(animations[0], group.current).play(), [animations, mixer])
    //     useFrame((state, delta) => {
    //         mixer.update(delta)
    //     })
    //     return (
    //         <group ref={group} {...props} dispose={null}>
    //             <group userData={{ name: 'root' }}>
    //                 <primitive object={nodes._rootJoint} />
    //                 <skinnedMesh ref={mesh}
    //                     geometry={nodes.fox.geometry}
    //                     material={materials.fox_material}
    //                     skeleton={nodes.fox.skeleton}
    //                     userData={{ name: 'fox' }}
    //                 />
    //             </group>
    //         </group>
    //     )
    // }
    // useGLTF.preload('3d/Fox.gltf')

    const scrollToProducts = () => {
        document.getElementsByClassName('home-products')[0].scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div>
            <div className='hero'>
                <div className="hero-text-column hero-title">
                    <h1>Wild, young and günstig – <span className='highlight header'>Fox</span>Deal!</h1>
                    <p className='mt-16 grey-text'>Stell dir vor, du kannst selbst entscheiden, wie viel du für dein Lieblingsprodukt liegen lässt. FoxDeal verbindet dich mit Gönnern, mit denen du crazy Deals abschliessen kannst. Gratis Iphone?</p>
                    <Link style={{textDecoration: 'none'}} to='/products' id='products-link'>
                        <div className='cta-button blue body-text bw-170 mt-37'>Gönn Dir!</div>
                    </Link>
                </div>
                <div className="hero-mascot-column">
                    {/* <img src='images/goenni.png' alt='goenni'></img> */}
                    <video src='/images/_FORREST_FINALE_VP9.webm' autoPlay width='100%'></video>
                    {/* <Canvas style={{ height: '100%', width: '100%' }}>
                        <pointLight position={[5, 5, 5]} />
                        <Suspense fallback={null}>
                            <Fox position={[0, -1, 0]} rotation={[0, -0.66, 0]} scale={[0.033, 0.033, 0.033]} />
                        </Suspense>
                    </Canvas> */}
                </div>
            </div>
            <div className='scroll-down mt-128'>
                <img src='/icons/down.svg' alt='down arrow'></img>
                <p className='body-text bold' onClick={scrollToProducts}>Scroll runter, um die Produkte zu bestaunen</p>
            </div>
        </div>
    )
}

export default HomeHero