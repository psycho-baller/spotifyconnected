import { OrbitControls } from '@react-three/drei'
import Lenis from '@studio-freight/lenis'
import { lenis } from '@/utils/Scroll'
import { signIn, useSession } from 'next-auth/react'
import router from 'next/router'
import { Suspense } from 'react'
import Scene from '../canvas/Scene'
import SpinningVisual from '../canvas/SpinningVisual'

export default function Page(props) {
  const { data: session, status } = useSession()

  return (
    <section className='grid lg:grid-cols-6 xl:gap-4 lg:gap-3 md:gap-2 min-h-screen sm:mx-5 md:mx-10 lg:mx-0'>
      {/* <div className="flex flex-col justify-center items-center"> */}
      <section
        className='lg:col-span-4 p-4 my-auto xl:my-auto sm:mt-16 mt-20' //
      >
        <h1 className=' xl:text-5xl lg:text-4xl text-3xl capitalize xl:mb-8 mb-6 hover:opacity-100 appealing-text font-HitNRun text-center md:text-left'>
          Journaling for the music lovers
        </h1>
        <div className='space-y-3 xl:space-y-4'>
          <p className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
            Wanna connect your favorite memories to a song? or a specific song reminds you of someone? You can create
            and explore all these connections with <span className='capitalize'> music journal</span>
          </p>
          <p className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
            Choose your favorite song everyday and connect it to your most memorable memories and people
          </p>
          <p className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
            View your connections in cool interactive visuals that you can easily share with your friends
          </p>
          <p className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
            You can seamlessly connect <span className='capitalize'>music journal</span> to your favorite journaling
            apps like{' '}
            <a
              className='appealing-text cursor-pointer'
              href='#features'
              onClick={() => {
                lenis.scrollTo('#features')
              }}>
              Obsidian, Notion, and many more!
            </a>
            <div className='arrow bounce' />
          </p>
        </div>
        {/* CTA button */}
        <div className='flex md:justify-start justify-center items-center xl:mt-8 mt-6 mb-3'>
          <button
            className='appealing-button font-bold py-3 px-8'
            onClick={() => {
              if (!session) {
                signIn('spotify')
              } else {
                // go to dashboard
                router.push('/dashboard')
              }
            }}>
            {session ? 'Go to journal' : 'Sign in with Spotify'}
          </button>
        </div>
        <div className='font-extralight pl-3'>
          <p>scratching your head🤔?</p>
          <a
            className='flex'
            href='#features'
            onClick={() => {
              lenis.scrollTo('#features')
            }}>
            <p className='appealing-text cursor-pointer'>
              Learn more about <span className='capitalize'> music journal&apos;s</span> features
            </p>
            <div className='arrow bounce' />
          </a>
        </div>
      </section>
      <section
        className='lg:col-span-2 p-4 pt-16'
        // style={{
        //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
        // }}
      >
        <Scene>
          <ambientLight intensity={0.4} />

          <OrbitControls
            enableZoom={false}
            // keep the camera from rotating around the y-axis
            // enablePan={false}
          />
          <Suspense>
            <SpinningVisual />
          </Suspense>
        </Scene>
      </section>
      {/* </div> */}
    </section>
  )
}
