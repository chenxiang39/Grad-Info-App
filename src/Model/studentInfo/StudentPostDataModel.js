import  validate  from "validate.js";
function StudentPostDataModelObjFinal(originalData){
    let res = {
        Obj: !!originalData.spObj ? originalData.spObj : "",
        Major: !!originalData.spMajor ? originalData.spMajor : "N/A",
        NDocs: !!originalData.spNdocs ? originalData.spNdocs : "N/A",
        Confu:!!originalData.spConfu ? originalData.spConfu : "N/A",
        Admit:!!originalData.spAdmit ? originalData.spAdmit : "N/A",
        ReAdmit:!!originalData.spReadmit ? originalData.spReadmit : "N/A",
        TransactionDate: !!originalData.spTransdate ? originalData.spTransdate : "N/A",
        EarnedUnits: !!originalData.spEarnunits ? originalData.spEarnunits.toFixed(2) : 0.00,
        RGUnits:!!originalData.spRgunits ? originalData.spRgunits.toFixed(2) : 0.00,
        GPAApply:!!originalData.spGpaApply ? originalData.spGpaApply.toFixed(2) : 0.00,
        GPAOverall:!!originalData.spGpaAll ? originalData.spGpaAll.toFixed(2) : 0.00,
        ThesisTitle : !!originalData.spThesisTitle ? originalData.spThesisTitle : "",
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

function StudentPostDataModelObjTransferToArray(Data){
    if(validate.isEmpty(Data)){
        Data = {};
    }
    let finalRes = [];
    for(let key in Data){
        let newKey = StudentPostDataModelKey(key);
        let newVal = Data[key];
        let obj = {[newKey] : newVal};
        finalRes.push(obj);
    }
    return finalRes;
}
function StudentPostDataModelPaperTitleObj(dataObj){
    let curobj = {
        spThesisTitle : !!dataObj.ThesisTitle ? dataObj.ThesisTitle : "",
    }
    return curobj;
}
function StudentPostDataModelPaperTitleSubmitDataObj(thesisTitleOriginalObj, studentInfoObj){
    let res = {};
    let paperTitleObjectFinal = StudentPostDataModelPaperTitleObj(thesisTitleOriginalObj);
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
    res = {
        studentInfo : studentObj,
        paperTitleObject : paperTitleObjectFinal
    }
    return res;
}
function StudentPostDataModelPaperTitleResponceDataObj(dataObj){
    let res = {};
    if(validate.isEmpty(dataObj)){
        dataObj = {
            flag:false,
            reason:[]
        };
    }
    res = {
        flag : !!dataObj.flag ? dataObj.flag: false,
        reason : !!dataObj.reasonList ? dataObj.reasonList: []
    }
    return res;
}
export const StudentPostDataModel = {
    StudentPostDataModelObjFinal :  StudentPostDataModelObjFinal,
    StudentPostDataModelObjTransferToArray : StudentPostDataModelObjTransferToArray,
    StudentPostDataModelPaperTitleSubmitDataObj : StudentPostDataModelPaperTitleSubmitDataObj,
    StudentPostDataModelPaperTitleResponceDataObj : StudentPostDataModelPaperTitleResponceDataObj,
}