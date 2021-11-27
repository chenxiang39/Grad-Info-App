import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StudentPostDataModel} from '../../Model/StudentPostDataModel'
import {StudentInfoDataModel} from '../../Model/StudentInfoDataModel'
import { getStudentInfoByStudentID} from '../../Api/studentInfo'

export const fetchStudentInfoByStudentID = createAsyncThunk(
    'StudentInfo/fetchStudentInfoByStudentID',
    async (curStudentID, {rejectWithValue}) => {
        try{
            ChangeStudentInfoLoading("idle");
            const data = await getStudentInfoByStudentID(curStudentID);
            return StudentInfoDataModel.StudentInfoDataModelObj(data);
        }catch(error){
            return rejectWithValue("network error!!");
        }
    }
)
export const StudentSlice = createSlice({
    name : 'StudentInfo',
    initialState:{
        studentID: "",
        studentPostNumber:"",
        studentInfo:
        {
            data: StudentInfoDataModel.StudentInfoDataModelObj({}),
            loading: "idle",
        },
        studentPostData:{
            data: StudentPostDataModel.StudentPostDataModelObjFinal({}),
            loading: "idle"
        }
    },
    reducers: {
        SaveStudentID: (state,action) =>{
            state.studentID = action.payload;
        },
        SaveStudentPostNumber: (state,action) =>{
            state.studentPostNumber = action.payload;
        },
        ChangeStudentInfoLoading : (state, action) =>{
            state.studentInfo.loading = action.payload;
        },
        SaveStudentPostData: (state, action) => {
            state.studentPostData = action.payload;
        },
    },
    extraReducers : (builder) => {
        builder.addCase(
            fetchStudentInfoByStudentID.fulfilled, (state, action) => {
                state.studentInfo.data = action.payload;
                state.studentInfo.loading = "success";
            }
        )
        builder.addCase(
            fetchStudentInfoByStudentID.rejected, (state, action) => {
                console.log(action.payload);
                state.studentInfo.loading = "failed";
            }
        )
    }
})
export const {SaveStudentID,SaveStudentPostNumber,SaveStudentPostData, ChangeStudentInfoLoading} = StudentSlice.actions; 
export const StudentID = state => state.StudentInfo.studentID;
export const StudentPostNumber = state => state.StudentInfo.studentPostNumber;
export const StudentInfoData = state => state.StudentInfo.studentInfo.data;
export const StudentInfoLoading = state => state.StudentInfo.studentInfo.loading;
export const StudentPostData = state => state.StudentInfo.studentPostData;
export default StudentSlice.reducer;
