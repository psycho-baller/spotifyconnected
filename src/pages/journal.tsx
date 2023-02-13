import { getSession, useSession } from 'next-auth/react'
import { getRecentTracks } from '@/utils/spotify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Journal from '@/components/dom/Journal'

// https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg

export default function Page(props: any) {
  interface Track {
    id: string
    artist: string
    title: string
    album: string
    albumImage: string
    selected: boolean
  }

  // a place where only the logged in user will be able to access
  // if user is not logged in, redirect to login page
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [tracks, setTracks] = useState([]) as [Track[], (tracks: Track[]) => void]

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
  }, [session, loading, router])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentTracks()
      console.log(data)
      if (!data || !data.items) {
        router.push('/')
      }

      setTracks(
        data.items.map(
          (item: {
            track: {
              id: string
              artists: { name: string }[]
              name: string
              album: { name: string; images: { url: string }[] }
            }
          }) => ({
            // parse the tracks into a list of objects
            id: item.track.id,
            artist: item.track.artists[0].name,
            title: item.track.name,
            album: item.track.album.name,
            albumImage: item.track.album.images[0].url,
            selected: false,
          }),
        ),
      )
    }

    fetchData()
    return () => {
      // cleanup
    }
  }, [])

  return (
    <main className='pt-16 xl:mx-12 lg:mx-6 md:mx-4 mx-2'>
      {/* <Search tracks={tracks} /> */}
      <Journal tracks={tracks} setTracks={setTracks} />
    </main>
  )
}

export async function getStaticProps() {
  const session = await getSession()
  return { props: { title: `Dashboard` } }
}
