import React,{useCallback,useState} from 'react'
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
    const [shouldRefresh, setshouldRefresh] = useState(false);
    const [transferCourseDataTableLoading,transferCourseDataTableLoadingError] = useFetchTransferCourseTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
    const [topDataBarLoading, topDataBarLoadingError] = useFetchStudentPostData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
    const [bachelorDegreeInfoLoading,bachelorDegreeInfoLoadingError] = useFetchBachelorDegreeInfo([curStudentID],[curStudentPostNumber,shouldRefresh]);
    const [transferProgramOfStudyDataTableLoading, transferProgramOfStudyDataTableLoadingError] = useFetchTransferProgramOfStudy([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
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
   
    const TransferCourseDataTableProp = {
        type: "TransferCourse",
        tableData : curTransferCourseTableData, 
        columns : TransferCourseDataTableColumns,
        ChooseDisableOrAble : TransferCourseDataModel.TransferCourseTableDataModelChooseDisableOrAble,
        CanBeChosedArray: TransferCourseDataModel.TransferCourseTableDataModelItemCanBeChosedArray,
        ChosedArray: TransferCourseDataModel.TransferCourseTableDataModelItemChosedArray,
        title: "Transfer Course List",
    }
    const renderCourseDataTable = useCallback(()=>{
      return (
        <CourseDataTable {...TransferCourseDataTableProp}></CourseDataTable>
      )
    },[shouldRefresh,curTransferCourseTableData])
    const TransferProgramOfStudyTableProp = {
      tableData : curTransferProgramOfStudyTableData,
      columns: transferProgramOfStudyColums,
   }
    const renderTransferProgramOfStudyDataTable = useCallback(()=>{
        return (
          <TransferProgramOfStudyDataTable {...TransferProgramOfStudyTableProp}></TransferProgramOfStudyDataTable>
        )
    },[shouldRefresh,curTransferProgramOfStudyTableData])
   
    const renderBachelorDegreeInfoTitleContent = useCallback(()=>{
      return (
        <BachelorDegreeInfoTitleContent data = {curBachelorDegreeInfoData}></BachelorDegreeInfoTitleContent>
      )
    },[shouldRefresh,curBachelorDegreeInfoData])
    const renderTopDataBar = useCallback(()=>{
      return (
        <TopDataBar data = {curStudentPostData}></TopDataBar>
      )
    },[shouldRefresh,curStudentPostData])
    return (
        <div>
            <Spin spinning = {topDataBarLoading}>
                {renderTopDataBar()}
            </Spin>
            <Spin spinning = {bachelorDegreeInfoLoading}>
                {renderBachelorDegreeInfoTitleContent()}
            </Spin>
            <Spin spinning = {transferProgramOfStudyDataTableLoading}>
                {renderTransferProgramOfStudyDataTable()}
            </Spin>
            <Spin spinning = {transferCourseDataTableLoading}>
                {renderCourseDataTable()}
            </Spin>
            
        </div>
    )
}
