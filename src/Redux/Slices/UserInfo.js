import { createSlice } from "@reduxjs/toolkit";
import { UserInfoDataModel} from '../../Model/userInfo/UserInfoDataModel'
 
export const UserInfoSlice = createSlice({
    name : "UserInfo",
    initialState : {
        userInfo: UserInfoDataModel.UserInfoDataModelObj({}),
        codeDescriptionArr : UserInfoDataModel.CodeAndDescriptionDataModelArr([]),
        accessPostNumberList : UserInfoDataModel.AccessPostNumberListDataModelArr([])
    },
    reducers: {
        SaveUserInfo : (state, action) => {
            state.userInfo = action.payload;
        },
        SaveCodeAndDescription : (state, action) => {
            state.codeDescriptionArr = action.payload
        },
        SaveAccessPostNumberList : (state, action) => {
            state.accessPostNumberList = action.payload
        }
    }
})

export const {SaveUserInfo,SaveCodeAndDescription,SaveAccessPostNumberList} = UserInfoSlice.actions;
export const UserInfo = state => state.UserInfo.userInfo;
export const CodeAndDescription = state => state.UserInfo.codeDescriptionArr;
export const AccessPostNumberList = state => state.UserInfo.accessPostNumberList;
export default UserInfoSlice.reducer;