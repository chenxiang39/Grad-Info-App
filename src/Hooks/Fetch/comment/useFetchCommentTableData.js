import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {CommentDataModel} from '../../../Model/comment/CommentDataModel'
import {getCommentsTableDataByIDAndPostNumber} from '../../../Api/comment'
import {SaveCommentTableData} from '../../../Redux/Slices/Comment'
export default function useFetchCommentTableData(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getCommentsTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveCommentTableData(CommentDataModel.CommentDataModelArray(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);

    return [dataLoading, error];
}
