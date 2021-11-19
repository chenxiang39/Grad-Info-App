import { createSlice } from '@reduxjs/toolkit';
import {getStudentInfoByStudentID} from '../../Api/studentInfo'
export const StudentSlice = createSlice({
    name : 'studentInfo',
    initialState:{
        studentID: "",
        studentPostNumber:"",
        studentInfo:{
            
        },
        studentPostData:{

        }
    },
    reducers: {
        SaveStudentID: (state,action) =>{
            state.studentID = action.payload;
        },
        SaveStudentPostNumber: (state,action) =>{
            state.studentPostNumber = action.payload;
        },
        LoadStudentInfo: (state, action) =>{
            state.studentInfo = action.payload;
        },
        LoadStudentPostData: (state, action) => {
            state.studentPostData = action.payload;
        }
    }
})
export const LoadStudentInfoByStudentID = (studentID) => {
    return getStudentInfoByStudentID(studentID);
}
export const {SaveStudentID,SaveStudentPostNumber,LoadStudentPostData} = StudentSlice.actions; 
export const StudentID = state => state.StudentInfo.studentID;
export const StudentPostNumber = state => state.StudentInfo.studentPostNumber;
export const StudentInfo = state => state.StudentInfo.studentInfo;
export const StudentPostData = state => state.StudentInfo.studentPostData;
export default StudentSlice.reducer;
