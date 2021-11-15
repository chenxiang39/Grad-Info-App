function StudentInfoDataModelObj(dataObj){
    let res = {
        id: !!dataObj.student_id ? dataObj.student_id : "",
        name: !! dataObj.student_name ? dataObj.student_name : "",
        post_numbers: !! dataObj.sp_post_numbers ? dataObj.sp_post_numbers : []
    }
    return res;
}
export const StudentInfoDataModel = {
    StudentInfoDataModelObj : StudentInfoDataModelObj,
}