import { createSlice } from '@reduxjs/toolkit';
import { StudentPostDataModel} from '../../Model/studentInfo/StudentPostDataModel'
import {StudentInfoDataModel} from '../../Model/studentInfo/StudentInfoDataModel'
export const StudentSlice = createSlice({
    name : 'studentInfo',
    initialState:{
        studentID: "",
        studentPostNumber:"",
        studentInfo:StudentInfoDataModel.StudentInfoDataModelObj({}),
        studentPostData:StudentPostDataModel.StudentPostDataModelObjFinal({})
    },
    reducers: {
        SaveStudentID: (state,action) =>{
            state.studentID = action.payload;
        },
        SaveStudentPostNumber: (state,action) =>{
            state.studentPostNumber = action.payload;
        },
        SaveStudentInfo: (state, action) =>{
            state.studentInfo = action.payload;
        },
        SaveStudentPostData: (state, action) => {
            state.studentPostData = action.payload;
        }
    }
})
export const {SaveStudentID,SaveStudentPostNumber,SaveStudentInfo,SaveStudentPostData} = StudentSlice.actions; 
export const StudentID = state => state.StudentInfo.studentID;
export const StudentPostNumber = state => state.StudentInfo.studentPostNumber;
export const StudentInfoData = state => state.StudentInfo.studentInfo;
export const StudentPostData = state => state.StudentInfo.studentPostData;
export default StudentSlice.reducer;
