import { createSlice } from "@reduxjs/toolkit";
import { StarsExceptionDataModel } from "../../Model/starsException/StarsExceptionDataModel";
export const StarsExceptionSlice = createSlice({
    name : "StarsException",
    initialState : {
        starsExceptionTableData:StarsExceptionDataModel.StarsExceptionDataModelArray([]),
    },
    reducers:{
        SaveStarsExceptionTableData: (state, action) => {
            state.starsExceptionTableData = action.payload
        },
    }
}) 

export const {SaveStarsExceptionTableData} = StarsExceptionSlice.actions;
export const StarsExceptionTableData = state => state.StarsException.starsExceptionTableData;
export default StarsExceptionSlice.reducer;