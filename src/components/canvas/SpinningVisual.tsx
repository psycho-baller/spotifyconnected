import dynamic from 'next/dynamic'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'


const Journal = dynamic(() => import('@/components/canvas/models/Journal'), { ssr: false })
const Spotify = dynamic(() => import('@/components/canvas/models/Spotify'), { ssr: false })

export default function Page(props) {

    const journalRef = useRef<Mesh>(null);
    const spotifyRef = useRef<Mesh>(null);

    const radius = 2;
    const speed = 0.8;

    useFrame(({ clock, viewport }) => {
        // while they're facing each other, rotate them like merry-go-rounds
        if (journalRef.current && spotifyRef.current) {

            const handleDiffViewports = Math.min(viewport.width / 7, 1.3);

            journalRef.current.position.x = Math.sin(clock.getElapsedTime() * speed) * radius * handleDiffViewports;
            journalRef.current.position.z = Math.cos(clock.getElapsedTime() * speed) * radius * handleDiffViewports;

            spotifyRef.current.position.x = Math.sin(clock.getElapsedTime() * speed) * -radius * handleDiffViewports;
            spotifyRef.current.position.z = Math.cos(clock.getElapsedTime() * speed) * -radius * handleDiffViewports;

            // make them face each other
            journalRef.current.lookAt(spotifyRef.current.position)
            spotifyRef.current.lookAt(journalRef.current.position)

            // make the journal look down
            journalRef.current.lookAt(0, -10, radius * handleDiffViewports)

        }

    })


    return (
        <>
            <Journal refProp={journalRef} ref={journalRef} scale={0.1} />
            <Spotify refProp={spotifyRef} ref={spotifyRef} />
        </>
    )
}

