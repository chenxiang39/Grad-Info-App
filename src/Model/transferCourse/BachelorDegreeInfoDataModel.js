import validate  from "validate.js";
function BechelorDegreeInfoDataModelObj(dataObj){
    if(validate.isEmpty(dataObj)){
        dataObj = {};
    }
    let curobj = {
        ceeb : !!dataObj.sbCeeb ? dataObj.sbCeeb : "",
        institutionName: !!dataObj.sbName ? dataObj.sbName : "",
        dateEarned: !!dataObj.sbDateEarned ? dataObj.sbDateEarned : "",
    }
    return curobj;
}

export const BachelorDegreeInfoDataModel = {
    BechelorDegreeInfoDataModelObj : BechelorDegreeInfoDataModelObj
}