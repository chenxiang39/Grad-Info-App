var validate = require("validate.js");
function TransferProgramOfStudyDataModelArr(dataArr){
    let arr = [];
    if(validate.isEmpty(dataArr)){
        dataArr = [];
    } 
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            key : i + 1,
            ceeb : !!dataArr[i].institutionCeeb ? dataArr[i].institutionCeeb: "",
            institutionName : !!dataArr[i].institutionName ? dataArr[i].institutionName: "",
            attendanceDate : !!dataArr[i].institutionDateEarned ? dataArr[i].institutionDateEarned: "",
        }
        arr.push(curobj);
    }
    return arr;
}
export const TransferProgramOfStudyDataModel = {
    TransferProgramOfStudyDataModelArr :TransferProgramOfStudyDataModelArr
}