import { configureStore } from "@reduxjs/toolkit";
import StudentInfoReducer from './Slices/StudentInfo'
import AdmissionCourseReducer  from "./Slices/AdmissionCourse";
import TransferCourseReducer from "./Slices/TransferCourse";
import NonCourseRelatedEventReducer from './Slices/NonCourseRelatedEvent';
import CommentReducer from './Slices/Comment'
import UserInfoReducer from "./Slices/UserInfo";
import DegreeCheckReducer from "./Slices/DegreeCheck";
import setting from '../setting.json'
export const store = configureStore({
    reducer:{
        StudentInfo : StudentInfoReducer,
        AdmissionCourse : AdmissionCourseReducer,
        TransferCourse : TransferCourseReducer,
        NonCourseRelatedEvent : NonCourseRelatedEventReducer,
        Comment : CommentReducer,
        UserInfo : UserInfoReducer,
        DegreeCheck : DegreeCheckReducer
    },
    devTools:setting.Dev.ReduxDevTool,
})

export default store;