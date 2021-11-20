import { createSlice } from "@reduxjs/toolkit";
import { NonCourseRelatedEventDataModel } from "../../Model/NonCourseRelatedEventDataModel";
import { CommitteeDataModel } from '../../Model/CommitteeDataModel'
export const NonCourseRelatedEventSlice = createSlice({
    name : "NonCourseRelatedEvent",
    initialState : {
        nonCourseRelatedEventTableData:NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelArray([]),
        examCommitteeTableData:CommitteeDataModel.examCommitteeDataModelArr([]),
        thesisCommitteeTableData:CommitteeDataModel.thesisCommitteeDataModelArr([])
    },
    reducers:{
        SaveNonCourseRelatedEventTableData: (state, action) => {
            state.nonCourseRelatedEventTableData = action.payload
        },
        SaveExamCommitteeTableData: (state, action) => {
            state.examCommitteeTableData = action.payload
        },
        SaveThesisCommitteeTableData: (state, action) => {
            state.thesisCommitteeTableData = action.payload
        }
    }
}) 

export const {SaveNonCourseRelatedEventTableData, SaveExamCommitteeTableData, SaveThesisCommitteeTableData} = NonCourseRelatedEventSlice.actions;
export const NonCourseRelatedEventTableData = state => state.NonCourseRelatedEvent.nonCourseRelatedEventTableData;
export const ExamCommitteeTableData = state => state.NonCourseRelatedEvent.examCommitteeTableData;
export const ThesisCommitteeTableData = state => state.NonCourseRelatedEvent.thesisCommitteeTableData;
export default NonCourseRelatedEventSlice.reducer;