import { useGLTF } from "@react-three/drei";
import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame } from '@react-three/fiber';

const textures = {
    "light": "models/crystals/light.gltf",
    "med": "models/crystals/med.gltf",
    "dark": "models/crystals/dark.gltf",
}

export default function Page({ texture = "med", rotate = 0, refProp = null, ...props }) {

    // handle different frames
    useFrame(({ clock }) => {
        if (rotate !== 0) {
            refProp.current.rotation.y = clock.getElapsedTime() * rotate;
        }
    })

    const { scene } = useGLTF(textures[texture]);
    const copiedScene = useMemo(() => scene.clone(), [scene])

    return (
        <primitive ref={refProp} key={rotate} {...props} object={copiedScene} />
    )
}
