const Component = ({ data }) => {
  return data.map((day: any, i) => (
    <div key={i}>
      <h1>{JSON.stringify(day)}</h1>
      <p>{day.log}</p>

      <ol>
        {day.people.map((person: any, id) => (
          <li key={id}>{person}</li>
        ))}
      </ol>
    </div>
  ))
}

export default Component
