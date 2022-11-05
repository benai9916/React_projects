import { configureStore } from '@reduxjs/toolkit'
import classDetailSlice from './slice/classDetailSlice'
import studentNameSlice from './slice/studentNameSlice'

const store = configureStore({
  reducer: {
    classDetails: classDetailSlice.reducer,
    studentName: studentNameSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
