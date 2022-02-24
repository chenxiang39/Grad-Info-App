import {StarsExceptionDataModel} from '../../../Model/starsException/StarsExceptionDataModel'
import {getStarsExceptionByStudentIDAndPostNumber} from '../../../Api/starsException'
import {SaveStarsExceptionTableData} from '../../../Redux/Slices/StarsException'
import CommonUseFetchByGet from '../CommonUseFetchByGet';
export default function useFetchCommentTableData(params,dependencies) {
    const props = {
        params,
        apiFun: getStarsExceptionByStudentIDAndPostNumber,
        dispatchSaveFun : SaveStarsExceptionTableData,
        dataModelSaveFun : StarsExceptionDataModel.StarsExceptionDataModelArray,
        dependencies : dependencies
    }
    const [dataLoading, error] = CommonUseFetchByGet(props);

    return [dataLoading, error];
}
