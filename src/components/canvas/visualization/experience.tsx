import { ScrollControls, Scroll } from "@react-three/drei";
import { useThree  } from "@react-three/fiber";
import Songs from "./songs";
import { SongType } from "@/utils/types";
import Particles from "./particles";


export default function Experience({ data }: { data: SongType[] }) { 

  // const MyWidth = 13.844849711505825;
  const { viewport }  = useThree();
  const { width } = viewport;
  console.log(width);
  
  return (
    <>
      {/* <ambientLight /> */}
      {/* <pointLight position={[10, 10, 10]} /> */}
      {/* TODO: add light if needed */}
      <ScrollControls
        pages={data.length * 0.15 * width}
        // damping={4}
        // distance={1}
        // infinite={false} // Can also scroll infinitely (default: false)
        enabled={true}
      >
        <Scroll >
          <Songs
            data={data}
            // scrollRef={scrollRef}
          />
          <Particles />
        </Scroll>
      </ScrollControls>
    </>
  );
}
