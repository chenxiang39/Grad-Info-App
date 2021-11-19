import { configureStore } from "@reduxjs/toolkit";
import StudentInfoReducer from './Slices/StudentInfo'
import setting from '../setting.json'
export default configureStore({
    reducer:{
        StudentInfo : StudentInfoReducer,
    },
    devTools:setting.Dev.ReduxDevTool,
})