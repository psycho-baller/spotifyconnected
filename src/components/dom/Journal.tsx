import { HiOutlineAtSymbol, HiOutlineSave } from 'react-icons/hi'
import { FaMusic } from 'react-icons/fa'
import Image from 'next/image'
import Search from './Search'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Track } from '@/utils/types'

export default function Page({ tracks, setTracks }: any) {
  type Inputs = {
    people: string
    journalEntry: string
    track: Track
  }
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // get the selected track
    const selectedTrack = tracks.find((t: Track) => t.selected)
    // check if selectedTrack is not null
    // if (!selectedTrack) {
    //   return
    // }
    // remove the selected property from the track
    selectedTrack && delete selectedTrack.selected && delete selectedTrack.timesPlayed
    // add selectedfTrack to the data
    data.track = selectedTrack
    // send data to the server
    fetch('/api/submit-day-journal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }
  return (
    <section className='xl:mx-24 lg:mx-18 md:mx-10 sm:mx-4 mx-0.5'>
      <form className='translucent-dashboard-box rounded-lg sm:p-10 p-4' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-3xl font-bold mb-6 capitalize text-center'>Your journal</h1>
        <div>
          <div className='flex justify-between items-center'>
            <label htmlFor='comment' className='block text-sm font-medium capitalize'>
              Today&apos;s Journal Entry
            </label>

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
              className='block px-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-900'
              defaultValue={''}
              {...register('journalEntry')}
            />
          </div>
        </div>

        {/* connections */}
        <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-3'>
            <Search tracks={tracks} setTracks={setTracks} />
          </div>
          <div className='sm:col-span-3'>
            <label htmlFor='last-name' className='block text-sm font-medium '>
              People
            </label>
            <div className='mt-1'>
              <input
                type='text'
                name='first-name'
                id='first-name'
                autoComplete='given-name'
                className='search-input p-1 sm:p-1.5 block w-full !rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-900'
                {...register('people')}
              />
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-auto'>
          <span className='sr-only'>Save</span>
          <HiOutlineSave className='h-6 w-6' />
        </button>
      </form>
    </section>
  )
}
