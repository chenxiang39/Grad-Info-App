import { createSlice } from '@reduxjs/toolkit';
import { TransferCourseDataModel } from '../../Model/transferCourse/TransferCourseDataModel';
import { TransferProgramOfStudyDataModel} from '../../Model/transferCourse/TransferProgramOfStudyDataModel';
import { BachelorDegreeInfoDataModel} from '../../Model/transferCourse/BachelorDegreeInfoDataModel'
export const TransferCourseSlice = createSlice({
    name : 'TransferCourse',
    initialState:{
        transferCourseTableData:TransferCourseDataModel.TransferCourseTableDataModelArray([]),
        transferProgramOfStudyTableData: TransferProgramOfStudyDataModel.TransferProgramOfStudyDataModelArr([]),
        bachelorDegreeInfoData: BachelorDegreeInfoDataModel.BechelorDegreeInfoDataModelArr([])
    },
    reducers: {
        SaveTransferCourseTableData: (state,action) =>{
            state.transferCourseTableData = action.payload;
        },
        SaveTransferProgramOfStudyTableData: (state,action) =>{
            state.transferProgramOfStudyTableData = action.payload;
        },
        SaveBachelorDegreeInfoData: (state,action) =>{
            state.bachelorDegreeInfoData = action.payload;
        }
    }
})
export const {SaveTransferCourseTableData,SaveTransferProgramOfStudyTableData, SaveBachelorDegreeInfoData} = TransferCourseSlice.actions; 
export const TransferCourseTableData = state => state.TransferCourse.transferCourseTableData;
export const TransferProgramOfStudyTableData = state => state.TransferCourse.transferProgramOfStudyTableData;
export const BachelorDegreeInfoData = state => state.TransferCourse.bachelorDegreeInfoData;
export default TransferCourseSlice.reducer;
