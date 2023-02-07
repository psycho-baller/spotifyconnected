import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { MutableRefObject } from 'react'

interface SceneProps {
  children: React.ReactNode
  orbit?: boolean
  screen?: boolean
  className?: string
  eventSource?: MutableRefObject<undefined>
  anyOtherProps?: any
}


export default function Scene({ children, orbit = false, screen = false, ...props }: SceneProps) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
      {...screen && { className: "top-0 left-0 -z-50 !w-screen !h-screen overflow-hidden !fixed" }}
    // className="!w-screen !h-screen overflow-hidden"
    >
      {orbit && <OrbitControls />}
      <directionalLight intensity={0.25} position={[0, 0, 10]} />

      {children}
      <Preload all />
    </Canvas>
  )
}
