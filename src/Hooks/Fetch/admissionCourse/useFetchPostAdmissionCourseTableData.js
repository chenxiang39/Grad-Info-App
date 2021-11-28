import {AdmissionCourseDataModel} from '../../../Model/admissionCourse/AdmissionCourseDataModel'
import { postAdmissionCourseTableDataByNewArr } from "../../../Api/admissionCourse";
import CommonUseFetchByPost from "../CommonUseFetchByPost";
export default function useFetchPostAdmissionCourseTableData() {
    const props = {
        apiFun: postAdmissionCourseTableDataByNewArr,
        dataModelSaveFun : AdmissionCourseDataModel.AdmissionCourseTableDataModelSubmitResponseDataObj,
    }
    const [data, dataLoading, error,fetchDataFun] = CommonUseFetchByPost(props);
    return [data, dataLoading, error, fetchDataFun];
}
