export default function Page(props: { color1: string; color2: string }) {
  // a section of the page where I have 2 colors from the props and I want to use them to create a gradient
  // I want to use the gradient as the background of the section
  return (
    <div
      className='w-screen h-40'
      style={{
        backgroundColor: `linear-gradient(180deg, ${props.color1} 0%, ${props.color2} 100%)`,
        zIndex: 10,
      }}
    />
  )
}
