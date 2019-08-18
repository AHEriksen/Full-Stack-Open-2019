import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({text, importance}) => {
    const CustomHeader = `h${importance}`;
    return <CustomHeader>{text}</CustomHeader>
}
    
const Total = ({parts}) => {
    const total = () => parts.reduce((sum, part) => sum += part.exercises, 0);
    return <b>Total of {total()} exercises</b>
}
  
const Part = ({name, exercises}) =>
    <p>{name} {exercises}</p>

const Content = ({parts}) => {
    const addParts = () => 
        parts.map((parts) =>
            <Part name={parts.name} exercises={parts.exercises} key={parts.id}/>);

    return (      
    <div>
        {addParts()}
    </div>
    )
}

const Course = ({course}) => (
    <>
    <Header text={course.name} importance={2}/>
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
)

const App = () => {
    const course = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                     name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                     name: 'Redux',
                    exercises: 11,
                    id: 4
                },
                ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing', 
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                },
            ]
        } 
    ]

    const courses = () => (
        course.map((course) => <Course course={course} key={course.id}/>)
    )

    return (
        <div>
            <Header text='Web development curriculum' importance={1}/>
            {courses()}
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)