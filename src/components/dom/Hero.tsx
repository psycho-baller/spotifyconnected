import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Scene from '../canvas/Scene'
import SpinningVisual from '../canvas/SpinningVisual'


export default function Page(props) {

    return (
        <section className="grid md:grid-cols-2 pb-20 gap-12 px-5 sm:px-0 min-h-screen">
            {/* <div className="flex flex-col justify-center items-center"> */}
            <section className="col-span-1 p-4"
            // style={{
            //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
            // }}
            >
                <h1 className="text-5xl font-bold capitalize py-4">Journaling for the music lovers</h1>
                <p className="text-xl mt-2">A journaling app that helps you keep track of your music listening habits.</p>
                <p className="text-xl mt-2">It&apos;s a place to keep track of your favorite songs, albums, and artists.</p>
                <p className="text-xl mt-2">It&apos;s a place to keep track of your favorite songs, albums, and artists.</p>
            </section>
            <section className="col-span-1 p-4"
            // style={{
            //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
            // }}
            >
                <Scene  >
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





        </section>
    )
}