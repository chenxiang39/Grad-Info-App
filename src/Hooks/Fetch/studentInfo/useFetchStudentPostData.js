import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {StudentPostDataModel} from '../../../Model/studentInfo/StudentPostDataModel'
import {getStudentPostDataByStudentIDAndPostNumber} from '../../../Api/studentInfo'
import {SaveStudentPostData} from '../../../Redux/Slices/StudentInfo'
export default function useFetchStudentPostData(curStudentID, curStudentPostNumber) {
    const dispatch = useDispatch();
    // const [data, setData] = useState(StudentPostDataModel.StudentPostDataModelObjFinal({}));
    const [dataLoading, setdataLoading] = useState(false);
    const [error, seterror] = useState("");
    useEffect(()=>{
        setdataLoading(true);
        getStudentPostDataByStudentIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveStudentPostData(StudentPostDataModel.StudentPostDataModelObjFinal(res)));
            // setData(SaveStudentPostData(StudentPostDataModel.StudentPostDataModelObjFinal(res)));
            setdataLoading(false);
        }, 
        (err) => {
            seterror(err);
        })
    },[curStudentPostNumber]);
    // return [data,dataLoading,error];
    return [dataLoading, error];
}
