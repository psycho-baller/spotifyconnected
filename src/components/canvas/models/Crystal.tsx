import { useGLTF, Clone, Html } from '@react-three/drei'
import { MutableRefObject, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { signIn, useSession } from 'next-auth/react'
import router from 'next/router'

const textures = {
  light: 'models/crystals/light.gltf',
  med: 'models/crystals/med.gltf',
  dark: 'models/crystals/dark.gltf',
  cool: 'models/crystals/coolCrystal.glb',
}

export default function Page({ texture = 'med', rotate = 0, refProp = null, ...props }) {
  const { data: session, status } = useSession()

  // handle different frames
  useFrame((state, delta) => {
    if (rotate !== 0) {
      refProp.current.rotation.y += delta * rotate
    }
  })

  const GLTF = useGLTF(textures[texture])
  console.log(GLTF)

  // const copiedScene = useMemo(() => scene.clone(), [scene])

  return (
    // @ts-ignore
    <Clone
      onClick={() => {
        if (!session) {
          signIn('spotify')
        } else {
          // go to dashboard
          router.push('/dashboard')
        }
      }}
      onPointerEnter={() => {
        // TODO: do some physics to make it slowly increase rotation speed
        rotate = 1
      }}
      onPointerLeave={() => {
        // TODO: do some physics to make it slowly decrease rotation speed
        rotate = 0
      }}
      ref={refProp}
      key={rotate}
      {...props}
      object={GLTF.scene}
    />
  )
}
