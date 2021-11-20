import validate  from "validate.js";
function BechelorDegreeInfoDataModelObj(dataObj){
    if(validate.isEmpty(dataObj)){
        dataObj = {};
    }
    let curobj = {
        ceeb : !!dataObj.sb_ceeb ? dataObj.sb_ceeb : "",
        institutionName: !!dataObj.sb_name ? dataObj.sb_name : "",
        dateEarned: !!dataObj.sb_date_earned ? dataObj.sb_date_earned : "",
    }
    return curobj;
}

export const BachelorDegreeInfoDataModel = {
    BechelorDegreeInfoDataModelObj : BechelorDegreeInfoDataModelObj
}