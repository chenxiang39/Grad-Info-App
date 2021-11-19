function StudentPostDataModelObj(originalData){
    let res = {
        Obj: !!originalData.sp_obj ? originalData.sp_obj : "",
        Major: !!originalData.sp_major ? originalData.sp_major : "",
        NDocs: !!originalData.sp_ndocs ? originalData.sp_ndocs : "",
        Confu:!!originalData.sp_confu ? originalData.sp_confu : "",
        Admit:!!originalData.sp_admit ? originalData.sp_admit : "",
        ReAdmit:!!originalData.sp_readmit ? originalData.sp_readmit : "",
        TransactionDate: !!originalData.sp_transdate ? originalData.sp_transdate : "",
        EarnedUnits: !!originalData.sp_earnunits ? originalData.sp_earnunits.toFixed(2) : 0.00,
        RGUnits:!!originalData.sp_rgunits ? originalData.sp_rgunits.toFixed(2) : 0.00,
        GPAApply:!!originalData.sp_gpa_apply ? originalData.sp_gpa_apply.toFixed(2) : 0.00,
        GPAOverall:!!originalData.sp_gpa_all ? originalData.sp_gpa_all.toFixed(2) : 0.00,
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