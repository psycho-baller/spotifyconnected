import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ tracks }) {
  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)

  const filteredtracks =
    query === ''
      ? tracks
      : tracks.filter((person) => {
          return person.title.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox as='div' value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Label className='block text-sm font-medium text-gray-700'>Assigned to</Combobox.Label>
      <div className='relative mt-1'>
        <Combobox.Input
          className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
          onChange={(event) => setQuery(event.target.value)}
          // @ts-ignore
          displayValue={(person) => person?.title}
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
          <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </Combobox.Button>

        {filteredtracks.length > 0 && (
          <Combobox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredtracks.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                  )
                }>
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      <img src={person.albumImage} alt='' className='h-6 w-6 flex-shrink-0 rounded-full' />
                      <span className={classNames('ml-3 truncate', selected && 'font-semibold')}>{person.title}</span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600',
                        )}>
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
