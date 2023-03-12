import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import Image from 'next/image'
import Scroll from '@/utils/Scroll'
import { Track } from '@/utils/types'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ tracks, setTracks }) {
  const [query, setQuery] = useState('')
  const [selectedsong, setSelectedsong] = useState(null)
  // custom setSelectedsong function to modify the data too
  const setSelectedsongAndData = (song) => {
    setSelectedsong(song)
    setTracks((tracks: Track[]) => tracks.map((track) => (track.title === song ? { ...track, selected: true } : track)))
  }

  const filteredtracks =
    query === ''
      ? tracks
      : tracks.filter((song: { title: string }) => {
          return song.title.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox as='div' value={selectedsong} onChange={setSelectedsongAndData} className=''>
      <Combobox.Label className='block text-sm font-medium capitalize'>Song of the day</Combobox.Label>
      <div className='relative mt-1'>
        <Combobox.Button className='w-full'>
          <Combobox.Input
            type='text'
            name='search-song'
            id='search-song'
            placeholder='Search song'
            className='search-input w-full p-1 sm:p-1.5 rounded-md border border-gray-300  shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
            onChange={(event) => setQuery(event.target.value)}
            // @ts-ignore
            displayValue={(song) => song?.title}
          />
          <div className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
            <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
        </Combobox.Button>

        {filteredtracks.length > 0 && (
          // <Scroll>
          <Combobox.Options className='absolute translucent-dropdown z-10 mt-1 max-h-56 sm:max-h-56 w-full overflow-auto shadow-lg border-2 border-gray-300 rounded-lg text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredtracks.map((song: any) => (
              <Combobox.Option
                key={song.id}
                value={song}
                className={({ active }) =>
                  classNames('relative cursor-default select-none py-2 px-3', active ? 'bg-indigo-600' : '')
                }>
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center truncate mr-1'>
                        <Image
                          height={24}
                          width={24}
                          src={song.albumCover}
                          alt='album cover'
                          className='flex-shrink-0 rounded-full'
                        />
                        <span className={classNames('ml-3 ', selected && 'font-semibold')}>{song.title}</span>
                      </div>
                      <div className={classNames('flex items-center gap-2', active ? 'text-white' : 'text-indigo-500')}>
                        {song.timesPlayed > 1 && <span className=''>x{song.timesPlayed}</span>}
                        {selected && (
                          <span>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
          // </Scroll>
        )}
      </div>
    </Combobox>
  )
}
