import validate  from "validate.js";
function UserInfoDataModelObj(dataObj){
    if(validate.isEmpty(dataObj)){
        dataObj = {};
    }
    let curobj = {
        userid : !!dataObj.user_id ? dataObj.user_id : "",
        usercode : !!dataObj.user_code ? dataObj.user_code : "",
        username : !!dataObj.user_name ? dataObj.user_name : "",
        userpassword : !!dataObj.user_password ? dataObj.user_password : "",
        useroper: !!dataObj.user_oper ? dataObj.user_oper : "",
        userlocked: !!dataObj.user_locked ? dataObj.user_locked : "",
    }
    return curobj;
}

export const UserInfoDataModel = {
    UserInfoDataModelObj : UserInfoDataModelObj
}