import React,{useEffect, useState} from 'react'
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import CourseDataTable from '../../../../Utility/DataTable/CourseDataTable';
import { AdmissionCourseDataModel } from '../../../../Model/AdmissionCourseDataModel';
import { useSelector , useDispatch} from 'react-redux';
import {StudentID, StudentPostData, StudentPostNumber, SaveStudentPostData} from '../../../../Redux/Slices/StudentInfo'
import {SaveAdmissionCourseTableData} from '../../../../Redux/Slices/AdmissionCourse'
import {StudentPostDataModel} from '../../../../Model/StudentPostDataModel'
import {getAdmissionCourseTableDataByIDAndPostNumber, getStudentPostDataByStudentIDAndPostNumber} from '../../../../Api/studentInfo'
import {AdmissionCourseTableData} from '../../../../Redux/Slices/AdmissionCourse'
export default function AdmissionInfo() {
      const dispatch = useDispatch();
      let curStudentPostData = useSelector(StudentPostData);
      let curStudentPostNumber = useSelector(StudentPostNumber);
      let curStudentID = useSelector(StudentID);
      let curAdmissionCourseTableData = useSelector(AdmissionCourseTableData);
      useEffect( async () => {
          let APIAdmissionCoursesTableData = await getAdmissionCourseTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber);
          dispatch(SaveAdmissionCourseTableData(AdmissionCourseDataModel.AdmissionCoursesTableDataModelArray(APIAdmissionCoursesTableData))); 
          const studentPostData = await getStudentPostDataByStudentIDAndPostNumber(curStudentID,curStudentPostNumber);
          const legalstudentPostData = StudentPostDataModel.StudentPostDataModelObjFinal(studentPostData);
          dispatch(SaveStudentPostData(legalstudentPostData));  
      },[curStudentPostNumber]);
      const columns = [
        {
          title: '#',
          dataIndex: 'key',
          sorter: (a,b) => a.key - b.key
        },
        {
          title: 'COURSE',
          dataIndex: 'course',
        },
        {
          title: 'TERM',
          dataIndex: 'term',
        },
        {
          title: 'GRADE',
          dataIndex: 'grade',
        },
        {
            title: 'UNITS',
            dataIndex: 'units',
        },
        {
            title: 'GPTS',
            dataIndex: 'gpts',
        },
        {
            title: 'APPLY CODE',
            dataIndex: 'applyCode',
        },
        {
            title: 'OPER',
            dataIndex: 'oper',
        },
        {
            title: 'TRANSACTION DATE',
            dataIndex: 'transactiondate',
        },
        {
            title: 'HISTORY',
            dataIndex: 'history',
        },
      ];   ;
    const DataTableProp = {
        tableData : curAdmissionCourseTableData, 
        columns : columns,
        ChooseDisableOrAble : AdmissionCourseDataModel.AdmissionCoursesTableDataModelChooseDisableOrAble,
        CanBeChosedArray: AdmissionCourseDataModel.AdmissionCoursesTableDataModelItemCanBeChosedArray,
        ChosedArray: AdmissionCourseDataModel.AdmissionCoursesTableDataModelItemChosedArray,
    }
    return (
        <div>
            <TopDataBar data = {curStudentPostData}></TopDataBar>
            <CourseDataTable {...DataTableProp}></CourseDataTable>
        </div>
    )
}
