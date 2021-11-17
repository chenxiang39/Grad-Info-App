function NonCourseRelatedEventDataModelArray(dataArr){
    let arr = [];
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            key : i + 1,
            code : !!dataArr[i].event_code ? dataArr[i].event_code : "",
            description : !!dataArr[i].event_description ? dataArr[i].event_description : "",
            related : !!dataArr[i].ncrer_related ? dataArr[i].ncrer_related : "",
            oper : !!dataArr[i].ncrer_oper ? dataArr[i].ncrer_oper : "",
            transactiondate : !!dataArr[i].ncrer_transdate ? dataArr[i].ncrer_transdate : "",
        }
        arr.push(curobj);
    }
    return arr;
}

export const NonCourseRelatedEventDataModel = {
    NonCourseRelatedEventDataModelArray : NonCourseRelatedEventDataModelArray
}