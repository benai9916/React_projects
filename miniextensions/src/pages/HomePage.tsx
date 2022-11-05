import React, { FC} from 'react'
// local
import './style.css'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setStudentName } from 'store/slice/studentNameSlice'
import { getClassDetail, reset } from 'store/slice/classDetailSlice'
import Card from 'components/Card'

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const { studentName } = useAppSelector(state => state.studentName)
  const { classDetails, status, error } = useAppSelector(state => state.classDetails)
 
  const logout = () => {
    dispatch(setStudentName(undefined))
    dispatch(reset())
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStudentName(e.target.value))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (studentName.length > 0) {
      dispatch(reset())
      dispatch(getClassDetail(studentName))
    }
  }
  return (
    <div className='homepage'>
      {(status === 'pending') && <p>Loading...</p>}

      {(status === 'success') && (
        <>
          <button onClick={logout} className="logout">Logout</button>
          {classDetails?.map((itm: any, idx: number) => {
            return (<Card name={itm?.name} students={itm?.students} key={idx} />)
          })}
        </>
      )}

      {(!status || error) && (
        <form onSubmit={handleSubmit}>
          <label>
            Student name:
            <input
              autoFocus
              type="text"
              onChange={handleNameChange}
              value={studentName}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
       {error && <p>{error}</p>}
    </div>
  )
}

export default HomePage