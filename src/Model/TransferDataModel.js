var validate = require("validate.js");
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

function TransferDataModelVal(Val){
    if(validate.isNumber(Val)){
        return Val.toFixed(2);
    }
    else{
        return Val;
    }
}

export const TransferDataModel = {
    TransferDataModelKey : TransferDataModelKey,
    TransferDataModelVal : TransferDataModelVal
}