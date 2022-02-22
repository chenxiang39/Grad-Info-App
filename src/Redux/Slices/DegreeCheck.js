import { createSlice } from '@reduxjs/toolkit';
import { DegreeCheckDataModel } from '../../Model/degreeCheck/DegreeCheckDataModel';
export const DegreeCheckSlice = createSlice({
    name : 'DegreeCheck',
    initialState:{
        degreeCheckTableData:DegreeCheckDataModel.DegreeCheckTableDataModelArray([])
    },
    reducers: {
        SaveDegreeCheckTableData: (state,action) =>{
            state.degreeCheckTableData = action.payload;
        },
    }
})
export const {SaveDegreeCheckTableData} = DegreeCheckSlice.actions; 
export const DegreeCheckTableData = state => state.DegreeCheck.degreeCheckTableData;
export default DegreeCheckSlice.reducer;