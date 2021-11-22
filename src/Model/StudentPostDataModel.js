import  validate  from "validate.js";
function StudentPostDataModelObj(originalData){
    let res = {
        Obj: !!originalData.spObj ? originalData.spObj : "",
        Major: !!originalData.spMajor ? originalData.spMajor : "",
        NDocs: !!originalData.spNdocs ? originalData.spNdocs : "",
        Confu:!!originalData.spConfu ? originalData.spConfu : "",
        Admit:!!originalData.spAdmit ? originalData.spAdmit : "",
        ReAdmit:!!originalData.spReadmit ? originalData.spReadmit : "",
        TransactionDate: !!originalData.spTransdate ? originalData.spTransdate : "",
        EarnedUnits: !!originalData.spEarnunits ? originalData.spEarnunits.toFixed(2) : 0.00,
        RGUnits:!!originalData.spRgunits ? originalData.spRgunits.toFixed(2) : 0.00,
        GPAApply:!!originalData.spGpaApply ? originalData.spGpaApply.toFixed(2) : 0.00,
        GPAOverall:!!originalData.spGpaAll ? originalData.spGpaAll.toFixed(2) : 0.00,
    };
    return res;
}
function StudentPostDataModelKey(Key){
    if(Key === "ReAdmit"){
        return "Re Admit";
    }
    else if(Key === "TransactionDate"){
        return "Transaction Date"
    }
    else if(Key === "EarnedUnits"){
        return "Earned Units"
    }
    else if(Key === "RGUnits"){
        return "RG Units"
    }
    else if(Key === "GPAApply"){
        return "GPA Apply"
    }
    else if(Key === "GPAOverall"){
        return "GPA Overall"
    }
    else{
        return Key;
    }
}

function StudentPostDataModelObjFinal(originalData){
    if(validate.isEmpty(originalData)){
        originalData = {};
    }
    let legalData = StudentPostDataModelObj(originalData);
    let finalRes = [];
    for(let key in legalData){
        let newKey = StudentPostDataModelKey(key);
        let newVal = legalData[key];
        let obj = {[newKey] : newVal};
        finalRes.push(obj);
    }
    return finalRes;
}
export const StudentPostDataModel = {
    StudentPostDataModelObjFinal : StudentPostDataModelObjFinal,
}