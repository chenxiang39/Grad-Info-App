import {CommitteeDataModel} from '../../../Model/nonCourseRelatedEvent/CommitteeDataModel'
import {getThesisCommitteeTableDataByIDAndPostNumber} from '../../../Api/nonCourseRelatedEvent'
import {SaveThesisCommitteeTableData} from '../../../Redux/Slices/NonCourseRelatedEvent'
import CommonUseFetchByGet from '../CommonUseFetchByGet'
export default function useFetchThesisCommitteeTableData(params, dependencies) {
    const props = {
        params,
        apiFun: getThesisCommitteeTableDataByIDAndPostNumber,
        dispatchSaveFun : SaveThesisCommitteeTableData,
        dataModlSaveFun : CommitteeDataModel.thesisCommitteeDataModelArr,
        dependencies
    }
    const [dataLoading,error] = CommonUseFetchByGet(props);

    return [dataLoading,error];
}
