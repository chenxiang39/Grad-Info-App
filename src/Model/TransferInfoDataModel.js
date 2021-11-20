var validate = require("validate.js");
function TransferInfoTableDataModelArr(dataArr){
    let arr = [];
    if(validate.isEmpty(dataArr)){
        dataArr = [];
    } 
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            key : i + 1,
            ceeb : !!dataArr[i].institution_ceeb ? dataArr[i].institution_ceeb: "",
            institutionName : !!dataArr[i].institution_name ? dataArr[i].institution_name: "",
            attendanceDate : !!dataArr[i].institution_date_earned ? dataArr[i].institution_date_earned: "",
        }
        arr.push(curobj);
    }
    return arr;
}
export const TransferInfoDataModel = {
    TransferInfoTableDataModelArr :TransferInfoTableDataModelArr
}