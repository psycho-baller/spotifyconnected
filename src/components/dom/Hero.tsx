import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Scene from '../canvas/Scene'
import SpinningVisual from '../canvas/SpinningVisual'


export default function Page(props) {

    return (
        <section className="grid md:grid-cols-2 pb-20 gap-12 sm:px-0 min-h-screen">
            {/* <div className="flex flex-col justify-center items-center"> */}
            <section className="col-span-1 p-4"
            // style={{
            //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
            // }}
            >
                <h1 className="text-5xl font-black capitalize py-4 appealing-text font-HitNRun"
                // TODO: make that shit thicker with a new font

                >Journaling for the music lovers</h1>
                <p className="text-xl mt-2">Wanna connect your favorite memories to a song, or a specific song reminds you of someone? You can create and explore all these connections with <span className='capitalize' > music journal</span></p>
                <p className="text-xl mt-2">You can seamlessly connect music journal to your favorite journaling apps like <span className='appealing-text' >Obsidian, Notion, and many more!</span></p>
                <p className="text-xl mt-2">It&apos;s a place to keep track of your favorite songs, albums, and artists.</p>
            </section>
            <section className="col-span-1 p-4"
            // style={{
            //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
            // }}
            >
                <Scene   >
                    <ambientLight intensity={0.40} />

                    <OrbitControls
                        enableZoom={false}
                    // keep the camera from rotating around the y-axis
                    // enablePan={false}
                    />
                    <Suspense>
                        <SpinningVisual />
                    </Suspense>
                </Scene>
            </section>
            {/* </div> */}





        </section >
    )
}