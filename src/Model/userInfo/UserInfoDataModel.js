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
function CodeAndDescriptionDataModelArr(dataArr){
    let res = dataArr.reduce(function(map,obj){
        map[obj.eventCode] = obj.eventDescription;
        return map;
    },{});
    return res;
}
export const UserInfoDataModel = {
    UserInfoDataModelObj : UserInfoDataModelObj,
    CodeAndDescriptionDataModelArr : CodeAndDescriptionDataModelArr
}