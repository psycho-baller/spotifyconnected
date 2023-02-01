import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import { useMachine } from '@xstate/react'
import { authenticationMachine } from '@/machines/auth'
import {useSession, signIn, signOut} from 'next-auth/react';

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page(props) {
  const { data: session, status } = useSession()
  const loading = (status === 'loading') as boolean
  
  const [state, send] = useMachine(authenticationMachine, 
    { services: {
      signIn: () => signIn('spotify'),
      signOut: () => signOut()
    }
  })
  if (loading) return( <div>
    <h1>Loading...</h1>
  </div>
  )

  if (session) {

  return (
    <div>
      <h1>Signed in as {session.user.email}</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
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
Page.canvas = (props) => <Logo scale={0.5} route='/blob' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
