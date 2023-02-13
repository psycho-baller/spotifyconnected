import { BsSpotify } from 'react-icons/bs'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Suspense, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Scene from '@/components/canvas/Scene'
import { Mesh } from 'three'
import dynamic from 'next/dynamic'

const Crystal = dynamic(() => import('@/components/canvas/models/Crystal'), { ssr: false })

export default function Page(props) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const crystalRef = useRef<Mesh>(null)

  if (loading) return <div>Loading...</div>
  return (
    // linear gradient transparent to black from bottom to top navbar
    <nav className='flex absolute w-screen items-center justify-between xl:px-14 lg:px-12 md:px-8 sm:px-6 p-4  bg-transparent translucent'>
      <div className='flex items-center'>
        <Scene className='!w-5 !h-8'>
          <Suspense fallback={null}>
            <Crystal ref={crystalRef} refProp={crystalRef} rotate={1} scale={3} position-y={-2} />
          </Suspense>
        </Scene>
        <h1 className='font-bold ml-2'>Music Journal</h1>
      </div>
      {session ? (
        <div className='relative'>
          <div
            className='flex items-center cursor-pointer pb-1 pl-1'
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}>
            <img src={session.user.image} className='w-8 h-8 rounded-full' />
            <h1 className='font-bold ml-2'>{session.user.name}</h1>
          </div>

          {isDropdownOpen && (
            <div
              className='origin-top-right absolute right-0 pt-2 w-48 rounded-md shadow-lg z-20 '
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}>
              <div className='rounded-md shadow'>
                <div className='py-1'>
                  <a
                    href='#'
                    // Smooth transitions between each hover state
                    style={{ transition: 'all .25s ease' }}
                    className='block px-4 py-2 text-sm text-gray-700 bg-[#59C1BD] hover:bg-[#A0E4CB]'>
                    Profile
                  </a>
                  <a
                    href='#'
                    style={{ transition: 'all .25s ease' }}
                    className='block px-4 py-2 text-sm text-gray-700 bg-[#59C1BD] hover:bg-[#A0E4CB]'>
                    Settings
                  </a>
                  <a
                    onClick={() => router.push('/journal')}
                    style={{ transition: 'all .25s ease' }}
                    className='block px-4 py-2 text-sm text-gray-700 bg-[#59C1BD] hover:bg-[#A0E4CB]'>
                    Journal
                  </a>
                  <a
                    onClick={() => router.push('/dashboard')}
                    style={{ transition: 'all .25s ease' }}
                    className='block px-4 py-2 text-sm text-gray-700 bg-[#59C1BD] hover:bg-[#A0E4CB]'>
                    Dashboard
                  </a>
                  <a
                    className='block px-4 py-2 text-sm text-gray-700 bg-[#59C1BD] hover:bg-[#A0E4CB]'
                    style={{ transition: 'all .25s ease' }}
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}>
                    Sign Out
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault()
            signIn('spotify')
          }}
          className='font-bold py-2 px-4 appealing-button text-xs'>
          Sign in with Spotify
        </button>
      )}
    </nav>
  )
}
