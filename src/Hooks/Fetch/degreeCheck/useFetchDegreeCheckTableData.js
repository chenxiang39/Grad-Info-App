import {DegreeCheckDataModel} from '../../../Model/degreeCheck/DegreeCheckDataModel'
import {getDegreeCheckTableDataByStudentIDAndPostNumber} from '../../../Api/degreeCheck'
import {SaveDegreeCheckTableData} from '../../../Redux/Slices/DegreeCheck'
import CommonUseFetchByGet from '../CommonUseFetchByGet';
export default function useFetchDegreeCheckTableData(params,dependencies) {
    const props = {
        params,
        apiFun: getDegreeCheckTableDataByStudentIDAndPostNumber,
        dispatchSaveFun : SaveDegreeCheckTableData,
        dataModelSaveFun : DegreeCheckDataModel.DegreeCheckTableDataModelArray,
        dependencies : dependencies
    }
    const [dataLoading, error] = CommonUseFetchByGet(props);

    return [dataLoading, error];
}