import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {NonCourseRelatedEventDataModel} from '../../../Model/nonCourseRelatedEvent/NonCourseRelatedEventDataModel'
import {getNonCourseRelatedEventTableDataByIDAndPostNumber} from '../../../Api/nonCourseRelatedEvent'
import {SaveNonCourseRelatedEventTableData} from '../../../Redux/Slices/NonCourseRelatedEvent'
export default function useFetchNonCourseRelatedEventTableData(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getNonCourseRelatedEventTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveNonCourseRelatedEventTableData(NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelArray(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);

    return [dataLoading, error];
}
