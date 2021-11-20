import  validate  from "validate.js";
import moment from "moment";
function AdmissionCoursesTableDataModelHistoryArr(historyArr){
    let arr = [];
    if(validate.isEmpty(historyArr)){
        historyArr = [];
    }   
    for(let i = 0; i < historyArr.length; i++){
        let curobj = {
            course : !!historyArr[i].ad_history_course_name ? historyArr[i].ad_history_course_name : "",
            oper : !!historyArr[i].ad_history_course_oper ? historyArr[i].ad_history_course_oper : "",
            transactiondate: !!historyArr[i].ad_course_transdate ? historyArr[i].ad_course_transdate : "",
            apply : !!historyArr[i].ad_history_course_apply_status ? historyArr[i].ad_history_course_apply_status : false
        }
        arr.push(curobj);
    }
    return arr;
}
function AdmissionCoursesTableDataModelArray(tableData){
    let arr = [];
    if(validate.isEmpty(tableData)){
        tableData = [];
    }   
    for(let i = 0; i < tableData.length; i++){
        let curobj = {
            key : i + 1,
            id: !!tableData[i]. ad_course_id ? tableData[i]. ad_course_id : "",
            course : !!tableData[i].ad_course_name ? tableData[i].ad_course_name : "",
            term : !!tableData[i].ad_course_term ? tableData[i].ad_course_term : "",
            grade : !!tableData[i].ad_course_grade ? tableData[i].ad_course_grade : "",
            units : !!tableData[i].ad_course_units ? tableData[i].ad_course_units.toFixed(2) : 0.00,
            gpts : !!tableData[i].ad_course_gpts ? tableData[i].ad_course_gpts.toFixed(2) : 0.00,
            applyCode : !!tableData[i].ad_course_apply_code ? tableData[i].ad_course_apply_code : "",
            oper : !!tableData[i].ad_course_oper ? tableData[i].ad_course_oper : "",
            history : !!tableData[i].ad_course_history ? AdmissionCoursesTableDataModelHistoryArr(tableData[i].ad_course_history) : [],
            transactiondate: !!tableData[i].ad_course_transdate ? tableData[i].ad_course_transdate : "",
            apply : !!tableData[i].ad_course_apply_status ? tableData[i].ad_course_apply_status : false
        }
        arr.push(curobj);
    }
    return arr;
}

function AdmissionCoursesTableDataModelChooseDisableOrAble(item){
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
function AdmissionCoursesTableDataModelItemCanBeChosedArray(tableData){
    const result = tableData.filter((item) => {
        return item.applyCode !== "X";
    })
    return result;
}
function AdmissionCoursesTableDataModelItemChosedArray(tableData){
    const result = tableData.filter((item) => {
        return item.apply === true;
    })
    return result;
}
function AdmissionCoursesTableDataModelSubmitDataArray(appliedArr, useroper){
    let res = [];
    if(validate.isEmpty(appliedArr)){
        appliedArr = [];
    }
    if(validate.isEmpty(useroper)){
        useroper = "";
    }
    for(let i = 0; i < appliedArr.length; i++){
        let curObj = {
            ad_course_id : !!appliedArr[i].id ? appliedArr[i].id : "",
            ad_course_oper : !!useroper ? useroper : "",
            ad_course_apply_status : !!appliedArr[i].apply ? appliedArr[i].apply : false,
            ad_course_transdate : moment().format("MM/DD/YYYY")
        }
        res.push(curObj);
    }
    return res;
}
export const AdmissionCourseDataModel = {
    AdmissionCoursesTableDataModelArray : AdmissionCoursesTableDataModelArray,
    AdmissionCoursesTableDataModelChooseDisableOrAble : AdmissionCoursesTableDataModelChooseDisableOrAble,
    AdmissionCoursesTableDataModelItemCanBeChosedArray : AdmissionCoursesTableDataModelItemCanBeChosedArray,
    AdmissionCoursesTableDataModelItemChosedArray : AdmissionCoursesTableDataModelItemChosedArray,
    AdmissionCoursesTableDataModelSubmitDataArray : AdmissionCoursesTableDataModelSubmitDataArray
}