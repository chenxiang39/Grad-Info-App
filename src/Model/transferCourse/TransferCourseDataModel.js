import  validate  from "validate.js";
import moment from "moment";
function TransferCourseTableDataModelHistoryArr(historyArr){
    let arr = [];
    if(validate.isEmpty(historyArr)){
        historyArr = [];
    } 
    for(let i = 0; i < historyArr.length; i++){
        let curobj = {
            course : !!historyArr[i].trHistoryCourseName ? historyArr[i].trHistoryCourseName : "",
            oper : !!historyArr[i].trHistoryCourseOper ? historyArr[i].trHistoryCourseOper : "",
            transactiondate: !!historyArr[i].trHistoryCourseTransdate ? historyArr[i].trHistoryCourseTransdate : "",
            apply : !!historyArr[i].trHistoryCourseApplyStatus ? historyArr[i].trHistoryCourseApplyStatus : false
        }
        arr.push(curobj);
    }
    return arr;
}
function TransferCourseTableDataModelArray(tableData){
    if(validate.isEmpty(tableData)){
        tableData = [];
    } 
    let arr = [];
    for(let i = 0; i < tableData.length; i++){
        let curobj = {
            key : i + 1,
            id : !!tableData[i].trCourseId ? tableData[i].trCourseId : "",
            course : !!tableData[i].trCourseName ? tableData[i].trCourseName : "",
            term : !!tableData[i].trCourseTerm ? tableData[i].trCourseTerm : "",
            grade : !!tableData[i].trCourseGrade ? tableData[i].trCourseGrade : "",
            units : !!tableData[i].trCourseUnits ? tableData[i].trCourseUnits.toFixed(2) : 0.00,
            gpts : !!tableData[i].trCourseGpts ? tableData[i].trCourseGpts.toFixed(2) : 0.00,
            applyCode : !!tableData[i].trCourseApplyCode ? tableData[i].trCourseApplyCode : "",
            oper : !!tableData[i].trCourseOper ? tableData[i].trCourseOper : "",
            history : !!tableData[i].trCourseHistory ? TransferCourseTableDataModelHistoryArr(tableData[i].trCourseHistory) : [],
            transactiondate: !!tableData[i].trCourseTransdate ? tableData[i].trCourseTransdate : "",
            apply : !!tableData[i].trCourseApplyStatus ? tableData[i].trCourseApplyStatus : false
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
function TransferCourseTableDataModelSubmitDataObj(appliedArr, studentInfoObj, userInfo){
    let res = {};
    let courselist = [];
    if(validate.isEmpty(appliedArr)){
        courselist = [];
    }
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    if(validate.isEmpty(userInfo)){
        userInfo = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
    let userInfoObj = {
        userOper : !! userInfo.useroper ? userInfo.useroper : "",
        transDate : moment().format("MM/DD/YYYY")
    };
    for(let i = 0; i < appliedArr.length; i++){
        let curObj = {
            courseId : !!appliedArr[i].id ? appliedArr[i].id : ""
        }
        courselist.push(curObj);
    }
    res = {
        userInfo : userInfoObj,
        studentInfo : studentObj,
        courseList : courselist
    }
    return res;
}
function TransferCourseTableDataModelSubmitResponseDataObj(dataObj){
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
export const TransferCourseDataModel = {
    TransferCourseTableDataModelArray : TransferCourseTableDataModelArray,
    TransferCourseTableDataModelChooseDisableOrAble : TransferCourseTableDataModelChooseDisableOrAble,
    TransferCourseTableDataModelItemCanBeChosedArray : TransferCourseTableDataModelItemCanBeChosedArray,
    TransferCourseTableDataModelItemChosedArray : TransferCourseTableDataModelItemChosedArray,
    TransferCourseTableDataModelSubmitDataObj : TransferCourseTableDataModelSubmitDataObj,
    TransferCourseTableDataModelSubmitResponseDataObj : TransferCourseTableDataModelSubmitResponseDataObj
}