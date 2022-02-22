import  validate  from "validate.js";
import moment from "moment";


function DegreeCheckDataModelObj(dataObj){
    let curObj = {
        degreeName : dataObj.program,
        degreeAdmissionTerm :　dataObj.admissionTerm,
        degreeGraduationTerm  : dataObj.anticipatedTerm,
        degreeCatalogYear : dataObj.catalogYear,
        degreeForeignLanguage : DegreeCheckTableDataModelForeignLanguageToSubmit(dataObj.foreignLanguage)
    }
    return curObj;
}
function DegreeCheckTableDataModelForeignLanguage(originalLanguage){
    if(originalLanguage === "Y"){
        return "YES";
    }
    if(originalLanguage === "N"){
        return "NO";
    }
    if(originalLanguage === "#"){
        return "N/A"
    }
}
function DegreeCheckTableDataModelForeignLanguageToSubmit(originalLanguage){
    if(originalLanguage === "YES"){
        return "Y";
    }
    if(originalLanguage === "NO"){
        return "N";
    }
    if(originalLanguage === "N/A"){
        return "#"
    }
}
function DegreeCheckTableDataModelArray(dataArr){
    let arr = [];
    if(validate.isEmpty(dataArr)){
        dataArr = [];
    }   
    for(let i = 0; i < dataArr.length; i++){
        let curobj = {
            program : !!dataArr[i].degreeName ? dataArr[i].degreeName : "",
            admissionTerm : !!dataArr[i].degreeAdmissionTerm ? dataArr[i].degreeAdmissionTerm : "",
            anticipatedTerm : !!dataArr[i].degreeGraduationTerm ? dataArr[i].degreeGraduationTerm : "",
            catalogYear: !!dataArr[i].degreeCatalogYear ? dataArr[i].degreeCatalogYear : "",
            foreignLanguage : !!dataArr[i].degreeForeignLanguage ? DegreeCheckTableDataModelForeignLanguage(dataArr[i].degreeForeignLanguage) : "",
            completed : !!dataArr[i].degreeCheckCompleted ? dataArr[i].degreeCheckCompleted : false
        }
        arr.push(curobj);
    }
    return arr;
}

function DegreeCheckTableDataModelSubmitObj(degreeCheckObj, studentInfoObj){
    let res = {};
    let degreeCheckDataModelObjFinal = DegreeCheckDataModelObj(degreeCheckObj);
    if(validate.isEmpty(studentInfoObj)){
        studentInfoObj = {};
    }
    let studentObj = {
        studentId : !! studentInfoObj.id ? studentInfoObj.id : "",
        spPostNumber : !! studentInfoObj.studentPostNumber ? studentInfoObj.studentPostNumber : ""
    };
    res = {
        studentInfo : studentObj,
        degreeCheckObject : degreeCheckDataModelObjFinal
    }
    return res;
}
function DegreeCheckDataModelResponseObj(dataObj){
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
export const DegreeCheckDataModel = {
    DegreeCheckTableDataModelArray : DegreeCheckTableDataModelArray,
    DegreeCheckTableDataModelSubmitObj : DegreeCheckTableDataModelSubmitObj,
    DegreeCheckDataModelResponseObj : DegreeCheckDataModelResponseObj
}