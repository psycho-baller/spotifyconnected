import { Float, useScroll, Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Connections({
  textBoxRef,
  connection,
  boxRef,
  len,
  index,
}: {
  textBoxRef: React.MutableRefObject<any>;
  connection: string;
  boxRef: React.MutableRefObject<any>;
  len: number;
  index: number;
}) {
  let MyWidth = 13.844849711505825;
  let fontSize = 0.4;
  let floatRange = 0.02;
  let radius = 4;
  const initialVals = [fontSize, floatRange, radius];
  let width: number;
  let rotate: number

  const scroll = useScroll();
  const connectionRef = useRef(null) as React.MutableRefObject<any>;
  const textRef = useRef(null) as React.MutableRefObject<any>;
  const floatRef = useRef(null) as React.MutableRefObject<any>;
  const htmlTextRef = useRef(null) as React.MutableRefObject<any>;

  useFrame((state) => {
    // rotate the connection about the z axis when we scroll
    rotate = -scroll.offset * 100;
    width = state.viewport.width;

    fontSize = initialVals[0] * (width / MyWidth);
    floatRange = initialVals[1] * (width / MyWidth);
    radius = initialVals[2] * (width / MyWidth);

    //                fraction of the circle                   * radius of the circle
    connectionRef.current.position.x =
      boxRef.current.position.x +
      Math.cos((index / len) * 2 * Math.PI + rotate) * radius;
    connectionRef.current.position.y =
      boxRef.current.position.y +
      Math.sin((index / len) * 2 * Math.PI + rotate) * radius;

    htmlTextRef.current.position.x = textBoxRef.current.position.x;
    // + Math.cos((index / len) * 2 * Math.PI + rotateX) * radius;
    htmlTextRef.current.position.y = textBoxRef.current.position.y;
    // + Math.sin((index / len) * 2 * Math.PI + rotateY) * radius;

    textRef.current.fontSize = fontSize;
    floatRef.current.floatingRange = [-floatRange, floatRange]
  });
  
  return (
    <>
      <mesh
        ref={connectionRef}
        // onPointerOver={(e) => setHover(true)}
        // onPointerOut={(e) => setHover(false)}
        // onPointerDown={(e) => setActive(!active)}
        onPointerUp={(e) => {
          // link to song
          const url = `https://www.instagram.com/${connection}`;
          window.open(url, "_blank");
        }}
        //castShadow
        //receiveShadow
      >
        {/* @ts-ignore */}
        <Float
          ref={floatRef}
          rotationIntensity={1}
          floatIntensity={4}
          floatingRange={[-floatRange, floatRange]}
        >
          {/* @ts-ignore */}
          <Text
            ref={textRef}
            font={"bangers-v20-latin-regular.woff"}
            fontSize={fontSize}
          >
            <meshNormalMaterial />
            {connection}
          </Text>
        </Float>
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
      <mesh ref={htmlTextRef}>
        <Html className={`opacity-0 ${connection}`}>{connection}</Html>
      </mesh>
    </>
  );
}
