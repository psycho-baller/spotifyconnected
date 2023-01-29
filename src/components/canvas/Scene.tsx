import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { MutableRefObject } from 'react'

interface SceneProps {
  children: React.ReactNode
  orbit?: boolean
  className?: string
  eventSource?: MutableRefObject<undefined>
  anyOtherProps?: any
}

export default function Scene({ children, orbit=true, ...props }: SceneProps) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      {children}
      <Preload all />
      {orbit && <OrbitControls />}
    </Canvas>
  )
}
