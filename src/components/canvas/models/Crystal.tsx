import { useGLTF } from "@react-three/drei";

const textures = {
    "light": "models/crystals/light.gltf",
    "med": "models/crystals/med.gltf",
    "dark": "models/crystals/dark.gltf",
}

export default function Page({ texture = "med", ...props }) {

    const { scene } = useGLTF(textures[texture]);

    return (
        <primitive {...props} object={scene} />
    )
}
