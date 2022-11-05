import { FC } from 'react'

const Card: FC<ClassData> = (props) => {
  return (
    <>
      <div className="box">
        <h4>Name</h4>
        <span>{props.name}</span>
        <h4>Students</h4>
        <span>{props.students.join(', ')}</span>
      </div>
    </>
  )
}

export default Card