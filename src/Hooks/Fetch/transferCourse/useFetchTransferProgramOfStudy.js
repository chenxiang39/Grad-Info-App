import {TransferProgramOfStudyDataModel} from '../../../Model/transferCourse/TransferProgramOfStudyDataModel'
import {getTransferProgramOfStudyByIDAndPostNumber} from '../../../Api/transferCourse'
import {SaveTransferProgramOfStudyTableData} from '../../../Redux/Slices/TransferCourse'
import CommonUseFetchByGet from '../CommonUseFetchByGet'
export default function useFetchTransferProgramOfStudy(params, dependencies) {
    const props = {
        params,
        apiFun: getTransferProgramOfStudyByIDAndPostNumber,
        dispatchSaveFun : SaveTransferProgramOfStudyTableData,
        dataModelSaveFun : TransferProgramOfStudyDataModel.TransferProgramOfStudyDataModelArr,
        dependencies
    }
    const [dataLoading, error] = CommonUseFetchByGet(props);

    return [dataLoading, error];
}
