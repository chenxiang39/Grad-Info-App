import { createSlice } from '@reduxjs/toolkit';
export const TransferCourseSlice = createSlice({
    name : 'TransferCourse',
    initialState:{
        TransferCourseTableData:[]
    },
    reducers: {
        SaveTransferCourseTableData: (state,action) =>{
            state.TransferCourseTableData = action.payload;
        },
    }
})
export const {SaveTransferCourseTableData} = TransferCourseSlice.actions; 
export const TransferCourseTableData = state => state.TransferCourse.TransferCourseTableData;
export default TransferCourseSlice.reducer;
