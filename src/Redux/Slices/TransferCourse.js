import { createSlice } from '@reduxjs/toolkit';
import { TransferCourseDataModel } from '../../Model/TransferCourseDataModel';
import { TransferInfoDataModel} from '../../Model/TransferInfoDataModel';
import { BachelorDegreeInfoDataModel} from '../../Model/BachelorDegreeInfoDataModel'
export const TransferCourseSlice = createSlice({
    name : 'TransferCourse',
    initialState:{
        transferCourseTableData:TransferCourseDataModel.TransferCourseTableDataModelArray([]),
        transferInfoTableData: TransferInfoDataModel.TransferInfoTableDataModelArr([]),
        bachelorDegreeInfoData: BachelorDegreeInfoDataModel.BechelorDegreeInfoDataModelObj({})
    },
    reducers: {
        SaveTransferCourseTableData: (state,action) =>{
            state.transferCourseTableData = action.payload;
        },
        SaveTransferInfoTableData: (state,action) =>{
            state.transferInfoTableData = action.payload;
        },
        SaveBachelorDegreeInfoData: (state,action) =>{
            state.bachelorDegreeInfoData = action.payload;
        }
    }
})
export const {SaveTransferCourseTableData,SaveTransferInfoTableData, SaveBachelorDegreeInfoData} = TransferCourseSlice.actions; 
export const TransferCourseTableData = state => state.TransferCourse.transferCourseTableData;
export const TransferInfoTableData = state => state.TransferCourse.transferInfoTableData;
export const BachelorDegreeInfoData = state => state.TransferCourse.bachelorDegreeInfoData;
export default TransferCourseSlice.reducer;
