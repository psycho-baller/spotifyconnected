import dynamic from 'next/dynamic'
// import { useMachine } from '@xstate/react'
// import { authenticationMachine } from '@/machines/auth'
import { getSession, useSession } from 'next-auth/react'
import Hero from '@/components/dom/Hero'
import About from '@/components/dom/About'
import Features from '@/components/dom/Features'
import CTA from '@/components/dom/CTA'
// import HomeBG from '@/components/canvas/HomeBG';

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const HomeBG = dynamic(() => import('@/components/canvas/HomeBG'), { ssr: false })

export default function Page(props: any) {
  const { data: session, status } = useSession()
  const loading = (status === 'loading') as boolean

  // const [state, send] = useMachine(authenticationMachine,
  //   {
  //     services: {
  //       signIn: () => signIn('spotify'),
  //       signOut: () => signOut()
  //     }
  //   })
  if (loading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )

  return (
    <main className='xl:mx-12 lg:mx-6 md:mx-4 mx-2'>
      <Hero />
      <Features />
      {/* <About /> */}
      {/* <CTA /> */}
    </main>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => {
  // let scrollY = 0
  // if (typeof window !== 'undefined') {
  //   let scrollY = window.scrollY
  //   console.log(scrollY);
  // }

  return <HomeBG />
}

export async function getStaticProps() {
  return { props: { title: 'Music Journal' } }
}
