import {StudentPostDataModel} from '../../../Model/studentInfo/StudentPostDataModel'
import {getStudentPostDataByStudentIDAndPostNumber} from '../../../Api/studentInfo'
import {SaveStudentPostData} from '../../../Redux/Slices/StudentInfo'
import CommonUseFetchByGet from '../CommonUseFetchByGet';
export default function useFetchStudentPostData(params, dependencies) {
    const props = {
        params,
        apiFun: getStudentPostDataByStudentIDAndPostNumber,
        dispatchSaveFun : SaveStudentPostData,
        dataModlSaveFun : StudentPostDataModel.StudentPostDataModelObjFinal,
        dependencies
    }
    const [dataLoading, error] = CommonUseFetchByGet(props);

    return [dataLoading, error];
}