import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {CommitteeDataModel} from '../../../Model/nonCourseRelatedEvent/CommitteeDataModel'
import {getExamCommitteeTableDataByIDAndPostNumber} from '../../../Api/nonCourseRelatedEvent'
import {SaveExamCommitteeTableData} from '../../../Redux/Slices/NonCourseRelatedEvent'
export default function useFetchExamCommitteeTableData(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getExamCommitteeTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveExamCommitteeTableData(CommitteeDataModel.ExamCommitteeDataModelArr(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);

    return [dataLoading, error];
}
