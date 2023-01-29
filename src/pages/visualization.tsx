import Canvas from '@/components/canvas/Scene'
import QuestionCircle from '@/components/canvas/visualization/questionCircle'
import Search from '@/components/canvas/visualization/search'
import dynamic from 'next/dynamic'


const Experience = dynamic(() => import('@/components/canvas/visualization/experience'), { ssr: false })

export default function Page(props) {
  return (
    <>
            <Search />
        {/* <QuestionCircle /> */}
    <Canvas orbit={false} >
      <Experience data={props.data} />
    </Canvas></>
  )
}

// Page.canvas = (props) => <Experience data={props.data} />

export async function getStaticProps() {
  return { props: 
    { title: 'Visualization',
      data: [
        {
          name: 'Song 1',
          id: '1',
          connections: {
            instagram: ['@user1', '@user2', '@user3']
          }
        },
        {
          name: 'Song 2',
          id: '2',
          connections: {
            instagram: ['@user1', '@user2', '@user3']
          }
        },
        {
          name: 'Song 3',
          id: '3',
          connections: {
            instagram: ['@user1', '@user2', '@user3']
          }
        },
        {
          name: 'Song 4',
          id: '4',
          connections: {
            instagram: ['@user1', '@user2', '@user3']
          }
        },
      ]
  
  } 
  }
}
