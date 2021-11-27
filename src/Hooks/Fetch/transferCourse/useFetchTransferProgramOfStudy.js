import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {TransferProgramOfStudyDataModel} from '../../../Model/transferCourse/TransferProgramOfStudyDataModel'
import {getTransferProgramOfStudyByIDAndPostNumber} from '../../../Api/transferCourse'
import {SaveTransferProgramOfStudyTableData} from '../../../Redux/Slices/TransferCourse'
export default function useFetchTransferProgramOfStudy(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getTransferProgramOfStudyByIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveTransferProgramOfStudyTableData(TransferProgramOfStudyDataModel.TransferProgramOfStudyDataModelArr(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);

    return [dataLoading, error];
}
