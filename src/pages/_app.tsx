import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { SessionProvider } from "next-auth/react"
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.scss'
import Scroll from '@/utils/Scroll'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const ref = useRef()
  return (
    <>
      <Header title={pageProps.title} />
      <SessionProvider session={session}>
        <Scroll>
          <Layout ref={ref}>
            {/* <Navbar /> */}
            <Component {...pageProps} />      {Component?.canvas && (
              // @ts-ignore
              <Scene screen="true" className='pointer-events-none' eventSource={ref} eventPrefix='client'>
                {Component.canvas(pageProps)}
              </Scene>
            )}
          </Layout>
        </Scroll>
      </SessionProvider>
      {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
        * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}

    </>
  )
}
