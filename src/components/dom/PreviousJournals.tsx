const Component = ({ data }) => {
  return data.map((day: any, i) => (
    <div key={i}>
      <h1>{JSON.stringify(day.song)}</h1>
      <p>{day.log}</p>

      <ol>
        {day.people.map((person: any, id) => (
          <li key={id}>{person.name}</li>
        ))}
      </ol>
    </div>
  ))
}

export default Component
