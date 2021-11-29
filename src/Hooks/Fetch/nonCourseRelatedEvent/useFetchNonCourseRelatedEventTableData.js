import {NonCourseRelatedEventDataModel} from '../../../Model/nonCourseRelatedEvent/NonCourseRelatedEventDataModel'
import {getNonCourseRelatedEventTableDataByIDAndPostNumber} from '../../../Api/nonCourseRelatedEvent'
import {SaveNonCourseRelatedEventTableData} from '../../../Redux/Slices/NonCourseRelatedEvent'
import CommonUseFetchByGet from '../CommonUseFetchByGet'
export default function useFetchNonCourseRelatedEventTableData(params, dependencies) {
    const props = {
        params,
        apiFun: getNonCourseRelatedEventTableDataByIDAndPostNumber,
        dispatchSaveFun : SaveNonCourseRelatedEventTableData,
        dataModlSaveFun : NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelArray,
        dependencies
    }
    const [dataLoading,error] = CommonUseFetchByGet(props);

    return [dataLoading,error];
}
