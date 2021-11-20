import { createSlice } from "@reduxjs/toolkit";
import { UserInfoDataModel} from '../../Model/UserInfoDataModel'
 
export const UserInfoSlice = createSlice({
    name : "UserInfo",
    initialState : {
        userInfo: UserInfoDataModel.UserInfoDataModelObj({})
    },
    reducers: {
        SaveUserInfo : (state, action) => {
            state.userInfo = action.payload;
        }
    }
})

export const {SaveUserInfo} = UserInfoSlice.actions;
export const UserInfo = state => state.UserInfo.userInfo;
export default UserInfoSlice.reducer;