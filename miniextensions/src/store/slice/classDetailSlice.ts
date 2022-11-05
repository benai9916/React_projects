import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState:ClassStatess = {
  classDetails: [],
  status: undefined,
  error: null
}

export const getClassDetail = createAsyncThunk
('classDetail/getClassDetail', 
  async (studentName: string, { rejectWithValue }) => {
    let classes: ClassDataTable[] = [];
    const studentsReferenc: { [key: string]: string } = {};

    axios.defaults.baseURL = 'https://api.airtable.com/v0/app8ZbcPx7dkpOnP0';
    axios.defaults.headers.common.Authorization = `Bearer ${process.env.REACT_APP_API_KEY}`;
    return axios.get(`/Students?filterByFormula={Name}="${studentName}"`)
      .then(res => {
        if (res.data.records.length === 0) {
          throw new Error('No student by that name, try another.');
        }
        return axios.get(
          `/Classes?filterByFormula=${
            `OR(${res.data.records[0].fields.Classes.map(
              (classId: string) => `RECORD_ID()="${classId}"`
            ).join(',')})`
          }`
        );
      })
      .then(res => {
        classes = res.data.records.reduce(
          (allClasses: ClassDataTable[], singleClasss: ClassDataResponse) =>
            allClasses.concat(singleClasss.fields),
          [])
        let stuFilter = `OR(${classes.reduce(
            (allStudents: string[], singleClass: { Students: string[] }) =>
              allStudents.concat(singleClass.Students),
            []
          ).map((studentId: string) => `RECORD_ID()="${studentId}"`).join(',')})`

        return axios.get(
          `/Students?filterByFormula=${stuFilter}&fields%5B%5D=Name`
        );
      })
      .then(res => {
        const students = res.data.records;
        students.forEach((student: StudentTable) => {
          studentsReferenc[student.id] = student.fields.Name!;
        });
        return classes.map((classData: { Name: string; Students: string[] }) => ({
          name: classData.Name,
          students: classData.Students.map(
            (studentId: string) => studentsReferenc[studentId]
          ),
        }))
      })
      .catch(err => {
        return rejectWithValue(`No student by that name ${studentName}`)
      });
  } 
)

const classDetailSlice =  createSlice({
  name: 'classDetail',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder: any) => {
    builder.addCase(getClassDetail.pending, (state: any) => {
      state.status = 'pending'
    })
    builder.addCase(getClassDetail.fulfilled, (state: any, action: IAction) => {
      state.status = 'success'
      state.classDetails = action.payload
    })
    builder.addCase(getClassDetail.rejected, (state: any, action: IAction) => {
      state.status = 'error'
      state.error = action.payload
    })
  }
})

export const {reset} = classDetailSlice.actions
export default classDetailSlice
