function StudentInfoDataModelObj(dataObj){
    let res = {
        id: !!dataObj.studentId ? dataObj.studentId : "",
        name: !! dataObj.studentName ? dataObj.studentName : "",
        post_numbers: !! dataObj.spPostNumbers ? dataObj.spPostNumbers : []
    }
    return res;
}
export const StudentInfoDataModel = {
    StudentInfoDataModelObj : StudentInfoDataModelObj,
}