import {BachelorDegreeInfoDataModel} from '../../../Model/transferCourse/BachelorDegreeInfoDataModel'
import {getBachelorDegreeInfoByID} from '../../../Api/transferCourse'
import {SaveBachelorDegreeInfoData} from '../../../Redux/Slices/TransferCourse'
import CommonUseFetchByGet from '../CommonUseFetchByGet';
export default function useFetchBachelorDegreeInfo(params, dependencies) {
    const props = {
        params,
        apiFun: getBachelorDegreeInfoByID,
        dispatchSaveFun : SaveBachelorDegreeInfoData,
        dataModlSaveFun : BachelorDegreeInfoDataModel.BechelorDegreeInfoDataModelObj,
        dependencies
    }
    const [dataLoading,error] = CommonUseFetchByGet(props);

    return [dataLoading,error];
}
