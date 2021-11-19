import React , {useEffect, useState}from 'react'
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import {StudentPostDataModel} from '../../../../Model/StudentPostDataModel';
import { TransferDataModel } from '../../../../Model/TransferDataModel';
import CourseDataTable from '../../../../Utility/DataTable/CourseDataTable';
import TitleContent from '../../../../Utility/TitleContent/TitleContent';
import { TransferCourseDataModel } from '../../../../Model/TransferCourseDataModel';
import { useSelector , useDispatch} from 'react-redux';
import {SaveTransferCourseTableData} from '../../../../Redux/Slices/TransferCourse'
import {getTransferCourseTableDataByIDAndPostNumber, getStudentPostDataByStudentIDAndPostNumber} from '../../../../Api/studentInfo'
import {StudentID, StudentPostData, StudentPostNumber, SaveStudentPostData} from '../../../../Redux/Slices/StudentInfo'
import {TransferCourseTableData} from '../../../../Redux/Slices/TransferCourse'
export default function TransferRecords() {
    const dispatch = useDispatch();
    let curStudentPostData = useSelector(StudentPostData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curTransferCourseTableData = useSelector(TransferCourseTableData);
    useEffect( async () => {
        let APITransferCoursesTableData = await getTransferCourseTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveTransferCourseTableData(TransferCourseDataModel.TransferCourseTableDataModelArray(APITransferCoursesTableData))); 
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
      ];   
    let TransferTitle = "Transfer Program of Study"
    let TransferData = {
        institution_ceeb:"2074",
        institution_name: "Carnegie-Mellon",
        institution_date_earned : "FA06"
    }

    let legalTransferData =　TransferDataModel.TransferDataModelLegalArr(TransferData);

    const DataTableProp = {
        tableData : curTransferCourseTableData, 
        columns : columns,
        ChooseDisableOrAble : TransferCourseDataModel.TransferCourseTableDataModelChooseDisableOrAble,
        CanBeChosedArray: TransferCourseDataModel.TransferCourseTableDataModelItemCanBeChosedArray,
        ChosedArray: TransferCourseDataModel.TransferCourseTableDataModelItemChosedArray,
    }
    return (
        <div>
            <TopDataBar data = {curStudentPostData}></TopDataBar>
            <TitleContent title = {TransferTitle} data = {legalTransferData}></TitleContent>
            <CourseDataTable {...DataTableProp}></CourseDataTable>
        </div>
    )
}
