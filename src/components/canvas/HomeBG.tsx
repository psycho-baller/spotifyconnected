import { ScrollTicker } from "@/utils/Scroll";
import { useFrame } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";

const Crystal = dynamic(() => import('@/components/canvas/models/Crystal'), { ssr: false })

export default function HomeBG({ ...props }) {
    const { data: session, status } = useSession()
    const texture = session ? "light" : "med";

    const crystalRef = useRef<Mesh>(null);

    useFrame(() => {
        if (crystalRef.current) {

        }



    })

    return (
        <>
            <ScrollTicker />
            <Crystal refProp={crystalRef} ref={crystalRef} texture={texture} position={[0, 2, 0]} />
        </>
    )
}