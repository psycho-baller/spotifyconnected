import { useRef, forwardRef, useImperativeHandle } from 'react'
import Navbar from './navbar/Navbar'
import { useRouter } from 'next/router'
import Scroll from '@/utils/Scroll'

const Layout = forwardRef(({ children, showNav = true, showFooter = false, ...props }: { children: React.ReactNode, showNav?: boolean, showFooter?: boolean }
  , ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)
  const router = useRouter()
  const isInVisualization = ((router.pathname as string) === ('/visualization' as string)) as boolean
  const isInRoot = ((router.pathname as string) === ('/' as string)) as boolean



  return (
    <div
      {...props}
      ref={localRef}
      className='absolute  w-screen h-screen overflow-x-hidden top-0 left-0 z-10 dom bg-[#0D4C92]'>
      <Scroll>
        {(!isInVisualization && showNav) && <Navbar />}
        {/* <div className="relative"> */}
        {children}
        {/* {(showFooter || isInRoot) && <Footer />} */}
        {/* </div> */}
      </Scroll>
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
