function TransferCourseTableDataModelHistoryArr(historyArr){
    let arr = [];
    for(let i = 0; i < historyArr.length; i++){
        let curobj = {
            course : !!historyArr[i].tr_history_course_name ? historyArr[i].tr_history_course_name : "",
            oper : !!historyArr[i].tr_history_course_oper ? historyArr[i].tr_history_course_oper : "",
            transactiondate: !!historyArr[i].tr_course_transdate ? historyArr[i].tr_course_transdate : "",
            apply : !!historyArr[i].tr_history_course_apply_status ? historyArr[i].tr_history_course_apply_status : false
        }
        arr.push(curobj);
    }
    return arr;
}
function TransferCourseTableDataModelArray(tableData){
    let arr = [];
    for(let i = 0; i < tableData.length; i++){
        let curobj = {
            key : i + 1,
            course : !!tableData[i].tr_course_name ? tableData[i].tr_course_name : "",
            term : !!tableData[i].tr_course_term ? tableData[i].tr_course_term : "",
            grade : !!tableData[i].tr_course_grade ? tableData[i].tr_course_grade : "",
            units : !!tableData[i].tr_course_units ? tableData[i].tr_course_units.toFixed(2) : 0.00,
            gpts : !!tableData[i].tr_course_gpts ? tableData[i].tr_course_gpts.toFixed(2) : 0.00,
            applyCode : !!tableData[i].tr_course_apply_code ? tableData[i].tr_course_apply_code : "",
            oper : !!tableData[i].tr_course_oper ? tableData[i].tr_course_oper : "",
            history : !!tableData[i].tr_course_history ? TransferCourseTableDataModelHistoryArr(tableData[i].tr_course_history) : [],
            transactiondate: !!tableData[i].tr_course_transdate ? tableData[i].tr_course_transdate : "",
            apply : !!tableData[i].tr_course_apply_status ? tableData[i].tr_course_apply_status : false
        }
        arr.push(curobj);
    }
    return arr;
}

function TransferCourseTableDataModelChooseDisableOrAble(item){
    if(item.applyCode === "X"){
        return {
            disabled: true,
            key: item.key,
        }
    }
    else{
        return {
            key: item.key,
        }
    }
}
function TransferCourseTableDataModelItemCanBeChosedArray(tableData){
    const result = tableData.filter((item) => {
        return item.applyCode !== "X";
    })
    return result;
}
function TransferCourseTableDataModelItemChosedArray(tableData){
    const result = tableData.filter((item) => {
        return item.apply === true;
    })
    return result;
}
export const TransferCourseDataModel = {
    TransferCourseTableDataModelArray : TransferCourseTableDataModelArray,
    TransferCourseTableDataModelChooseDisableOrAble : TransferCourseTableDataModelChooseDisableOrAble,
    TransferCourseTableDataModelItemCanBeChosedArray : TransferCourseTableDataModelItemCanBeChosedArray,
    TransferCourseTableDataModelItemChosedArray : TransferCourseTableDataModelItemChosedArray
}