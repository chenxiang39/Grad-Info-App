import {CommitteeDataModel} from '../../../Model/nonCourseRelatedEvent/CommitteeDataModel'
import {getExamCommitteeTableDataByIDAndPostNumber} from '../../../Api/nonCourseRelatedEvent'
import {SaveExamCommitteeTableData} from '../../../Redux/Slices/NonCourseRelatedEvent'
import CommonUseFetchByGet from '../CommonUseFetchByGet'
export default function useFetchExamCommitteeTableData(params,dependencies) {
    const props = {
        params,
        apiFun: getExamCommitteeTableDataByIDAndPostNumber,
        dispatchSaveFun : SaveExamCommitteeTableData,
        dataModlSaveFun : CommitteeDataModel.examCommitteeDataModelArr,
        dependencies
    }
    const [dataLoading,error] = CommonUseFetchByGet(props);

    return [dataLoading,error];
}
