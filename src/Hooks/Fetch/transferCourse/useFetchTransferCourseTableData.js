import {TransferCourseDataModel} from '../../../Model/transferCourse/TransferCourseDataModel'
import {getTransferCourseTableDataByIDAndPostNumber} from '../../../Api/transferCourse'
import {SaveTransferCourseTableData} from '../../../Redux/Slices/TransferCourse'
import CommonUseFetchByGet from '../CommonUseFetchByGet'
export default function useFetchTransferCourseTableData(params, dependencies) {
    const props = {
        params,
        apiFun: getTransferCourseTableDataByIDAndPostNumber,
        dispatchSaveFun : SaveTransferCourseTableData,
        dataModlSaveFun : TransferCourseDataModel.TransferCourseTableDataModelArray,
        dependencies
    }
    const [dataLoading,error] = CommonUseFetchByGet(props);

    return [dataLoading,error];
}
