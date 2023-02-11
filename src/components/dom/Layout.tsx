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

    useImperativeHandle(ref, () => localRef.current)
    const router = useRouter()
    const isInVisualization = ((router.pathname as string) === ('/visualization' as string)) as boolean
    const isInRoot = ((router.pathname as string) === ('/' as string)) as boolean
    const colors = ['#0D4C92', '#1A272E', '#3e8585']
    const [colorIndex, setColorIndex] = useState(0)
    const changeColor = () => {
      setColorIndex((index) => (index + 1) % colors.length)
    }
    return (
      <div
        {...props}
        ref={localRef}
        className={`absolute w-screen h-screen overflow-x-hidden top-0 left-0 z-10 dom`}
        style={{ backgroundColor: !isInVisualization ? colors[colorIndex] : 'transparent' }}
        onClick={changeColor}>
        <Scroll>
          {!isInVisualization && showNav && <Navbar />}
          {/* <div className="relative"> */}
          <div>{children}</div>
          {/* {(showFooter || isInRoot) && <Footer />} */}
          {/* </div> */}
        </Scroll>
      </div>
    )
  },
)
Layout.displayName = 'Layout'

export default Layout
