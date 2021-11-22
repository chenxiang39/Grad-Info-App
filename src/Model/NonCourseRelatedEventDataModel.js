import  validate  from "validate.js";
function NonCourseRelatedEventDataModelArray(dataArr){
    let arr = [];
    if(validate.isEmpty(dataArr)){
        dataArr = [];
    }   
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            key : i + 1,
            code : !!dataArr[i].eventCode ? dataArr[i].eventCode : "",
            description : !!dataArr[i].eventDescription ? dataArr[i].eventDescription : "",
            related : !!dataArr[i].ncrerRelated ? dataArr[i].ncrerRelated : "",
            oper : !!dataArr[i].ncrerOper ? dataArr[i].ncrerOper : "",
            transactiondate : !!dataArr[i].ncrerTransdate ? dataArr[i].ncrerTransdate : "",
        }
        arr.push(curobj);
    }
    return arr;
}
function NonCourseRelatedEventDataModelObj(dataObj){
    if(validate.isEmpty(dataObj)){
        dataObj = {};
    }
    let curobj = {
        eventCode : !!dataObj.code ? dataObj.code: "",
        eventDescription : !!dataObj.description ? dataObj.description: "",
        ncrerRelated : !!dataObj.related ? dataObj.related : "",
        ncrerOper : !!dataObj.oper ? dataObj.oper : "",
        ncrerTransdate : !!dataObj.transactiondate ? dataObj.transactiondate: ""
    }
    return curobj;
}
export const NonCourseRelatedEventDataModel = {
    NonCourseRelatedEventDataModelArray : NonCourseRelatedEventDataModelArray,
    NonCourseRelatedEventDataModelObj : NonCourseRelatedEventDataModelObj
}