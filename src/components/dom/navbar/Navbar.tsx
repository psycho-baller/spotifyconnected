import { BsSpotify } from 'react-icons/bs';
import { signIn, signOut, useSession } from "next-auth/react"
import { useState, useRef } from 'react';

export default function Page(props) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (loading) return <div>Loading...</div>

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 px-12 ">
      <div className="flex items-center">
        <BsSpotify className="w-10 h-10 text-white" />
        <h1 className="text-white font-bold ml-2">My App</h1>
      </div>
        {session ? (
            <div className="relative">
            <div className="flex items-center cursor-pointer pb-1 pl-1"
            onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <img src={session.user.image} className="w-8 h-8 rounded-full" />
                <h1 className="text-white font-bold ml-2">{session.user.name}</h1>
            </div>
            
      {isDropdownOpen && (
        <div
          className="origin-top-right absolute right-0 pt-2 w-48 rounded-md shadow-lg z-20 "
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() =>setIsDropdownOpen(false)}
        >
          <div className="bg-white rounded-md shadow">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => signOut()}
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      )}
      </div>

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

