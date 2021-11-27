import React,{useEffect, useState} from 'react'
import { Spin } from 'antd';
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import CourseDataTable from '../../../../Utility/DataTable/CourseDataTable';
import { AdmissionCourseDataModel } from '../../../../Model/AdmissionCourseDataModel';
import { useSelector , useDispatch} from 'react-redux';
import {StudentID, StudentPostData, StudentPostNumber, SaveStudentPostData} from '../../../../Redux/Slices/StudentInfo'
import {SaveAdmissionCourseTableData} from '../../../../Redux/Slices/AdmissionCourse'
import {StudentPostDataModel} from '../../../../Model/StudentPostDataModel'
import {getStudentPostDataByStudentIDAndPostNumber} from '../../../../Api/studentInfo'
import {getAdmissionCourseTableDataByIDAndPostNumber} from '../../../../Api/admissionCourse'
import {AdmissionCourseTableData} from '../../../../Redux/Slices/AdmissionCourse'
export default function AdmissionInfo() {
      const dispatch = useDispatch();
      let curStudentPostData = useSelector(StudentPostData);
      let curStudentPostNumber = useSelector(StudentPostNumber);
      let curStudentID = useSelector(StudentID);
      let curAdmissionCourseTableData = useSelector(AdmissionCourseTableData);
      const [tableDataLoading, settableDataLoading] = useState(true);
      const [topDataBarLoading, settopDataBarLoading] = useState(true);
      useEffect( async () => {
          settopDataBarLoading(true);
          settableDataLoading(true);
          
          getAdmissionCourseTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveAdmissionCourseTableData(AdmissionCourseDataModel.AdmissionCourseTableDataModelArray(res)));
            settableDataLoading(false); 
          }, (err) => {
            console.log(err);
          })
          getStudentPostDataByStudentIDAndPostNumber(curStudentID,curStudentPostNumber).then((res) => {
            dispatch(SaveStudentPostData(StudentPostDataModel.StudentPostDataModelObjFinal(res))); 
            settopDataBarLoading(false);
         }, (err) => {
           console.log(err);
         })
          // let APIStudentPostData = await getStudentPostDataByStudentIDAndPostNumber(curStudentID,curStudentPostNumber);
          // dispatch(SaveStudentPostData(StudentPostDataModel.StudentPostDataModelObjFinal(APIStudentPostData))); 
          // settopDataBarLoading(false);
          // let APIAdmissionCoursesTableData = await getAdmissionCourseTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber);
          // dispatch(SaveAdmissionCourseTableData(AdmissionCourseDataModel.AdmissionCourseTableDataModelArray(APIAdmissionCoursesTableData)));
          // settableDataLoading(false); 
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
        type: "AdmissionCourse",
        tableData : curAdmissionCourseTableData, 
        columns : columns,
        ChooseDisableOrAble : AdmissionCourseDataModel.AdmissionCourseTableDataModelChooseDisableOrAble,
        CanBeChosedArray: AdmissionCourseDataModel.AdmissionCourseTableDataModelItemCanBeChosedArray,
        ChosedArray: AdmissionCourseDataModel.AdmissionCourseTableDataModelItemChosedArray,
        tableDataLoading : tableDataLoading
    }
    return (
        <div>
             <Spin spinning = {topDataBarLoading}>
                <TopDataBar data = {curStudentPostData} />
            </Spin>
            <CourseDataTable {...DataTableProp}></CourseDataTable>
        </div>
    )
}
