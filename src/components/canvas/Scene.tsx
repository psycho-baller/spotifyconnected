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


export default function Scene({ children, orbit=true, screen=true, ...props }: SceneProps) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
    {...screen && {className:"!absolute top-0 left-0 -z-50 !w-screen !h-screen overflow-hidden"}}
    
    >
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      {children}
      <Preload all />
      {orbit && <OrbitControls />}
    </Canvas>
  )
}
