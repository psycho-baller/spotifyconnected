

export default function Page(props) {

    return (
        <section className="rid md:grid-cols-2 gap-4 pb-40 px-5 sm:px-0 filter" >
            {/* <div className="flex flex-col justify-center items-center"> */}
            <section className="col-span-1">
                <h1 className="text-4xl font-bold text-white">Welcome to my app</h1>
            </section>
            <section className="col-span-1">
                <p className="text-white text-lg">This is a simple app that uses Spotify's API to get your most listened songs and display them in a list.</p>
            </section>
            {/* </div> */}
        </section>
    )
}