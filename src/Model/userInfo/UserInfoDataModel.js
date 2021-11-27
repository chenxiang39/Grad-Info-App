import validate  from "validate.js";
function UserInfoDataModelObj(dataObj){
    if(validate.isEmpty(dataObj)){
        dataObj = {};
    }
    let curobj = {
        userid : !!dataObj.userId ? dataObj.userId : "",
        usercode : !!dataObj.userCode ? dataObj.userCode : "",
        username : !!dataObj.userName ? dataObj.userName : "",
        userpassword : !!dataObj.userPassword ? dataObj.userPassword : "",
        useroper: !!dataObj.userOper ? dataObj.userOper : "",
        userlocked: !!dataObj.userLocked ? dataObj.userLocked : "",
    }
    return curobj;
}

export const UserInfoDataModel = {
    UserInfoDataModelObj : UserInfoDataModelObj
}