import { useRef, forwardRef, useImperativeHandle, useState } from 'react'
import Navbar from './navbar/Navbar'
import { useRouter } from 'next/router'
import Scroll from '@/utils/Scroll'

const Layout = forwardRef(
  (
    {
      children,
      showNav = true,
      showFooter = false,
      ...props
    }: { children: React.ReactNode; showNav?: boolean; showFooter?: boolean },
    ref,
  ) => {
    const localRef = useRef()
    let increment = 1

    useImperativeHandle(ref, () => localRef.current)
    const router = useRouter()
    const isInVisualization = ((router.pathname as string) === ('/visualization' as string)) as boolean
    const isInjournal = ((router.pathname as string) === ('/journal' as string)) as boolean
    const isInRoot = ((router.pathname as string) === ('/' as string)) as boolean
    const colors = ['#0D4C92', '#1A272E', '#3e8585']
    const [colorIndex, setColorIndex] = useState(0)
    const changeColor = () => {
      // if it is in journal, don't make black background
      // if (isInjournal && colorIndex === 0) increment++
      setColorIndex((index) => {
        if (isInjournal && index === 0) increment = 2
        return (index + increment) % colors.length
      })
      increment = 1
    }
    return (
      <div
        {...props}
        ref={localRef}
        className={`absolute w-screen h-screen overflow-x-hidden top-0 left-0 z-10 dom`}
        style={{ backgroundColor: !isInVisualization ? colors[colorIndex] : 'transparent' }}
        onClick={changeColor}>
        {/* wrap with scroll only in the root file */}
        {isInRoot ? (
          <Scroll>
            {!isInVisualization && showNav && <Navbar />}
            {/* <div className="relative"> */}
            <div>{children}</div>
            {/* {(showFooter || isInRoot) && <Footer />} */}
            {/* </div> */}
          </Scroll>
        ) : (
          <>
            {!isInVisualization && showNav && <Navbar />}
            {/* <div className="relative"> */}
            <div>{children}</div>
            {/* {(showFooter || isInRoot) && <Footer />} */}
            {/* </div> */}
          </>
        )}
      </div>
    )
  },
)
Layout.displayName = 'Layout'

export default Layout
