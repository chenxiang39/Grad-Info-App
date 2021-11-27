import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {CommitteeDataModel} from '../../../Model/nonCourseRelatedEvent/CommitteeDataModel'
import {getThesisCommitteeTableDataByIDAndPostNumber} from '../../../Api/nonCourseRelatedEvent'
import {SaveThesisCommitteeTableData} from '../../../Redux/Slices/NonCourseRelatedEvent'
export default function useFetchThesisCommitteeTableData(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getThesisCommitteeTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveThesisCommitteeTableData(CommitteeDataModel.thesisCommitteeDataModelArr(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);

    return [dataLoading, error];
}
