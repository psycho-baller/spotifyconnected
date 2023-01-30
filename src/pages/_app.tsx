import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { SessionProvider } from "next-auth/react"
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.scss'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps: { title='index', session, ...pageProps } }) {
  const ref = useRef()
  return (
    <>
      <Header title={pageProps.title} />
      <Layout ref={ref}>
        <SessionProvider session={session}>
        <Component {...pageProps} />
        </SessionProvider>
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          // @ts-ignore
          <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
            {Component.canvas(pageProps)}
          </Scene>
        )}
      </Layout>
    </>
  )
}
