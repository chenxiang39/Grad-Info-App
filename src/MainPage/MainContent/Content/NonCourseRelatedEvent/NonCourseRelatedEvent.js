import React from 'react'
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import {StudentID, StudentPostData, StudentPostNumber, SaveStudentPostData} from '../../../../Redux/Slices/StudentInfo'
import { useSelector , useDispatch} from 'react-redux';
import EventDataTable from '../../../../Utility/DataTable/EventDataTable';
import ExamCommitteeDataTable from '../../../../Utility/DataTable/ExamCommitteeDataTable'
import ThesisCommitteeDataTable from '../../../../Utility/DataTable/ThesisCommitteeDataTable'
import { NonCourseRelatedEventDataModel } from '../../../../Model/NonCourseRelatedEventDataModel';
import { CommitteesDataModel } from '../../../../Model/CommitteesDataModel';
export default function NonCourseRelatedEvent() {
    let curStudentPostData = useSelector(StudentPostData);
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
    const examTableData = [
        {
            exam_committee_name:"Tom",
            exam_comittee_char:"Chairman",
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
    const thesisTableData = [
        {
            thesis_committee_name:"Jerry",
            thesis_comittee_char:"Chairman",
            thesis_committee_title:"Paper 1"
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
      const eventTableData = [
        {
            event_code:"LOA",
            event_description:"Leave of Absence for",
            ncrer_related:"20113",
            ncrer_oper:null,
            ncrer_transdate:null,
        },
        {
            event_code:"LOA",
            event_description:"Leave of Absence for",
            ncrer_related:"20114",
            ncrer_oper:null,
            ncrer_transdate:null,
        },
      ];
      const codeDescriptionArr = {
          "LOA":"Leave of Absence for",
          "PROJ":"Project Completed"
      }
      let legalEventTableData = NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelArray(eventTableData);
      const EventDataTableProp = {
        tableData : legalEventTableData, 
        columns : eventColumns,
        codeDescriptionArr : codeDescriptionArr
      }
      let legalExamCommitteeTableData = CommitteesDataModel.examCommitteesDataModelArr(examTableData);
      const examCommitteeDataTableProp = {
        tableData : legalExamCommitteeTableData, 
        columns : examColumns,
      }
      let legalThesisCommitteeTableData = CommitteesDataModel.thesisCommitteesDataModelArr(thesisTableData);
      const thesisCommitteeDataTableProp = {
        tableData : legalThesisCommitteeTableData, 
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
