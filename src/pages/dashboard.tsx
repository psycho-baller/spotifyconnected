import { useSession } from 'next-auth/react'
import { getRecentTracks } from '@/utils/spotify'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Scroll from '@/utils/Scroll'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

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

  useEffect(() => {
    // for now we will just filter the tracks by the title, but we can add more filters later
    const results = tracks.filter((track) => track.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results)
  }, [searchTerm, tracks])

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>Your Most Listened Songs Today</h1>
      <input
        className='border-2 border-gray-300 p-2 rounded-lg mb-6 w-96 search-input'
        type='text'
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* when the input is active, show the popup that shows the search results in a scrollable list*/}
      <div className='bg-white w-96 rounded-lg shadow-lg relative z-100 border-2 border-gray-300 invisible focus:visible focus-within:visible active:visible hover:visible'>
        <div className='flex flex-col items-center h-96'>
          <Scroll className='overflow-y-scroll'>
            <ul>
              {searchResults.map((track, indx) => (
                <li
                  key={indx}
                  className='flex items-center mb-4 cursor-pointer hover:bg-gray-200 p-4'
                  onClick={() => {
                    // toggle the selected state of the track
                    const newTracks = [...tracks]
                    newTracks[indx].selected = !newTracks[indx].selected
                    setTracks(newTracks)
                  }}>
                  <img src={track.albumImage} className='w-16 h-16 rounded-full' />
                  <h2 className='text-lg font-bold ml-2'>{track.title}</h2>
                  <h3 className='text-sm text-gray-400 ml-2'>{track.artist}</h3>
                  {track.selected && <span className='text-green-500 ml-2'>Selected</span>}
                </li>
              ))}
            </ul>
          </Scroll>
        </div>
      </div>
      {/* <ul>
        {searchResults.map((track, indx) => (
          <li
            key={indx}
            className='flex items-center mb-4 cursor-pointer hover:bg-gray-200 p-4'
            onClick={() => {
              // toggle the selected state of the track
              const newTracks = [...tracks]
              newTracks[indx].selected = !newTracks[indx].selected
              setTracks(newTracks)
            }}>
            <img src={track.albumImage} className='w-16 h-16 rounded-full' />
            <h2 className='text-lg font-bold ml-2'>{track.title}</h2>
            <h3 className='text-sm text-gray-400 ml-2'>{track.artist}</h3>
            {track.selected && <span className='text-green-500 ml-2'>Selected</span>}
          </li>
        ))}
      </ul>
      <h2 className='text-xl font-bold mt-6'>Selected Songs</h2>
      <ul>
        {tracks
          .filter((track) => track.selected)
          .map((track, indx) => (
            <li key={indx} className='flex items-center mb-4'>
              <img src={track.albumImage} className='w-16 h-16 rounded-full' />
              <h2 className='text-lg font-bold ml-2'>{track.title}</h2>
              <h3 className='text-sm text-gray-400 ml-2'>{track.artist}</h3>
            </li>
          ))}
      </ul> */}
    </div>
  )
}

export async function getStaticProps() {
  return { props: { title: 'Dashboard' } }
}
//     export const getStaticProps = async ({ req, res }) => {
//   const session = await getSession({ req });

//   if (!session) {
//     // if no one is logged in, redirect to login page

//     return {};
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };
// export async function getStaticProps(context) {
//     // check if user is logged in
//     const res = await handler
//     if (!res) {
//         return{
//             redirect: {
//       destination: '/',
//       permanent: false,
//     },
// }
//     }

//     return {
//         props: {
//             tracks
//         }
//     }
// }
