import dynamic from 'next/dynamic'
// import { useMachine } from '@xstate/react'
// import { authenticationMachine } from '@/machines/auth'
import { useSession, signIn, signOut } from 'next-auth/react';
import Hero from '@/components/dom/Hero';
import About from '@/components/dom/About';
import Features from '@/components/dom/Features';
import CTA from '@/components/dom/CTA';
// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })
const Crystal = dynamic(() => import('@/components/canvas/models/Crystal'), { ssr: false })


export default function Page(props) {
  const { data: session, status } = useSession()
  const loading = (status === 'loading') as boolean

  // const [state, send] = useMachine(authenticationMachine,
  //   {
  //     services: {
  //       signIn: () => signIn('spotify'),
  //       signOut: () => signOut()
  //     }
  //   })
  if (loading) return (<div>
    <h1>Loading...</h1>
  </div>
  )

  if (session) {

    return (
      <main className='xl:mx-8 lg:mx-6 md:mx-4 mx-2' >
        <Hero />
        <Features />
        <About />
        <CTA />
      </main>
    )
  } else {
    return (
      <div>
        <h1>Not signed in</h1>
        <button onClick={() => signIn(
          'spotify'
        )

        }>Sign in</button>
      </div>
    )
  }

}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)

Page.canvas = (props) => {
  return (
    <>
      {/* <Logo scale={0.5} route='/dashboard' position-y={1} /> */}

      <Crystal texture="med" position={[0, 0, 0]} />
    </>
  )
}

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
