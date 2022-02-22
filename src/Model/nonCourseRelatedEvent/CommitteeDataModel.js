import validate from "validate.js";
function examCommitteeDataModelObj(dataObj){
    let curObj = {
        examCommitteeName : dataObj.committeeName,
        examCommitteeChar :　dataObj.committeeChar
    }
    return curObj;
}
function examCommitteeDataModelArr(dataArr){
    let res = [];
    if(validate.isEmpty(dataArr)){
        dataArr = [];
    }
    for(let i = 0; i < dataArr.length; i++){
        let curObj = {
            key: i + 1,
            committeeName : !!dataArr[i].examCommitteeName ? dataArr[i].examCommitteeName : "",
            committeeChar :　!!dataArr[i].examCommitteeChar ? dataArr[i].examCommitteeChar : "",
        }
        res.push(curObj);
    }
    return res;
}
function examCommitteeDataModelSubmitObj(committeeOriginalObj, studentInfoObj){
    let res = {};
    let committeeOriginalObjFinal = examCommitteeDataModelObj(committeeOriginalObj);
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
    res = {
        studentInfo : studentObj,
        examCommitteeObject : committeeOriginalObjFinal
    }
    return res;
}
function thesisCommitteeDataModelObj(dataObj){
    let curObj = {
        thesisCommitteeName : dataObj.committeeName,
        thesisCommitteeChar :　dataObj.committeeChar,
        thesisCommitteeTitle : dataObj.paperTitle
    }
    return curObj;
}
function thesisCommitteeDataModelArr(dataArr){
    let res = [];
    if(validate.isEmpty(dataArr)){
        dataArr = [];
    }
    for(let i = 0; i < dataArr.length; i++){
        let curObj = {
            key: i + 1,
            committeeName : !!dataArr[i].thesisCommitteeName ? dataArr[i].thesisCommitteeName : "",
            committeeChar :　!!dataArr[i].thesisCommitteeChar ? dataArr[i].thesisCommitteeChar : "",
            paperTitle: !!dataArr[i].thesisCommitteeTitle ? dataArr[i].thesisCommitteeTitle : "",
        }
        res.push(curObj);
    }
    return res;
}
function thesisCommitteeDataModelSubmitObj(committeeOriginalObj, studentInfoObj){
    let res = {};
    let committeeOriginalObjFinal = thesisCommitteeDataModelObj(committeeOriginalObj);
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
    res = {
        studentInfo : studentObj,
        thesisCommitteeObject : committeeOriginalObjFinal
    }
    return res;
}
function committeeDataModelResponseObj(dataObj){
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
export const CommitteeDataModel = {
    examCommitteeDataModelObj : examCommitteeDataModelObj,
    examCommitteeDataModelArr : examCommitteeDataModelArr,
    examCommitteeDataModelSubmitObj : examCommitteeDataModelSubmitObj,
    thesisCommitteeDataModelObj : thesisCommitteeDataModelObj,
    thesisCommitteeDataModelArr : thesisCommitteeDataModelArr,
    thesisCommitteeDataModelSubmitObj : thesisCommitteeDataModelSubmitObj,
    committeeDataModelResponseObj : committeeDataModelResponseObj
}