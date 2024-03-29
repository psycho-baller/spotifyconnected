import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import { getRecentTracks } from '@/utils/spotify'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import Journal from '@/components/dom/Journal'
import PreviousJournals from '@/components/dom/PreviousJournals'
import { xata } from '@/utils/xataClient'

// https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg
type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']
const Page: FC<Props> = ({ data }) => {
  // a place where only the logged in user will be able to access
  // if user is not logged in, redirect to login page
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  const [tracks, setTracks] = useState([])

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
  }, [session, loading, router])

  useEffect(() => {
    const fetchData = async () => {
      let data = await getRecentTracks()
      // if (!data || !data.items) {
      //   router.push('/')
      // }

      data = data.items.map(
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
          albumCover: item.track.album.images[0].url,
          selected: false,
          timesPlayed: data.items.filter((t: any) => t.track.id === item.track.id).length,
        }),
      )
      // remove duplicates
      data = data
        .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
        // sort by times played but keep  order of the rest
        .sort((a, b) => b.timesPlayed - a.timesPlayed)

      setTracks(data)
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
      <PreviousJournals data={data} />
    </main>
  )
}

// export async function getStaticProps() {
//   const session = await getSession()
//   return { props: { title: `Journal` } }
// }

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context)
  const user = session?.user
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  // make sure the user is in the database by adding them if they are not
  if (!(await xata.db.users.filter('email', user.email))) {
    await xata.db.users.create({
      email: user.email,
      username: user.name,
    })
  }

  let data = await xata.db.days.filter({ 'user.email': user.email }).getAll()
  data = JSON.parse(JSON.stringify(data))

  data = await Promise.all(
    data.map(async (day: any) => {
      // remove the user object from the data
      delete day.user
      // extract the songs from the ids
      day.song = await xata.db.songs.read(day.song)

      return day
    }),
  )

  console.log(data)
  return { props: { data } }
}

export default Page
