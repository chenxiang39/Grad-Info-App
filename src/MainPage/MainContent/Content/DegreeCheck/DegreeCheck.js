import React, {useEffect, useState, useCallback} from 'react'
import 'antd/dist/antd.less';
import { Spin } from 'antd';
import DegreeCheckForm from '../../../../Utility/DegreeCheckForm/DegreeCheckForm';
import { useSelector } from 'react-redux';
import {StudentPostData , StudentPostNumber, StudentID} from '../../../../Redux/Slices/StudentInfo'
import useFetchStudentPostData from '../../../../Hooks/Fetch/studentInfo/useFetchStudentPostData'
export default function DegreeCheck() {
    let curStudentPostData = useSelector(StudentPostData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    const [shouldRefresh, setshouldRefresh] = useState(false);
    const [studentPostDataLoading, studentPostDataLoadingError] = useFetchStudentPostData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
    const DegreeCheckFormProp = {
        title : "PROGRAM - Electrical Engineering",
        curStudentPostData,
        curStudentPostNumber,
        curStudentID
    }
    const renderDegreeCheckFormList = useCallback(()=>{
        return (
            <DegreeCheckForm {...DegreeCheckFormProp} ></DegreeCheckForm>
        )
      },[shouldRefresh,curStudentPostData])
    return (
        <Spin spinning = {studentPostDataLoading}>
            {renderDegreeCheckFormList()}
        </Spin>
    )
}
