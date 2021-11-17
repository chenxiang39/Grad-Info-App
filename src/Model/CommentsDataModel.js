function CommentsDataModelArray(dataArr){
    let arr = [];
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            key : i + 1,
            oper : !!dataArr[i].comment_oper ? dataArr[i].comment_oper : "",
            transactiondate: !!dataArr[i].comment_transdate ? dataArr[i].comment_transdate : "",
            content : !!dataArr[i].cooment_content ? dataArr[i].cooment_content : "",
        }
        arr.push(curobj);
    }
    return arr;
}
function CommentsDataModelObj(dataObj){
    let curobj = {
        comment_oper : dataObj.oper,
        comment_transdate: dataObj.transactiondate,
        cooment_content : dataObj.content,
    }
    return curobj;
}
export const CommentsDataModel = {
    CommentsDataModelArray :　CommentsDataModelArray,
    CommentsDataModelObj : CommentsDataModelObj
}