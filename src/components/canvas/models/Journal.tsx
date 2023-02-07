import { useGLTF } from "@react-three/drei";


export default function Page({ refProp, ...props }) {

    const { scene } = useGLTF("models/journal.glb");

    return (
        <primitive ref={refProp} {...props} object={scene} />
    )
}

