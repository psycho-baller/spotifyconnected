import { useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";

const Crystal = dynamic(() => import('@/components/canvas/models/Crystal'), { ssr: false })

export default function HomeBG({ ...props }) {
    const crystalRef = useRef<Mesh>(null);

    useFrame(({ clock, viewport }) => {
        if (crystalRef.current) {

        }



    })

    return (
        <>
            <Crystal refProp={crystalRef} ref={crystalRef} texture="med" position={[0, 0, 0]} />
        </>
    )
}