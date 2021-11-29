import {CommentDataModel} from '../../../Model/comment/CommentDataModel'
import {getCommentsTableDataByIDAndPostNumber} from '../../../Api/comment'
import {SaveCommentTableData} from '../../../Redux/Slices/Comment'
import CommonUseFetchByGet from '../CommonUseFetchByGet';
export default function useFetchCommentTableData(params,dependencies) {
    const props = {
        params,
        apiFun: getCommentsTableDataByIDAndPostNumber,
        dispatchSaveFun : SaveCommentTableData,
        dataModlSaveFun : CommentDataModel.CommentDataModelArray,
        dependencies : dependencies
    }
    const [dataLoading, error] = CommonUseFetchByGet(props);

    return [dataLoading, error];
}
