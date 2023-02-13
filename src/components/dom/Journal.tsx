import { useEffect, useState } from 'react'
import Scroll from '@/utils/Scroll'
import { HiOutlineAtSymbol } from 'react-icons/hi'
import { FaMusic } from 'react-icons/fa'

export default function Page({ tracks, setTracks }: any) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    // for now we will just filter the tracks by the title, but we can add more filters later
    const results = tracks.filter((track) => track.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results)
  }, [searchTerm, tracks])

  return (
    <section className='xl:mx-24 lg:mx-18 md:mx-10 sm:mx-4 mx-0.5'>
      <form className='translucent-dashboard-box rounded-lg sm:p-10 p-4'>
        <h1 className='text-3xl font-bold mb-6 capitalize text-center'>Your journal</h1>
        <div>
          <div className='flex justify-between items-center'>
            <label htmlFor='comment' className='block text-sm font-medium capitalize'>
              Today's Journal Entry
            </label>
            {/* <span className=''>New</span> */}

            <div className='space-x-0.5'>
              <button
                title='Mention someone'
                type='button'
                className='-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Mention someone</span>
                <HiOutlineAtSymbol className='h-4 w-4' />
              </button>
              <button
                title='Reference a song'
                type='button'
                className='-m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Reference a song</span>
                <FaMusic className='h-4 w-4' />
              </button>
            </div>
          </div>
          <div className='mt-1'>
            <textarea
              rows={4}
              name='comment'
              id='comment'
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-900'
              defaultValue={''}
            />
          </div>
        </div>

        {/* connections */}
        <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-3'>
            <label htmlFor='first-name' className='block text-sm font-medium '>
              Song of the day
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='search-song'
                id='search-song'
                placeholder='Search song'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete='given-name'
                className='search-input p-1 block w-full !rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-900'
              />
              {/* when the input is active, show the popup that shows the search results in a scrollable list*/}
              {/* dropdown */}
              <div className='bg-white w-96 rounded-lg shadow-lg absolute z-100 border-2 border-gray-300 invisible focus:visible focus-within:visible active:visible hover:visible'>
                <div className='flex flex-col items-center '>
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
          </div>
          <div className='sm:col-span-3'>
            <label htmlFor='last-name' className='block text-sm font-medium '>
              People
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='last-name'
                id='last-name'
                autoComplete='family-name'
                className='search-input p-1 block w-full !rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-900'
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
