var validate = require("validate.js");
function BechelorDegreeInfoDataModelArr(dataArr){
    let arr = [];
    let newArr = [];
    if(!validate.isEmpty(dataArr.bachelorDegreeList)){
        newArr = dataArr.bachelorDegreeList;
    } 
    for(let i = 0; i < newArr.length; i++){
        let curobj = {
            key : i + 1,
            ceeb : !!newArr[i].sbCeeb ? newArr[i].sbCeeb: "",
            institutionName : !!newArr[i].sbName ? newArr[i].sbName: "",
            attendanceDate : !!newArr[i].sbDateEarned ? newArr[i].sbDateEarned: "",
        }
        arr.push(curobj);
    }
    return arr;
}
export const BachelorDegreeInfoDataModel = {
    BechelorDegreeInfoDataModelArr : BechelorDegreeInfoDataModelArr
}