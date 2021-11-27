import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {TransferCourseDataModel} from '../../../Model/transferCourse/TransferCourseDataModel'
import {getTransferCourseTableDataByIDAndPostNumber} from '../../../Api/transferCourse'
import {SaveTransferCourseTableData} from '../../../Redux/Slices/TransferCourse'
export default function useFetchTransferCourseTableData(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getTransferCourseTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveTransferCourseTableData(TransferCourseDataModel.TransferCourseTableDataModelArray(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);

    return [dataLoading, error];
}
