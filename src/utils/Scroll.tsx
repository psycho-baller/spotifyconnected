// https://github.com/studio-freight/lenis
// yarn add @studio-freight/lenis
// 1 - wrap <Component {...pageProps} /> with <Scroll /> in _app.jsx
// 2 - add <ScrollTicker /> wherever in the canvas
// 3 - enjoy
import { addEffect, useFrame } from '@react-three/fiber'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { useRef } from 'react'
import { MathUtils } from 'three'

const state = {
  top: 0,
  progress: 0,
}
export let lenis: Lenis

const { damp } = MathUtils

export default function Scroll({ children, ...props }) {
  const content = useRef(null)
  const wrapper = useRef(null)

  useEffect(() => {
    lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ({ scroll, progress }) => {
      state.top = scroll
      state.progress = progress
    })
    const effectSub = addEffect((time) => lenis.raf(time))
    return () => {
      effectSub()
      lenis.destroy()
    }
  }, [])

  return (
    <div
      {...props}
      ref={wrapper}
      style={{
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        top: 0,
      }}>
      <div
        ref={content}
        // lenis={lenis}
        style={{
          position: 'relative',
          // minHeight: '200vh',
        }}>
        {children}
      </div>
    </div>
  )
}

export const ScrollTicker = ({ smooth = 9999999 }) => {
  useFrame(({ viewport, camera }, delta) => {
    camera.position.y = damp(camera.position.y, (state.progress * viewport.height) / 1.32, smooth, delta)
  })

  return null
}
