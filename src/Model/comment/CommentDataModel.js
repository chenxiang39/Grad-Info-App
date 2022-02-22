import  validate  from "validate.js";
function CommentDataModelArray(dataArr){
    let arr = [];
    if(validate.isEmpty(dataArr)){
        dataArr= [];
    }
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            key : i + 1,
            oper : !!dataArr[i].commentOper ? dataArr[i].commentOper : "",
            transactiondate: !!dataArr[i].commentTransdate ? dataArr[i].commentTransdate : "",
            content : !!dataArr[i].commentContent ? dataArr[i].commentContent : "",
        }
        arr.push(curobj);
    }
    return arr;
}
function CommentDataModelObj(dataObj){
    let curobj = {
        commentOper : dataObj.oper,
        commentTransdate: dataObj.transactiondate,
        commentContent : dataObj.content,
    }
    return curobj;
}
function CommentDataModelSubmitDataObj(commentOriginalObj, studentInfoObj){
    let res = {};
    let commentOriginalObjFinal = CommentDataModelObj(commentOriginalObj);
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
    res = {
        studentInfo : studentObj,
        commentObject : commentOriginalObjFinal
    }
    return res;
}
function CommentDataModelResponseObj(dataObj){
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
export const CommentDataModel = {
    CommentDataModelArray :　CommentDataModelArray,
    CommentDataModelObj : CommentDataModelObj,
    CommentDataModelSubmitDataObj : CommentDataModelSubmitDataObj,
    CommentDataModelResponseObj : CommentDataModelResponseObj
}