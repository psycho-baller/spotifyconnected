import dynamic from 'next/dynamic'
import Scene from '../canvas/Scene'


export default function Page(props) {

    const Journal = dynamic(() => import('@/components/canvas/models/Journal'), { ssr: false })
    const Spotify = dynamic(() => import('@/components/canvas/models/Spotify'), { ssr: false })
    return (
        <section className="grid sm:grid-cols-2 gap-12 pb-40 px-5 sm:px-0">
            {/* <div className="flex flex-col justify-center items-center"> */}
            <section className="col-span-1 rounded-xl border-spacing-3.5 p-4"
            // style={{
            //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
            // }}
            >
                <h1 className="text-4xl font-bold">Welcome to my app</h1>
            </section>
            <section className="col-span-1 rounded-xl border-spacing-3.5 p-4"
            // style={{
            //     background: 'linear-gradient(180deg, rgba(111, 56, 197, 0.3) 0%, rgba(111, 56, 197, 0.3) 100%)',
            // }}
            >
                <Scene  >
                    <Journal scale={0.1} position={[-1, .2, 0]} rotation={[Math.PI / 2.5, Math.PI / 6, 0]} />
                    <Spotify position={[1, 0, 0]} />
                </Scene>
            </section>
            {/* </div> */}





        </section>
    )
}