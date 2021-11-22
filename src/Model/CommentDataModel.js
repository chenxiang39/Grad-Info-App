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
        coomentContent : dataObj.content,
    }
    return curobj;
}
export const CommentDataModel = {
    CommentDataModelArray :　CommentDataModelArray,
    CommentDataModelObj : CommentDataModelObj
}