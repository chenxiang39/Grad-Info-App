import React, { useCallback, useState } from 'react'
import { Spin } from 'antd';
import {useSelector} from 'react-redux';
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import {codeDescription} from '../../../../Constant/codeDescription'
import {StudentID, StudentPostData, StudentPostNumber} from '../../../../Redux/Slices/StudentInfo'
import {NonCourseRelatedEventTableData, ExamCommitteeTableData,ThesisCommitteeTableData} from '../../../../Redux/Slices/NonCourseRelatedEvent'
import EventDataTable from '../../../../Utility/DataTable/EventDataTable';
import ExamCommitteeDataTable from '../../../../Utility/DataTable/ExamCommitteeDataTable'
import ThesisCommitteeDataTable from '../../../../Utility/DataTable/ThesisCommitteeDataTable'
import useFetchNonCourseRelatedEventTableData from '../../../../Hooks/Fetch/nonCourseRelatedEvent/useFetchNonCourseRelatedEventTableData';
import useFetchThesisCommitteeTableData from '../../../../Hooks/Fetch/nonCourseRelatedEvent/useFetchThesisCommitteeTableData';
import useFetchExamCommitteeTableData from '../../../../Hooks/Fetch/nonCourseRelatedEvent/useFetchExamCommitteeTableData'
import useFetchStudentPostData from '../../../../Hooks/Fetch/studentInfo/useFetchStudentPostData';
export default function NonCourseRelatedEvent() {
    let curStudentPostData = useSelector(StudentPostData);
    let curNonCourseRelatedEventTableData = useSelector(NonCourseRelatedEventTableData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curExamCommitteeTableData = useSelector(ExamCommitteeTableData);
    let curThesisCommitteeTableData = useSelector(ThesisCommitteeTableData);
    const [shouldRefresh, setshouldRefresh] = useState(false);
    const [topDataBarLoading, topDataBarLoadingError] = useFetchStudentPostData([curStudentID, curStudentPostNumber],[curStudentPostNumber]);
    const [nonCourseRelatedEventTableLoading, nonCourseRelatedEventTableLoadingError] = useFetchNonCourseRelatedEventTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber]);
    const [thesisCommitteeTableDataLoading, thesisCommitteeTableDataLoadingError] = useFetchThesisCommitteeTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber]);
    const [examCommitteeTableDataLoading, examCommitteeTableDataLoadingError] = useFetchExamCommitteeTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber]);
    const examColumns = [
        {
            title: '#',
            dataIndex: 'key',
            sorter: (a,b) => a.key - b.key
        },
        {
            title: 'NAME',
            dataIndex: 'committeeName',
        },
        {
            title: 'TITLE',
            dataIndex: 'committeeChar',
        },
    ]  

    const thesisColumns = [
        {
            title: '#',
            dataIndex: 'key',
            sorter: (a,b) => a.key - b.key
        },
        {
            title: 'NAME',
            dataIndex: 'committeeName',
        },
        {
            title: 'TITLE',
            dataIndex: 'committeeChar',
        },
        {
            title: 'PAPER TITLE',
            dataIndex: 'paperTitle',
        },
    ]  
    const eventColumns = [
        {
          title: '#',
          dataIndex: 'key',
          sorter: (a,b) => a.key - b.key
        },
        {
          title: 'CODE',
          dataIndex: 'code',
        },
        {
          title: 'DESCRIPTION',
          dataIndex: 'description',
        },
        {
            title: 'RELATED',
            dataIndex: 'related',
        },
        {
            title: 'DATE',
            dataIndex: 'date',
        },
        {
            title: 'TRANSACTION DATE',
            dataIndex: 'transactiondate',
        },
        {
            title: 'OPER',
            dataIndex: 'oper',
        },
    ];   
    const EventDataTableProp = {
        tableData : curNonCourseRelatedEventTableData, 
        columns : eventColumns,
        codeDescriptionArr : codeDescription,
    }
    const renderTopDataBar = useCallback(()=>{
        return (
          <TopDataBar data = {curStudentPostData}></TopDataBar>
        )
    },[shouldRefresh,curStudentPostData])
    const renderEventDataTable = useCallback(()=>{
        return (
            <EventDataTable {...EventDataTableProp}></EventDataTable>
        )
    },[shouldRefresh,curNonCourseRelatedEventTableData])
    
    const examCommitteeDataTableProp = {
        tableData : curExamCommitteeTableData, 
        columns : examColumns,
    }
    const renderExamCommitteeDataTable = useCallback(()=>{
        return (
            <ExamCommitteeDataTable {...examCommitteeDataTableProp}></ExamCommitteeDataTable>
        )
    },[shouldRefresh,curExamCommitteeTableData])
    const thesisCommitteeDataTableProp = {
        tableData : curThesisCommitteeTableData, 
        columns : thesisColumns,
    }
    const renderThesisCommitteeDataTable = useCallback(()=>{
        return (
            <ThesisCommitteeDataTable {...thesisCommitteeDataTableProp}></ThesisCommitteeDataTable>
        )
    },[shouldRefresh,curThesisCommitteeTableData])
    return (
        <div>
            <Spin spinning = {topDataBarLoading}>
                {renderTopDataBar()}
            </Spin>
            <Spin spinning = {nonCourseRelatedEventTableLoading}>
                {renderEventDataTable()}
            </Spin>
            <Spin spinning = {examCommitteeTableDataLoading}>
                {renderExamCommitteeDataTable()}
            </Spin>
            <Spin spinning = {thesisCommitteeTableDataLoading}>
                {renderThesisCommitteeDataTable()}
            </Spin>
        </div>
    )
}
