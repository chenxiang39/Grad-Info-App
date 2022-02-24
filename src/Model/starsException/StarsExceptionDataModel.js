import  validate  from "validate.js";
function StarsExceptionDataModelArray(dataArr){
    let arr = [];
    if(validate.isEmpty(dataArr)){
        dataArr= [];
    }
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            key : i + 1,
            cd : !!dataArr[i].starsCd ? dataArr[i].starsCd : "",
            rname: !!dataArr[i].starsRname ? dataArr[i].starsRname : "",
            psname: !!dataArr[i].starsPsname ? dataArr[i].starsPsname : "",
            reqct : !!dataArr[i].starsReqct ? dataArr[i].starsReqct : "",
            reqhrs : !!dataArr[i].starsReqhrs ? dataArr[i].starsReqhrs : "",
            cline : !!dataArr[i].starsCline ? dataArr[i].starsCline : "",
            deptrep: !!dataArr[i].starsDeptRep ? dataArr[i].starsDeptRep : "",
            dept: !!dataArr[i].starsDept ? dataArr[i].starsDept : "",
            oper : !!dataArr[i].starsOper ? dataArr[i].starsOper : "",
            transdate : !!dataArr[i].starsTransdate ? dataArr[i].starsTransdate : "",
            responseMessage : !!dataArr[i].starsResponseMessage ? dataArr[i].starsResponseMessage : "",
            course : !!dataArr[i].starsCourse ? dataArr[i].starsCourse : "",
            rcourse : !!dataArr[i].starsRcourse ? dataArr[i].starsRcourse : ""
        }
        arr.push(curobj);
    }
    return arr;
}
function StarsExceptionDataModelObj(dataObj){
    let curobj = {
        starsCd:dataObj.cd,
        starsRname:dataObj.rname,
        starsPsname:dataObj.psname,
        starsReqct:dataObj.reqct,
        starsReqhrs:dataObj.reqhrs,
        starsCline:dataObj.cline,
        starsDeptRep:dataObj.deptrep,
        starsDept:dataObj.dept,
        starsOper:dataObj.oper,
        starsTransdate:dataObj.transdate,
        starsResponseMessage:dataObj.responseMessage,
        starsCourse:dataObj.course,
        starsRcourse:dataObj.rcourse
    }
    return curobj;
}
function StarsExceptionDataModelSubmitDataObj(StarsExceptionOriginalObj, studentInfoObj){
    let res = {};
    let StarsExceptionOriginalObjFinal = StarsExceptionDataModelObj(StarsExceptionOriginalObj);
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
    res = {
        studentInfo : studentObj,
        starsObject : StarsExceptionOriginalObjFinal
    }
    return res;
}
function StarsExceptionDataModelResponseObj(dataObj){
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
export const StarsExceptionDataModel = {
    StarsExceptionDataModelArray :　StarsExceptionDataModelArray,
    StarsExceptionDataModelObj : StarsExceptionDataModelObj,
    StarsExceptionDataModelSubmitDataObj : StarsExceptionDataModelSubmitDataObj,
    StarsExceptionDataModelResponseObj : StarsExceptionDataModelResponseObj
}