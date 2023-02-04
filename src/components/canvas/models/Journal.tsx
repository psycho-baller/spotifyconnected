import { useGLTF } from "@react-three/drei";


export default function Page(props) {

    const { scene } = useGLTF("models/journal.glb");

    return (
        <primitive {...props} object={scene} />
    )
}
