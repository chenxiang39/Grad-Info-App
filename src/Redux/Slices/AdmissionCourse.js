import { createSlice } from '@reduxjs/toolkit';
import { AdmissionCourseDataModel } from '../../Model/AdmissionCourseDataModel';
export const AdmissionCourseSlice = createSlice({
    name : 'AdmissionCourse',
    initialState:{
        admissionCourseTableData:AdmissionCourseDataModel.AdmissionCourseTableDataModelArray([])
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
