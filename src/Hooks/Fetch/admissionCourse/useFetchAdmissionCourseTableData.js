import {AdmissionCourseDataModel} from '../../../Model/admissionCourse/AdmissionCourseDataModel'
import {getAdmissionCourseTableDataByIDAndPostNumber} from '../../../Api/admissionCourse'
import {SaveAdmissionCourseTableData} from '../../../Redux/Slices/AdmissionCourse'
import CommonUseFetchByGet from '../CommonUseFetchByGet';
export default function useFetchAdmissionCourseTableData(params,dependencies) {
    const props = {
        params,
        apiFun: getAdmissionCourseTableDataByIDAndPostNumber,
        dispatchSaveFun : SaveAdmissionCourseTableData,
        dataModelSaveFun : AdmissionCourseDataModel.AdmissionCourseTableDataModelArray,
        dependencies
    }
    const [dataLoading, error] = CommonUseFetchByGet(props);

    return [dataLoading, error];
}
