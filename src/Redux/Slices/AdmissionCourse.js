import { createSlice } from '@reduxjs/toolkit';
export const AdmissionCourseSlice = createSlice({
    name : 'AdmissionCourse',
    initialState:{
        admissionCourseTableData:[]
    },
    reducers: {
        SaveAdmissionCourseTableData: (state,action) =>{
            state.admissionCourseTableData = action.payload;
        },
    }
})
export const {SaveAdmissionCourseTableData} = AdmissionCourseSlice.actions; 
export const AdmissionCourseTableData = state => state.AdmissionCourse.admissionCourseTableData;
export default AdmissionCourseSlice.reducer;
