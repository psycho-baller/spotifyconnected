import { BsSpotify } from 'react-icons/bs';
import { signIn, signOut, useSession } from "next-auth/react"

export default function Page(props) {
  const { data: session, status } = useSession()
  const loading = status === "loading"



  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800">
      <div className="flex items-center">
        <BsSpotify className="w-10 h-10 text-white" />
        <h1 className="text-white font-bold ml-2">My App</h1>
      </div>
        {session ? (
            
            <button
                onClick={() => signOut()}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            ) : (
            <button
                onClick={() => signIn("spotify")}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Login with Spotify
            </button>
            )}
    </nav>
  );
};

