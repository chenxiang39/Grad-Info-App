import React,{useEffect} from 'react'
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import {StudentID, StudentPostData, StudentPostNumber, SaveStudentPostData} from '../../../../Redux/Slices/StudentInfo'
import {SaveNonCourseRelatedEventTableData, NonCourseRelatedEventTableData, ExamCommitteeTableData,ThesisCommitteeTableData ,SaveExamCommitteeTableData, SaveThesisCommitteeTableData} from '../../../../Redux/Slices/NonCourseRelatedEvent'
import { useSelector , useDispatch} from 'react-redux';
import EventDataTable from '../../../../Utility/DataTable/EventDataTable';
import ExamCommitteeDataTable from '../../../../Utility/DataTable/ExamCommitteeDataTable'
import ThesisCommitteeDataTable from '../../../../Utility/DataTable/ThesisCommitteeDataTable'
import { NonCourseRelatedEventDataModel } from '../../../../Model/NonCourseRelatedEventDataModel';
import {StudentPostDataModel} from '../../../../Model/StudentPostDataModel';
import { CommitteeDataModel } from '../../../../Model/CommitteeDataModel';
import { getNonCourseRelatedEventTableDataByIDAndPostNumber, getExamCommitteeTableDataByIDAndPostNumber, getThesisCommitteeTableDataByIDAndPostNumber} from '../../../../Api/nonCourseRelatedEvent'
import {getStudentPostDataByStudentIDAndPostNumber} from '../../../../Api/studentInfo'
export default function NonCourseRelatedEvent() {
    const dispatch = useDispatch();
    let curStudentPostData = useSelector(StudentPostData);
    let curNonCourseRelatedEventTableData = useSelector(NonCourseRelatedEventTableData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curExamCommitteeTableData = useSelector(ExamCommitteeTableData);
    let curThesisCommitteeTableData = useSelector(ThesisCommitteeTableData);
    useEffect( async () => {
        let APINonCourseRelatedEventTableData = await getNonCourseRelatedEventTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveNonCourseRelatedEventTableData(NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelArray(APINonCourseRelatedEventTableData))); 
        let APIExamCommitteeTableData = await getExamCommitteeTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveExamCommitteeTableData(CommitteeDataModel.examCommitteeDataModelArr(APIExamCommitteeTableData)));
        let APIThesisCommitteeTableData = await getThesisCommitteeTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveThesisCommitteeTableData(CommitteeDataModel.thesisCommitteeDataModelArr(APIThesisCommitteeTableData)));
        let APIStudentPostData = await getStudentPostDataByStudentIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveStudentPostData(StudentPostDataModel.StudentPostDataModelObjFinal(APIStudentPostData))); 
    },[curStudentPostNumber]);
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

      const codeDescriptionArr = {
          "LOA":"Leave of Absence for",
          "PROJ":"Project Completed"
      }
      const EventDataTableProp = {
        tableData : curNonCourseRelatedEventTableData, 
        columns : eventColumns,
        codeDescriptionArr : codeDescriptionArr
      }
      const examCommitteeDataTableProp = {
        tableData : curExamCommitteeTableData, 
        columns : examColumns,
      }
      const thesisCommitteeDataTableProp = {
        tableData : curThesisCommitteeTableData, 
        columns : thesisColumns,
      }
    return (
        <div>
            <TopDataBar data = {curStudentPostData}></TopDataBar>
            <EventDataTable {...EventDataTableProp}></EventDataTable>
            <ExamCommitteeDataTable {...examCommitteeDataTableProp}></ExamCommitteeDataTable>
            <ThesisCommitteeDataTable {...thesisCommitteeDataTableProp}></ThesisCommitteeDataTable>
        </div>
    )
}
