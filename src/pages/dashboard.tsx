import { getSession, useSession } from "next-auth/react"
import { getRecentTracks } from "@/utils/spotify"
import {useRouter} from "next/router"
import handler from "./api/checkAuth"
import { useEffect, useState } from "react"
export default function Page(props) {
 // a place where only the logged in user will be able to access
    // if no one is not logged in, redirect to login page with the help of nextAuth 
    // this page will be the page where the user will be able to create their own visualization
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"

    const [tracks, setTracks] = useState([])
useEffect(() => {
    //     if (!session && !loading ) {
    //     console.log(session);
        
    //     router.push('/')
    //     return
    // } else {
    const fetchData = async () => {
    const data = (await getRecentTracks())
    console.log(data);
    
    if(data.error ) {
        router.push('/')
        return
    }
    
    
    setTracks(data.items.map((item) => ({
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
        <div>
            <h1>Dashboard</h1>
            <div>
                {tracks.map((track) => (
                    <div key={track.id}>
                        <img src={track.albumImage} />
                        <h1>{track.title}</h1>
                        <h1>{track.artist}</h1>
                    </div>
                ))}

        </div>
        </div>
    )}
    
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