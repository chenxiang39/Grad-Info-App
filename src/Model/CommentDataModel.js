import  validate  from "validate.js";
function CommentDataModelArray(dataArr){
    let arr = [];
    if(validate.isEmpty(dataArr)){
        dataArr= [];
    }
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            key : i + 1,
            oper : !!dataArr[i].comment_oper ? dataArr[i].comment_oper : "",
            transactiondate: !!dataArr[i].comment_transdate ? dataArr[i].comment_transdate : "",
            content : !!dataArr[i].comment_content ? dataArr[i].comment_content : "",
        }
        arr.push(curobj);
    }
    return arr;
}
function CommentDataModelObj(dataObj){
    let curobj = {
        comment_oper : dataObj.oper,
        comment_transdate: dataObj.transactiondate,
        cooment_content : dataObj.content,
    }
    return curobj;
}
export const CommentDataModel = {
    CommentDataModelArray :　CommentDataModelArray,
    CommentDataModelObj : CommentDataModelObj
}