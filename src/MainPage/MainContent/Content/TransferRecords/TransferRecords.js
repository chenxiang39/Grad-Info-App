import React from 'react'
import 'antd/dist/antd.less';
import { Spin } from 'antd';
import { useSelector} from 'react-redux';
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import { TransferCourseDataModel } from '../../../../Model/transferCourse/TransferCourseDataModel';
import CourseDataTable from '../../../../Utility/DataTable/CourseDataTable';
import TransferProgramOfStudyDataTable from '../../../../Utility/DataTable/TransferProgramOfStudyDataTable';
import BachelorDegreeInfoTitleContent from '../../../../Utility/TitleContent/BachelorDegreeInfoTitleContent';
import {StudentID, StudentPostData, StudentPostNumber} from '../../../../Redux/Slices/StudentInfo'
import {TransferCourseTableData,TransferProgramOfStudyTableData, BachelorDegreeInfoData} from '../../../../Redux/Slices/TransferCourse'
import useFetchTransferCourseTableData from '../../../../Hooks/Fetch/transferCourse/useFetchTransferCourseTableData';
import useFetchTransferProgramOfStudy from '../../../../Hooks/Fetch/transferCourse/useFetchTransferProgramOfStudy';
import useFetchBachelorDegreeInfo from '../../../../Hooks/Fetch/transferCourse/useFetchBachelorDegreeInfo';
import useFetchStudentPostData from '../../../../Hooks/Fetch/studentInfo/useFetchStudentPostData';
export default function TransferRecords() {
    let curStudentPostData = useSelector(StudentPostData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curTransferCourseTableData = useSelector(TransferCourseTableData);
    let curTransferProgramOfStudyTableData = useSelector(TransferProgramOfStudyTableData);
    let curBachelorDegreeInfoData = useSelector(BachelorDegreeInfoData);
    const [transferCourseDataTableLoading,transferCourseDataTableLoadingError] = useFetchTransferCourseTableData(curStudentID,curStudentPostNumber);
    const [topDataBarLoading, topDataBarLoadingError] = useFetchStudentPostData(curStudentID, curStudentPostNumber);
    const [bachelorDegreeInfoLoading,bachelorDegreeInfoLoadingError] = useFetchBachelorDegreeInfo(curStudentID, curStudentPostNumber);
    const [transferProgramOfStudyDataTableLoading, transferProgramOfStudyDataTableLoadingError] = useFetchTransferProgramOfStudy(curStudentID, curStudentPostNumber);
    const TransferCourseDataTableColumns = [
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
    const transferProgramOfStudyColums = [
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
    const TransferProgramOfStudyTableProp = {
       tableData : curTransferProgramOfStudyTableData,
       columns: transferProgramOfStudyColums,
       tableDataLoading : transferProgramOfStudyDataTableLoading
    }
    const TransferCourseDataTableProp = {
        type: "TransferCourse",
        tableData : curTransferCourseTableData, 
        columns : TransferCourseDataTableColumns,
        ChooseDisableOrAble : TransferCourseDataModel.TransferCourseTableDataModelChooseDisableOrAble,
        CanBeChosedArray: TransferCourseDataModel.TransferCourseTableDataModelItemCanBeChosedArray,
        ChosedArray: TransferCourseDataModel.TransferCourseTableDataModelItemChosedArray,
        title: "Transfer Course List",
        tableDataLoading : transferCourseDataTableLoading
    }
    return (
        <div>
            <Spin spinning = {topDataBarLoading}>
                <TopDataBar data = {curStudentPostData} />
            </Spin>
            <Spin spinning = {bachelorDegreeInfoLoading}>
                <BachelorDegreeInfoTitleContent data = {curBachelorDegreeInfoData}></BachelorDegreeInfoTitleContent>
            </Spin>
            <TransferProgramOfStudyDataTable {...TransferProgramOfStudyTableProp}></TransferProgramOfStudyDataTable>
            <CourseDataTable {...TransferCourseDataTableProp}></CourseDataTable>
        </div>
    )
}
