import React, {useState, useCallback} from 'react'
import 'antd/dist/antd.less';
import { Spin } from 'antd';
import DegreeCheckForm from '../../../../Utility/DegreeCheckForm/DegreeCheckForm';
import { useSelector } from 'react-redux';
import {StudentPostData , StudentPostNumber, StudentID} from '../../../../Redux/Slices/StudentInfo'
import {DegreeCheckTableData} from '../../../../Redux/Slices/DegreeCheck'
import useFetchStudentPostData from '../../../../Hooks/Fetch/studentInfo/useFetchStudentPostData'
import useFetchDegreeCheckTableData from '../../../../Hooks/Fetch/degreeCheck/useFetchDegreeCheckTableData'
export default function DegreeCheck() {
    let curStudentPostData = useSelector(StudentPostData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curDegreeCheckDataTable = useSelector(DegreeCheckTableData);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [studentPostDataLoading, studentPostDataLoadingError] = useFetchStudentPostData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
    const [degreeCheckDataTableLoading, degreeCheckDataTableLoadingError] = useFetchDegreeCheckTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
    const renderDegreeCheckFormList = useCallback(()=>{
        return curDegreeCheckDataTable.map((item, index)=>{
            let DegreeCheckFormProp = {
                title : `PROGRAM - ${item.program}`,
                curStudentPostData,
                curStudentPostNumber,
                curStudentID,
                degreeCheckFormData : item,
                mainPageShouldRefresh : setShouldRefresh
            }
            return (
                <DegreeCheckForm key = {item + index} {...DegreeCheckFormProp} ></DegreeCheckForm>
            )
        })
      },[shouldRefresh,curStudentPostData,curDegreeCheckDataTable])
    return (
        <Spin spinning = {studentPostDataLoading && degreeCheckDataTableLoading}>
            {renderDegreeCheckFormList()}
        </Spin>
    )
}
