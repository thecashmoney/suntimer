import {Canvas, useFrame} from '@react-three/fiber'
import {useGLTF, OrbitControls} from '@react-three/drei'
import {useRef, useEffect} from 'react'
import * as THREE from 'three'

function Camera({limit = 0.3}) {
    const mouse = useRef({x: 0, y: 0})

    useEffect(() => {
        const onMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', onMouseMove)
        return () => window.removeEventListener('mousemove', onMouseMove)
    })

    useFrame((state) => {
        if (!mouse.current.base) {
            const p = state.camera.position
            mouse.current.base = {
                radius: p.length(),
                theta: Math.atan2(p.x, p.z),
                phi: Math.acos(p.y / p.length())
            }
        }

        const {radius, theta, phi} = mouse.current.base
        const t = theta + mouse.current.x * limit
        const p = phi - mouse.current.y * limit

        const target = new THREE.Vector3(
            radius * Math.sin(p) * Math.sin(t),
            radius * Math.cos(p),
            radius * Math.sin(p) * Math.cos(t)
        )

        state.camera.position.lerp(target, 0.05)
        state.camera.lookAt(0, 0, 0)
    })

    return null
}

export default function Scene({time, suntime}) {
    const {nodes} = useGLTF("/room_model.glb")
    return (
        <Canvas camera={{position: [69.75050607949376, 49.595258303954125, -65.69520715680852]}}>
            <ambientLight />
            {/* <OrbitControls enablePan = {true} enableZoom = {true} onChange={(e) => console.log(e.target.object.position)}/> */}
            <Camera limit={0.3} />
            <group rotation={[-Math.PI / 2, 0, 0]} scale={3}>
                <mesh castShadow receiveShadow geometry={nodes.Object_0.geometry} material={nodes.Object_0.material} />
                <mesh castShadow receiveShadow geometry={nodes.Object_0_1.geometry} material={nodes.Object_0_1.material} />
                <mesh castShadow receiveShadow geometry={nodes.Object_2001.geometry} material={nodes.Object_2001.material} />
            </group>
        </Canvas>
    )
}

useGLTF.preload('/room_model.glb')