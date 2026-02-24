import {Canvas} from '@react-three/fiber'
import {useGLTF, OrbitControls} from '@react-three/drei'

export default function Scene({time, suntime}) {
    const {nodes} = useGLTF("/room_model.glb")
    console.log(nodes)
    return (
        <Canvas camera={{position: [22.68249974146549, 14.357536645966192, -23.55582316417373]}}>
            <ambientLight />
            <OrbitControls enablePan = {false} enableZoom = {false} onChange={(e) => console.log(e.target.object.position)}/>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh castShadow receiveShadow geometry={nodes.Object_0.geometry} material={nodes.Object_0.material} />
                <mesh castShadow receiveShadow geometry={nodes.Object_0_1.geometry} material={nodes.Object_0_1.material} />
                <mesh castShadow receiveShadow geometry={nodes.Object_2001.geometry} material={nodes.Object_2001.material}  />
            </group>
        </Canvas>
    )
}

useGLTF.preload('/room_model.glb')