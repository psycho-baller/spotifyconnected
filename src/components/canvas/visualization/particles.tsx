import { useFrame } from "@react-three/fiber";
import { Sparkles, useScroll } from "@react-three/drei";
import { useRef } from "react";


export default function Particles() {

    const sparklesRef = useRef(null) as React.MutableRefObject<any>;
    
    const scroll = useScroll();
    const count = 500;
    // float 32 array for the random colors
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      // positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }



    useFrame((state) => {
      // rotate the sparkles around the camera when we scroll
        sparklesRef.current.rotation.x = -scroll.offset * 50;
      // make sure the sparkles follow scroll
      sparklesRef.current.position.y = -scroll.offset * 377 * 0.15 * state.viewport.width;
      
    });

    return (
      //@ts-ignore
      <Sparkles
        // renderOrder={0}
        ref={sparklesRef}
        position={[0, 0, 5]}
        /** Number of particles (default: 100) */
        count={count}
        /** Speed of particles (default: 1) */
        // speed={1}
        /** Opacity of particles (default: 1) */
        // opacity?: number | Float32Array
        /** Color of particles (default: 100) */
        // random color
        color={colors}
        /** Size of particles (default: randomized between 0 and 1) */
        size={20}
        /** The space the particles occupy (default: 1) */
        scale={55}
        /** Movement factor (default: 1) */
        // noise?: number | [number, number, number] | THREE.Vector3 | Float32Array
        // position={[0, 0, 0]}
      />
    );
    }
