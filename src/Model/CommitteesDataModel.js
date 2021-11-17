function examCommitteesDataModelObj(dataObj){
    let curObj = {
        exam_committee_name : dataObj.committeeName,
        exam_comittee_char :　dataObj.committeeChar
    }
    return curObj;
}
function examCommitteesDataModelArr(dataArr){
    let res = [];
    for(let i = 0; i < dataArr.length; i++){
        let curObj = {
            key: i + 1,
            committeeName : !!dataArr[i].exam_committee_name ? dataArr[i].exam_committee_name : "",
            committeeChar :　!!dataArr[i].exam_comittee_char ? dataArr[i].exam_comittee_char : "",
        }
        res.push(curObj);
    }
    return res;
}
function thesisCommitteesDataModelObj(dataObj){
    let curObj = {
        thesis_committee_name : dataObj.committeeName,
        thesis_comittee_char :　dataObj.committeeChar,
        thesis_committee_title : dataObj.paperTitle
    }
    return curObj;
}
function thesisCommitteesDataModelArr(dataArr){
    let res = [];
    for(let i = 0; i < dataArr.length; i++){
        let curObj = {
            key: i + 1,
            committeeName : !!dataArr[i].thesis_committee_name ? dataArr[i].thesis_committee_name : "",
            committeeChar :　!!dataArr[i].thesis_comittee_char ? dataArr[i].thesis_comittee_char : "",
            paperTitle: !!dataArr[i].thesis_committee_title ? dataArr[i].thesis_committee_title : "",
        }
        res.push(curObj);
    }
    return res;
}
export const CommitteesDataModel = {
    examCommitteesDataModelObj : examCommitteesDataModelObj,
    examCommitteesDataModelArr : examCommitteesDataModelArr,
    thesisCommitteesDataModelObj : thesisCommitteesDataModelObj,
    thesisCommitteesDataModelArr : thesisCommitteesDataModelArr
}