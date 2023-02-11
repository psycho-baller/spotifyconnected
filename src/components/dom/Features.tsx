// TODO: We can have a help section where we go step by step on how to we can help you

export default function Page(props) {
  return (
    // TODO: smooth transition between page sections
    <section className='pb-20  sm:px-0 min-h-screen' id='features'>
      {/* <div className="flex flex-col justify-center items-center"> */}
      <h1 className='lg:text-5xl md:text-4xl text-3xl capitalize hover:opacity-100 appealing-text font-HitNRun text-center'>
        How it works
      </h1>
      <div className='grid md:grid-cols-12 mt-10 space-x-1 gap-12'>
        <div
          className='md:col-start-2 md:col-span-5 p-6 sm:p-10 translucent-box rounded-xl'
          // style={{
          //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
          // }}
        >
          <h2 className='xl:text-4xl md:text-3xl text-2xl capitalize hover:opacity-100 appealing-text font-HitNRun text-center mb-4'>
            What you do
          </h2>
          <ol className='space-y-3 xl:space-y-4'>
            <li className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
              First, you write your daily journal entry, only this time you reference a song
            </li>
            <li className='xl:text-2xl lg:text-xl sm:text-lg text-md space-y-2 xl:space-y-3'>
              <p>There's multiple ways to write your journal entry:</p>
              <div className='space-y-1.5 sm:space-y-2 xl:space-y-3 pl-2'>
                <p>if through the dashboard, you can search for your most played songs for the day and select one</p>
                <p>
                  if through another app using the extension/plugin, you can reference a song with a specific key{'  '}
                  <span className='text-[#A0E4CB]'>
                    (default is ^<span className='italic'>insert song name here</span>^)
                  </span>
                  {'  '}
                  in your journal entry and it will automatically get saved here
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div
          className='md:col-span-5 p-6 sm:p-10 translucent-box rounded-xl'
          // style={{
          //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
          // }}
        >
          <h2 className='xl:text-4xl md:text-3xl text-2xl capitalize hover:opacity-100 appealing-text font-HitNRun text-center mb-4'>
            What you get
          </h2>
          <ol className='space-y-3 xl:space-y-4'>
            <li className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
              An interconnected timeline of your favorite songs and the memories and people they bring back
              {/* A way to connect your favorite songs to the people and memories they bring back */}
            </li>
            <li className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
              Beautiful visualizations of your favorite songs and the people they remind you of
            </li>
            <li className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
              Easily share these visualizations to your friends and family
            </li>
            <li className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
              Automatically generate playlists based on your songs of the day, week, month, year, etc...
            </li>
            <li className='xl:text-2xl lg:text-xl sm:text-lg text-md '>
              And it's all free! No ads, no hidden fees, no nothing! Click on the crystal below to get started
            </li>
          </ol>
        </div>
      </div>
      {/* </div> */}
    </section>
  )
}
