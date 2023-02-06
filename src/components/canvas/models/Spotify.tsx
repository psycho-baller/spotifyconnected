import { useGLTF } from "@react-three/drei";


export default function Page({ refProp, ...props }) {

    const { scene } = useGLTF("models/spotify_logo.glb");

    return (
        <primitive ref={refProp} {...props} object={scene} />
    )
}
