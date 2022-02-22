import { createSlice } from "@reduxjs/toolkit";
import { UserInfoDataModel} from '../../Model/userInfo/UserInfoDataModel'
 
export const UserInfoSlice = createSlice({
    name : "UserInfo",
    initialState : {
        userInfo: UserInfoDataModel.UserInfoDataModelObj({}),
        codeDescriptionArr : UserInfoDataModel.CodeAndDescriptionDataModelArr([])
    },
    reducers: {
        SaveUserInfo : (state, action) => {
            state.userInfo = action.payload;
        },
        SaveCodeAndDescription : (state, action) => {
            state.codeDescriptionArr = action.payload
        }
    }
})

export const {SaveUserInfo,SaveCodeAndDescription} = UserInfoSlice.actions;
export const UserInfo = state => state.UserInfo.userInfo;
export const CodeAndDescription = state => state.UserInfo.codeDescriptionArr;
export default UserInfoSlice.reducer;