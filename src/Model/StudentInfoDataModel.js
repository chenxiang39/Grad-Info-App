var validate = require("validate.js");
function StudentInfoDataModelKey(Key){
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

function StudentInfoDataModelVal(Val){
    if(validate.isNumber(Val)){
        return Val.toFixed(2);
    }
    else{
        return Val;
    }
}

export const StudentInfoDataModel = {
    StudentInfoDataModelKey : StudentInfoDataModelKey,
    StudentInfoDataModelVal : StudentInfoDataModelVal
}