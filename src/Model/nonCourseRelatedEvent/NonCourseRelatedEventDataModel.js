import moment from "moment";
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
            date : !!dataArr[i].ncrerDate ? dataArr[i].ncrerDate : "",
            transactiondate : !!dataArr[i].ncrerTransdate ? dataArr[i].ncrerTransdate : "",
        }
        arr.push(curobj);
    }
    return arr;
}
function NonCourseRelatedEventDataModelToDataBaseObj(dataObj){
    if(validate.isEmpty(dataObj)){
        dataObj = {};
    }
    let curobj = {
        eventCode : !!dataObj.code ? dataObj.code: "",
        eventDescription : !!dataObj.description ? dataObj.description: "",
        ncrerRelated : !!dataObj.related ? dataObj.related : "",
        ncrerOper : !!dataObj.oper ? dataObj.oper : "",
        ncrerDate : !!dataObj.date ? dataObj.date: "",
        ncrerTransdate : !!dataObj.transactiondate ? dataObj.transactiondate: ""
    }
    return curobj;
}
function NonCourseRelatedEventDataModelSubmitDataObj(eventOriginalObj, studentInfoObj){
    let res = {};
    let eventObjFinal = NonCourseRelatedEventDataModelToDataBaseObj(eventOriginalObj);
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
    res = {
        studentInfo : studentObj,
        eventObject : eventObjFinal
    }
    return res;
}
function NonCourseRelatedEventDataModelResponseDataObj(dataObj){
    let res = {};
    if(validate.isEmpty(dataObj)){
        dataObj = {
            flag:false,
            reason:[]
        };
    }
    res = {
        flag : !!dataObj.flag ? dataObj.flag: false,
        reason : !!dataObj.reasonList ? dataObj.reasonList: []
    }
    return res;
}
export const NonCourseRelatedEventDataModel = {
    NonCourseRelatedEventDataModelArray : NonCourseRelatedEventDataModelArray,
    NonCourseRelatedEventDataModelToDataBaseObj : NonCourseRelatedEventDataModelToDataBaseObj,
    NonCourseRelatedEventDataModelSubmitDataObj : NonCourseRelatedEventDataModelSubmitDataObj,
    NonCourseRelatedEventDataModelResponseDataObj : NonCourseRelatedEventDataModelResponseDataObj
}