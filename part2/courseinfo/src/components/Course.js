import React from 'react';

const Header = ({text, importance}) => {
    const CustomHeader = `h${importance}`;
    return <CustomHeader>{text}</CustomHeader>;
}
    
const Total = ({parts}) => {
    const total = () => parts.reduce((sum, part) => sum += part.exercises, 0);
    return <b>Total of {total()} exercises</b>;
}
  
const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
    const addParts = () => 
        parts.map((parts) =>
            <Part name={parts.name} exercises={parts.exercises} key={parts.id}/>);

    return (      
    <div>
        {addParts()}
    </div>
    );
}

const Course = ({course}) => (
    <>
    <Header text={course.name} importance={2}/>
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
)

export {Course, Header};