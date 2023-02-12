import { getSession, useSession } from 'next-auth/react'
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
    </div>
  )
}

export async function getStaticProps() {
  const session = await getSession()
  return { props: { title: `Dashboard` } }
}
/*
{
  "categories": [
    {
      "name": [
        "Deep work",
        "Writing"
      ],
      "rule": {
        "type": "regex",
        "regex": "Google Docs|obsidian",
        "ignore_case": true
      },
      "data": {
        "color": "#653294"
      },
      "id": 0
    },
    {
      "name": [
        "Self-management",
        "Time tracking"
      ],
      "rule": {
        "type": "regex",
        "regex": "ActivityWatch|aw-|Toggl|rescueTime",
        "ignore_case": true
      },
      "id": 1,
      "data": {
        "color": "#68CCCA"
      }
    },
    {
      "name": [
        "Deep work",
        "Video editing"
      ],
      "rule": {
        "type": "regex",
        "regex": "DaVinci Resolve"
      },
      "id": 2,
      "data": {
        "color": "#D33115"
      }
    },
    {
      "name": [
        "Deep work",
        "3D"
      ],
      "rule": {
        "type": "regex",
        "regex": "Blender|sketch fab|sketchfab|threejs|react three fiber|react three drei|r3f|3D models|3D",
        "ignore_case": true
      },
      "id": 3,
      "data": {}
    },
    {
      "name": [
        "Media",
        "Games"
      ],
      "rule": {
        "type": "regex",
        "regex": "Minecraft|RimWorld|Factorio|Steam|MultiMC|geoguessr|cs(?:: ?)?go",
        "ignore_case": true
      },
      "data": {
        "color": "#F80"
      },
      "id": 4
    },
    {
      "name": [
        "Media",
        "Video"
      ],
      "rule": {
        "type": "regex",
        "regex": "Plex|VLC|YouTube",
        "ignore_case": true
      },
      "data": {
        "color": "#F33"
      },
      "id": 5
    },
    {
      "name": [
        "Media",
        "Social Media"
      ],
      "rule": {
        "type": "regex",
        "regex": "reddit|Instagram|devRant",
        "ignore_case": true
      },
      "data": {
        "color": "#FE9200"
      },
      "id": 6
    },
    {
      "name": [
        "Media",
        "Music"
      ],
      "rule": {
        "type": "regex",
        "regex": "Spotify|Deezer|YouTube Music|last.fm",
        "ignore_case": true
      },
      "data": {
        "color": "#A8FC00"
      },
      "id": 7
    },
    {
      "name": [
        "Comms"
      ],
      "rule": {
        "type": null
      },
      "data": {
        "color": "#FCDC00"
      },
      "id": 8
    },
    {
      "name": [
        "Comms",
        "IM"
      ],
      "rule": {
        "type": "regex",
        "regex": "Messenger|Telegram|Signal|WhatsApp|Rambox|Slack|Riot|Discord|Nheko",
        "ignore_case": true
      },
      "id": 9,
      "data": {}
    },
    {
      "name": [
        "Comms",
        "Email"
      ],
      "rule": {
        "type": "regex",
        "regex": "Gmail|Thunderbird|mutt|alpine|outlook|tempbox",
        "ignore_case": true
      },
      "id": 10,
      "data": {}
    },
    {
      "name": [
        "Uncategorized"
      ],
      "rule": {
        "type": null
      },
      "data": {
        "color": "#000000"
      },
      "id": 11
    },
    {
      "name": [
        "Media"
      ],
      "rule": {
        "type": null
      },
      "id": 12,
      "data": {
        "color": "#194D33"
      }
    },
    {
      "name": [
        "Self-management"
      ],
      "rule": {
        "type": null
      },
      "id": 13,
      "data": {
        "color": "#AEA1FF"
      }
    },
    {
      "name": [
        "Deep work"
      ],
      "rule": {
        "type": null
      },
      "id": 14,
      "data": {
        "color": "#653294"
      }
    },
    {
      "name": [
        "Deep work",
        "Coding"
      ],
      "rule": {
        "type": "regex",
        "regex": "code|visual studio code|vscode|localhost|index",
        "ignore_case": true
      },
      "id": 15,
      "data": {
        "color": "#0062B1"
      }
    },
    {
      "name": [
        "General internet",
        "News"
      ],
      "rule": {
        "type": "regex",
        "regex": "NRK|VG|CNN|BBC|NBC|e24",
        "ignore_case": true
      },
      "id": 16,
      "data": {
        "color": "#AEA1FF"
      }
    },
    {
      "name": [
        "Deep work",
        "browsing"
      ],
      "rule": {
        "type": "regex",
        "regex": "Stack ?Overflow|GitHub|GitLab|nextAuth|vercel|spotify for developers|xstate|stately|pmndrs|react|nextjs|chatGPT|openai|pinned|typescript|javascript|python",
        "ignore_case": true
      },
      "id": 17,
      "data": {}
    },
    {
      "name": [
        "General"
      ],
      "rule": {
        "type": null
      },
      "id": 18,
      "data": {
        "color": "#FFFFFF"
      }
    },
    {
      "name": [
        "General",
        "System"
      ],
      "rule": {
        "type": "regex",
        "regex": "explorer.exe|lockapp.exe|Windows Default Lock Screen|nemo|calculator|file ?explorer|gnome[- ]screenshot|applications|system settings|app store",
        "ignore_case": true
      },
      "id": 19,
      "data": {}
    },
    {
      "name": [
        "Deep work",
        "Terminal"
      ],
      "rule": {
        "type": "regex",
        "regex": "ubuntu.exe|(gnome )?terminal|cmd.exe|bash|zsh|powershell",
        "ignore_case": true
      },
      "id": 20,
      "data": {
        "color": "#0C797D"
      }
    },
    {
      "name": [
        "Time sinks"
      ],
      "rule": {
        "type": null
      },
      "id": 21,
      "data": {
        "color": "#FE9200"
      }
    },
    {
      "name": [
        "Time sinks",
        "Toxic wastelands"
      ],
      "rule": {
        "type": "regex",
        "regex": "twitter|tiktok|facebook",
        "ignore_case": true
      },
      "id": 22,
      "data": {}
    },
    {
      "name": [
        "Media",
        "Comics"
      ],
      "rule": {
        "type": "regex",
        "regex": "webtoons",
        "ignore_case": true
      },
      "id": 23,
      "data": {}
    },
    {
      "name": [
        "Deep work",
        "Uni"
      ],
      "rule": {
        "type": "regex",
        "regex": "d2l.ucalgary.ca|ucalgary|d2l",
        "ignore_case": true
      },
      "id": 25,
      "data": {
        "color": "#9F0500"
      }
    },
    {
      "name": [
        "Comms",
        "Video chatting"
      ],
      "rule": {
        "type": "regex",
        "regex": "skype|zoom|webex",
        "ignore_case": true
      },
      "id": 26,
      "data": {}
    },
    {
      "name": [
        "Browsing"
      ],
      "rule": {
        "type": null
      },
      "id": 27,
      "data": {}
    },
    {
      "name": [
        "Browsing",
        "Search"
      ],
      "rule": {
        "type": "regex",
        "regex": "startpage|new tab",
        "ignore_case": true
      },
      "id": 28,
      "data": {}
    },
    {
      "name": [
        "Browsing",
        "Practical"
      ],
      "rule": {
        "type": "regex",
        "regex": "yr(\\.no)",
        "ignore_case": true
      },
      "id": 29,
      "data": {}
    },
    {
      "name": [
        "Media",
        "Art"
      ],
      "rule": {
        "type": "regex",
        "regex": "deviantart",
        "ignore_case": true
      },
      "id": 30,
      "data": {}
    },
    {
      "name": [
        "Time sinks",
        "General"
      ],
      "rule": {
        "type": "regex",
        "regex": "imgur",
        "ignore_case": true
      },
      "id": 31,
      "data": {}
    },
    {
      "name": [
        "General internet",
        "Video"
      ],
      "rule": {
        "type": "regex",
        "regex": "twitch",
        "ignore_case": true
      },
      "id": 32,
      "data": {}
    },
    {
      "name": [
        "Self-management",
        "High level planning"
      ],
      "rule": {
        "type": "regex",
        "regex": "Notion"
      },
      "id": 33,
      "data": {
        "color": "#0C797D"
      }
    },
    {
      "name": [
        "Deep work",
        "Data Analysis"
      ],
      "rule": {
        "type": "regex",
        "regex": "power Bi|excel"
      },
      "id": 34,
      "data": {}
    },
    {
      "name": [
        "Self-management",
        "low level planning"
      ],
      "rule": {
        "type": "regex",
        "regex": "google calender|calender|ticktick",
        "ignore_case": true
      },
      "id": 35,
      "data": {
        "color": "#16A5A5"
      }
    },
    {
      "name": [
        "Deep work",
        "typing"
      ],
      "rule": {
        "type": "regex",
        "regex": "10fastfingers|10FastFingers.com",
        "ignore_case": true
      },
      "id": 36,
      "data": {}
    },
    {
      "name": [
        "Learning"
      ],
      "rule": {
        "type": null
      },
      "id": 37,
      "data": {
        "color": "#7B64FF"
      }
    },
    {
      "name": [
        "Learning",
        "piano"
      ],
      "rule": {
        "type": "regex",
        "regex": "pianoforall|ultimate-guitar|ultimate guitar|Pianoforall",
        "ignore_case": true
      },
      "id": 38,
      "data": {}
    },
    {
      "name": [
        "Media",
        "shows n movies"
      ],
      "rule": {
        "type": "regex",
        "regex": "tv time|flixtor|flixtor.id|lost",
        "ignore_case": true
      },
      "id": 39,
      "data": {}
    },
    {
      "name": [
        "Self-management",
        "cleaning n settings"
      ],
      "rule": {
        "type": "regex",
        "regex": "settings|clean my mac|cleaner|onyx",
        "ignore_case": true
      },
      "id": 40,
      "data": {}
    },
    {
      "name": [
        "Browsing",
        "shopping"
      ],
      "rule": {
        "type": "regex",
        "regex": "amazon|ebay|instacart|google flights"
      },
      "id": 41,
      "data": {
        "color": "#FE9200"
      }
    },
    {
      "name": [
        "Learning",
        "articles"
      ],
      "rule": {
        "type": "regex",
        "regex": "blogs|blog|article|medium|dev"
      },
      "id": 42,
      "data": {}
    },
    {
      "name": [
        "General internet"
      ],
      "rule": {
        "type": null
      },
      "id": 43
    },
    {
      "name": [
        "General",
        "exploring apps"
      ],
      "rule": {
        "type": "regex",
        "regex": "apple store",
        "ignore_case": true
      },
      "id": 44,
      "data": {}
    },
    {
      "name": [
        "General",
        "finder"
      ],
      "rule": {
        "type": "regex",
        "regex": "finder",
        "ignore_case": true
      },
      "id": 45,
      "data": {}
    },
    {
      "name": [
        "Browsing",
        "other"
      ],
      "rule": {
        "type": "regex",
        "regex": "other - brave",
        "ignore_case": true
      },
      "id": 46,
      "data": {}
    },
    {
      "name": [
        "Self-management",
        "speedup workflow setup"
      ],
      "rule": {
        "type": "regex",
        "regex": "alfred|snippets",
        "ignore_case": true
      },
      "id": 47,
      "data": {}
    },
    {
      "name": [
        "Self-management",
        "speedup workflow setup",
        "Automation"
      ],
      "rule": {
        "type": "regex",
        "regex": "raycast",
        "ignore_case": true
      },
      "id": 48,
      "data": {}
    },
    {
      "name": [
        "Deep work",
        "UX/UI"
      ],
      "rule": {
        "type": "regex",
        "regex": "web design|UX|UI|color palettes|color palette|design|madbox",
        "ignore_case": true
      },
      "id": 49,
      "data": {}
    },
    {
      "name": [
        "Learning",
        "UX/UI"
      ],
      "rule": {
        "type": "regex",
        "regex": " - Audio playing|threejs-journey|Three.js Journey",
        "ignore_case": true
      },
      "id": 50,
      "data": {}
    }
  ]
}
*/
