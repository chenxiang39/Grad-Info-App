import React from 'react'
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
    const [topDataBarLoading, topDataBarLoadingError] = useFetchStudentPostData(curStudentID, curStudentPostNumber);
    const [nonCourseRelatedEventTableLoading, nonCourseRelatedEventTableLoadingError] = useFetchNonCourseRelatedEventTableData(curStudentID, curStudentPostNumber);
    const [thesisCommitteeTableDataLoading, thesisCommitteeTableDataLoadingError] = useFetchThesisCommitteeTableData(curStudentID, curStudentPostNumber);
    const [examCommitteeTableDataLoading, examCommitteeTableDataLoadingError] = useFetchExamCommitteeTableData(curStudentID, curStudentPostNumber);
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
        tableDataLoading : nonCourseRelatedEventTableLoading
    }
    const examCommitteeDataTableProp = {
        tableData : curExamCommitteeTableData, 
        columns : examColumns,
        tableDataLoading : examCommitteeTableDataLoading
    }
    const thesisCommitteeDataTableProp = {
        tableData : curThesisCommitteeTableData, 
        columns : thesisColumns,
        tableDataLoading: thesisCommitteeTableDataLoading
    }
    return (
        <div>
            <Spin spinning = {topDataBarLoading}>
                <TopDataBar data = {curStudentPostData} />
            </Spin>
            <EventDataTable {...EventDataTableProp}></EventDataTable>
            <ExamCommitteeDataTable {...examCommitteeDataTableProp}></ExamCommitteeDataTable>
            <ThesisCommitteeDataTable {...thesisCommitteeDataTableProp}></ThesisCommitteeDataTable>
        </div>
    )
}
