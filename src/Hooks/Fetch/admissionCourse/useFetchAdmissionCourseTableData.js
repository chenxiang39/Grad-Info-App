import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {AdmissionCourseDataModel} from '../../../Model/admissionCourse/AdmissionCourseDataModel'
import {getAdmissionCourseTableDataByIDAndPostNumber} from '../../../Api/admissionCourse'
import {SaveAdmissionCourseTableData} from '../../../Redux/Slices/AdmissionCourse'
export default function useFetchAdmissionCourseTableData(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getAdmissionCourseTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveAdmissionCourseTableData(AdmissionCourseDataModel.AdmissionCourseTableDataModelArray(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);

    return [dataLoading, error];
}
