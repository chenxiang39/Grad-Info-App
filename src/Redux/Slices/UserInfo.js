import { createSlice } from "@reduxjs/toolkit";
import { UserInfoDataModel} from '../../Model/userInfo/UserInfoDataModel'
 
export const UserInfoSlice = createSlice({
    name : "UserInfo",
    initialState : {
        userInfo: UserInfoDataModel.UserInfoDataModelObj({}),
        eventListArr : UserInfoDataModel.EventListDataModelArr([]),
        accessPostNumberList : UserInfoDataModel.AccessPostNumberListDataModelArr([])
    },
    reducers: {
        SaveUserInfo : (state, action) => {
            state.userInfo = action.payload;
        },
        SaveEventList : (state, action) => {
            state.eventListArr = action.payload
        },
        SaveAccessPostNumberList : (state, action) => {
            state.accessPostNumberList = action.payload
        }
    }
})

export const {SaveUserInfo,SaveEventList,SaveAccessPostNumberList} = UserInfoSlice.actions;
export const UserInfo = state => state.UserInfo.userInfo;
export const EventList = state => state.UserInfo.eventListArr;
export const AccessPostNumberList = state => state.UserInfo.accessPostNumberList;
export default UserInfoSlice.reducer;