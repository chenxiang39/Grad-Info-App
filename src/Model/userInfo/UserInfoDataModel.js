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
        userEventAccessLevel: !!dataObj.userEventAccessLevel ? dataObj.userEventAccessLevel : "",
        userSuper : !!dataObj.userSuper ? dataObj.userSuper : ""
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
function AccessPostNumberListDataModelArr(dataArr){
    let res = [];
    if(validate.isEmpty(dataArr)){
        return res;
    }
    for(let i = 0; i < dataArr.length; i++){
        res.push( !! dataArr[i].spPostNumber ? dataArr[i].spPostNumber : "");
    }
    return res;
}
export const UserInfoDataModel = {
    UserInfoDataModelObj : UserInfoDataModelObj,
    CodeAndDescriptionDataModelArr : CodeAndDescriptionDataModelArr,
    AccessPostNumberListDataModelArr : AccessPostNumberListDataModelArr
}