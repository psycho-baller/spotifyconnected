import { OrbitControls } from '@react-three/drei'
import { signIn, useSession } from "next-auth/react"
import router from 'next/router'
import { Suspense } from 'react'
import Scene from '../canvas/Scene'
import SpinningVisual from '../canvas/SpinningVisual'


export default function Page(props) {
    const { data: session, status } = useSession()


    return (
        <section className="grid md:grid-cols-2 pb-20 xl:gap-4 lg:gap-3 md:gap-2 min-h-screen">
            {/* <div className="flex flex-col justify-center items-center"> */}
            <section className="col-span-1 p-4"  // xl:pt-40 lg:pt-30
            >
                <h1 className=" lg:text-5xl md:text-4xl text-3xl capitalize xl:pt-12 py-4 appealing-text font-HitNRun text-center md:text-left"

                >Journaling for the music lovers</h1>
                <p className="xl:text-2xl lg:text-xl sm:text-lg text-md mt-4">Wanna connect your favorite memories to a song? or a specific song reminds you of someone? You can create and explore all these connections with <span className='capitalize' > music journal</span></p>
                <p className="xl:text-2xl lg:text-xl sm:text-lg text-md mt-4">Choose your favorite song everyday and connect it to your most memorable memories and people</p>
                <p className="xl:text-2xl lg:text-xl sm:text-lg text-md mt-4">View your connections in cool interactive visuals that you can easily share with your friends</p>
                <p className="xl:text-2xl lg:text-xl sm:text-lg text-md mt-4">You can seamlessly connect <span className="capitalize">music journal</span> to your favorite journaling apps like <a className='appealing-text'
                    href="#features"
                >Obsidian, Notion, and many more!</a>
                    <div className='arrow bounce' />
                </p>
                {/* CTA button */}
                <div className='flex md:justify-start justify-center items-center lg:mt-2 md:mt-1 mb-2' >
                    <button className="appealing-button font-bold py-2 px-4 rounded mt-4"
                        onClick={() => {
                            if (!session) {
                                signIn('spotify')
                            } else {
                                // go to dashboard
                                router.push("/dashboard")
                            }
                        }}

                    >
                        {session ? 'Go to dashboard' : 'Sign in with Spotify'}
                    </button>

                </div>
                <div className="font-extralight pl-3">
                    <p >
                        still confused?
                    </p>
                    <a className="flex" href="#features">
                        <p className="appealing-text" >Learn more about <span className='capitalize' > music journal&apos;s</span>  features</p>
                        <div className='arrow bounce' />
                    </a></div>
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