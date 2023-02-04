import { getSession, useSession } from "next-auth/react"
import { getRecentTracks } from "@/utils/spotify"
import {useRouter} from "next/router"
import handler from "./api/checkAuth"
import { useEffect, useState } from "react"
export default function Page(props: any) {
    interface Track {
        id: string;
        artist: string;
        title: string;
        album: string;
        albumImage: string;
    }

 // a place where only the logged in user will be able to access
    // if no one is not logged in, redirect to login page with the help of nextAuth 
    // this page will be the page where the user will be able to create their own visualization
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    const [tracks, setTracks] = useState([]) as [Track[], (tracks: Track[]) => void];
    const [selectedTracks, setSelectedTracks] = useState([]);


      useEffect(() => {
        
    if ((!session && !loading)) {
      router.push('/')
    }
  }, [session, loading, router])
  
useEffect(() => {
    
    const fetchData = async () => {
    const data = (await getRecentTracks())
    console.log(data);
if (!data || !data.items) {
      router.push('/')
    }
    
    setTracks(data.items.map((item: { track: { id: string; artists: { name: string }[]; name: string; album: { name: string; images: { url: string }[] } } }) => ({
        // parse the tracks into a list of objects
            id: item.track.id,
        artist: item.track.artists[0].name,
        title: item.track.name,
        album: item.track.album.name,
        albumImage: item.track.album.images[0].url,
})))
}

    
    fetchData()
    
        
    },[])

    return(
        <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Your Most Listened Songs Today</h1>
      <ul>
        {tracks.map((track, indx) => (
          <li
            key={indx}
            className="flex items-center mb-4 cursor-pointer hover:bg-gray-200 p-4"
            onClick={() => setSelectedTracks([...selectedTracks, track])}
          >
            <img src={track.albumImage} className="w-16 h-16 rounded-full" />
            <h2 className="text-lg font-bold ml-2">{track.title}</h2>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-6">Selected Songs</h2>
      <ul>
        {selectedTracks.map((track) => (
          <li key={track.id} className="flex items-center mb-4">
            <img src={track.albumImage} className="w-16 h-16 rounded-full" />
            <h2 className="text-lg font-bold ml-2">{track.title}</h2>
            {/* artist name shown in a smaller and lighter font */}
            <h3 className="text-sm text-gray-400 ml-2">{track.artist}</h3>
          </li>
        ))}
      </ul>
    </div>

    )}



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