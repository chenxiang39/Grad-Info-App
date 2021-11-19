import { configureStore } from "@reduxjs/toolkit";
import StudentInfoReducer from './Slices/StudentInfo'
import AdmissionCourseReducer  from "./Slices/AdmissionCourse";
import TransferCourseReducer from "./Slices/TransferCourse";
import setting from '../setting.json'
export default configureStore({
    reducer:{
        StudentInfo : StudentInfoReducer,
        AdmissionCourse: AdmissionCourseReducer,
        TransferCourse: TransferCourseReducer
    },
    devTools:setting.Dev.ReduxDevTool,
})