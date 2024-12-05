const Header = (props) => {
    return (
      <>
        <h1>Web development curriculum</h1>
        <h2>{props.course.name}</h2>
      </>
    )
  }
  
  const Content = (props) => {
    return (
      <>
        {props.course.parts.map(part => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}
      </>
    )
  }
  
  const Total = (props) => {
    const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <strong>Number of exercises: {totalExercises}</strong>
    )
  }
  
  const Course = (props) => {
    return (
      <>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total course={props.course} />
      </>
    )
  }

export default Course