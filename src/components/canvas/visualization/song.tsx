import { useState, useRef } from "react";
import type { SongType } from "@/utils/types";
import { Text, Float, useTexture, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Connection from "./connection";
export default function Song({ song, index }: { song: SongType; index: number }) {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef() as React.MutableRefObject<any>;
  const floatRef = useRef(null) as React.MutableRefObject<any>;
  const textPosRef = useRef(null) as React.MutableRefObject<any>;
  const textRef = useRef(null) as React.MutableRefObject<any>;
  const htmlTextRef = useRef(null) as React.MutableRefObject<any>;

  let MyWidth = 13.844849711505825;
  let textRange = 0.025;
  let boxSize = 2;
  let fontSize = 0.6;
  let textYOffset = 1.6;
  let boxSeparation = 8.5;
  const initialVals = [textRange, boxSize, fontSize, textYOffset, boxSeparation];
  let width: number;

  let numOfConnections: number = 0;

  useFrame((state) => {
    // get the orientation of the device
    // TODO: can be optimized with useThree
    width = state.viewport.width;
    fontSize = (width / MyWidth) * initialVals[2];
    textRange = (width / MyWidth) * initialVals[0];
    boxSize = (width / MyWidth) * initialVals[1];
    textYOffset = (width / MyWidth) * initialVals[3];
    boxSeparation = (width / MyWidth) * initialVals[4];

    // if (width < 5) {
    // ref.current.position.y = -(index * boxSeparation) + 1;
    // } else
    ref.current.position.y = -(index * boxSeparation);
    htmlTextRef.current.position.y =
      ref.current.position.y * 2.1 // (2.05 + ((width / MyWidth) * 0.05));  //-(index * boxSeparation) * (2.05 + (width / MyWidth) * 0.05);

    if (hovered) {
      ref.current.rotation.y += 0.01;
    }
    ref.current.scale.set(boxSize, boxSize, boxSize);
    textRef.current.fontSize = fontSize;
    textPosRef.current.position.y = ref.current.position.y + textYOffset;
    floatRef.current.floatingRange = [-textRange, textRange];
  });

  const textureUrl = song.image?.url
    ? song.image?.url
    : "https://i.imgur.com/1Q2wG4B.png";
  const texture = useTexture(textureUrl);
  
  return (
    <group
    // renderOrder={2}
    >
      <mesh
        //list of all the instagram usernames
        ref={ref}
        onPointerOver={(e) => {
          setHover(true);
          // rotate about the y axis
        }}
        onPointerOut={(e) => setHover(false)}
        onPointerDown={(e) => setActive(!active)}
        onPointerUp={(e) => {
          // link to song
          const url = `https://open.spotify.com/track/${song.id}`;
          window.open(url, "_blank");
        }}
        // scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        // position={}
        //castShadow
        //receiveShadow
      >
        <boxGeometry />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh
        ref={textPosRef}
        //position={[0, ref.current.position.y + textYOffset, 0]}
      >
        {/* @ts-ignore */}
        <Float
          ref={floatRef}
          rotationIntensity={1}
          floatIntensity={4}
          // position={posText}
          floatingRange={[-textRange, textRange]}
        >
          {/* @ts-ignore */}
          <Text
            font={"bangers-v20-latin-regular.woff"}
            fontSize={fontSize}
            ref={textRef}
            // position={posText}
          >
            <meshNormalMaterial />
            {song.name}
          </Text>
        </Float>
      </mesh>
      <mesh ref={htmlTextRef}>
        <Html
          className={`opacity-0 ${song.name}`}
        >
          {song.name}
        </Html>
      </mesh>
      {song.connections.instagram.map((connection, index) => {
        // show all around the song like a circle
        numOfConnections = song.connections.instagram.length;
        return (
          <Connection
            textBoxRef={htmlTextRef}
            boxRef={ref}
            connection={connection}
            len={numOfConnections}
            index={index}
            key={index}
          />
        );
      })}
    </group>
  );
}
