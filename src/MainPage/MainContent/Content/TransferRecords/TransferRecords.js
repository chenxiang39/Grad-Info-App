import React , {useEffect, useState}from 'react'
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import {StudentPostDataModel} from '../../../../Model/StudentPostDataModel';
import { TransferCourseDataModel } from '../../../../Model/TransferCourseDataModel';
import { TransferInfoDataModel } from '../../../../Model/TransferInfoDataModel';
import { BachelorDegreeInfoDataModel } from '../../../../Model/BachelorDegreeInfoDataModel';
import CourseDataTable from '../../../../Utility/DataTable/CourseDataTable';
import TranferInfoDataTable from '../../../../Utility/DataTable/TranferInfoDataTable';
import BachelorDegreeInfoTitleContent from '../../../../Utility/TitleContent/BachelorDegreeInfoTitleContent';
import { useSelector , useDispatch} from 'react-redux';
import {getStudentPostDataByStudentIDAndPostNumber} from '../../../../Api/studentInfo'
import {getTransferCourseTableDataByIDAndPostNumber, getTransferInfoByIDAndPostNumber, getBachelorDegreeInfoByID} from '../../../../Api/transferCourse'
import {StudentID, StudentPostData, StudentPostNumber, SaveStudentPostData} from '../../../../Redux/Slices/StudentInfo'
import {TransferCourseTableData, TransferInfoTableData, BachelorDegreeInfoData,SaveTransferCourseTableData, SaveTransferInfoTableData, SaveBachelorDegreeInfoData} from '../../../../Redux/Slices/TransferCourse'
export default function TransferRecords() {
    const dispatch = useDispatch();
    let curStudentPostData = useSelector(StudentPostData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curTransferCourseTableData = useSelector(TransferCourseTableData);
    let curTransferInfoTableData = useSelector(TransferInfoTableData);
    let curBachelorDegreeInfoData = useSelector(BachelorDegreeInfoData);
    useEffect( async () => {
        let APITransferCoursesTableData = await getTransferCourseTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveTransferCourseTableData(TransferCourseDataModel.TransferCourseTableDataModelArray(APITransferCoursesTableData))); 
        let APITransferInfoData = await getTransferInfoByIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveTransferInfoTableData(TransferInfoDataModel.TransferInfoTableDataModelArr(APITransferInfoData)));
        let APIBachelorDegreeInfoData = await getBachelorDegreeInfoByID(curStudentID);
        dispatch(SaveBachelorDegreeInfoData(BachelorDegreeInfoDataModel.BechelorDegreeInfoDataModelObj(APIBachelorDegreeInfoData)));
        let APIStudentPostData = await getStudentPostDataByStudentIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveStudentPostData(StudentPostDataModel.StudentPostDataModelObjFinal(APIStudentPostData)));  
    },[curStudentPostNumber]);
      const TransferCourseColumns = [
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
      const TransferInfoColums = [
        {
          title: '#',
          dataIndex: 'key',
          sorter: (a,b) => a.key - b.key
        },
        {
          title: 'CEEB',
          dataIndex: 'ceeb',
        },
        {
          title: 'INSTITUTION NAME',
          dataIndex: 'institutionName',
        },
        {
          title: 'DATES OF ATTENDANCE',
          dataIndex: 'attendanceDate'
        }
      ];
    const TransferInfoDataTableProp = {
       tableData : curTransferInfoTableData,
       columns: TransferInfoColums
    }
    const TransferCourseDataTableProp = {
        type: "TransferCourse",
        tableData : curTransferCourseTableData, 
        columns : TransferCourseColumns,
        ChooseDisableOrAble : TransferCourseDataModel.TransferCourseTableDataModelChooseDisableOrAble,
        CanBeChosedArray: TransferCourseDataModel.TransferCourseTableDataModelItemCanBeChosedArray,
        ChosedArray: TransferCourseDataModel.TransferCourseTableDataModelItemChosedArray,
        title: "Transfer Course List"
    }
    return (
        <div>
            <TopDataBar data = {curStudentPostData}></TopDataBar>
            <BachelorDegreeInfoTitleContent data = {curBachelorDegreeInfoData}></BachelorDegreeInfoTitleContent>
            <TranferInfoDataTable {...TransferInfoDataTableProp}></TranferInfoDataTable>
            <CourseDataTable {...TransferCourseDataTableProp}></CourseDataTable>
        </div>
    )
}
