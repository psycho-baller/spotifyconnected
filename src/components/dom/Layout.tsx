import { useRef, forwardRef, useImperativeHandle } from 'react'
import Navbar from './navbar/Navbar'
import { useRouter } from 'next/router'

const Layout = forwardRef(({ children, ...props }: { children: React.ReactNode }
  , ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)
  const router = useRouter()
  const isInVisualization = ((router.pathname as string) === ('/visualization' as string)) as boolean



  return (
    <div
      {...props}
      ref={localRef}
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-x-hidden dom bg-zinc-900 text-gray-50'>
      {!isInVisualization && <Navbar />}
      <div className="relative">
        {children}
      </div>
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
