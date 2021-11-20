import { configureStore } from "@reduxjs/toolkit";
import StudentInfoReducer from './Slices/StudentInfo'
import AdmissionCourseReducer  from "./Slices/AdmissionCourse";
import TransferCourseReducer from "./Slices/TransferCourse";
import NonCourseRelatedEventReducer from './Slices/NonCourseRelatedEvent';
import CommentReducer from './Slices/Comment'
import setting from '../setting.json'
export default configureStore({
    reducer:{
        StudentInfo : StudentInfoReducer,
        AdmissionCourse: AdmissionCourseReducer,
        TransferCourse: TransferCourseReducer,
        NonCourseRelatedEvent : NonCourseRelatedEventReducer,
        Comment: CommentReducer,
    },
    devTools:setting.Dev.ReduxDevTool,
})