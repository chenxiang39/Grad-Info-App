var validate = require("validate.js");
function TransferDataModelObj(dataObj){
    let curobj = {
        CEEB : !! dataObj. institution_ceeb ? dataObj. institution_ceeb : "",
        INSTITUTIONNAME : !! dataObj.institution_name ? dataObj.institution_name : "",
        DATESOFATTENDANCE : !! dataObj.institution_date_earned ? dataObj.institution_date_earned : ""
    }
    return curobj;
}
function TransferDataModelKey(Key){
    if(Key === "DATESOFATTENDANCE"){
        return "DATES OF ATTENDANCE";
    }
    else if(Key === "INSTITUTIONNAME"){
        return "INSTITUTION NAME "
    }
    else{
        return Key;
    }
}

function TransferDataModelLegalArr(dataObj){
    let legalObjData = TransferDataModelObj(dataObj);
    let legalTransferData = [];
    for(let key in legalObjData){
        let newKey = TransferDataModelKey(key);
        let newVal = legalObjData[key];
        let obj = {[newKey] : newVal};
        legalTransferData.push(obj);
    }
    return legalTransferData;
}

export const TransferDataModel = {
    TransferDataModelLegalArr :TransferDataModelLegalArr
}