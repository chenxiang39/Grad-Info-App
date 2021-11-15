import React from 'react'
import TopDataBar from '../../../Utility/TopDataBar/TopDataBar';
import {StudentPostDataModel} from '../../../Model/StudentPostDataModel';
import EventDataTable from '../../../Utility/DataTable/EventDataTable';
export default function NonCourseRelatedEvent() {
    let StudentPostData = {
        sp_obj:"MS",
        sp_major:"EE",
        sp_ndocs:"Mast",
        sp_confu:"ENGR",
        sp_admit:"20103",
        sp_readmit:"ORG",
        sp_transdate: "09/07/2010",
    }
    const columns = [
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
      const tableData = [
        {
            key:"1",
            code:"LOA",
            description:"Leave of Absence for",
            related:"20113",
            oper:null,
            transactiondate:null,
        },
        {
            key:"2",
            code:"TIMEX",
            related:"20221",
            description:"Extension of Time Through",
            oper:null,
            transactiondate:null,
        },
        {
            key:"3",
            code:"READMIT",
            related:"20114",
            description:"Discontinuous enrollment",
            extype:'N/A',
            oper:null,
            transactiondate:null,
        },
      ];
      const codeDescriptionArr = {
          "LOA":"Leave of Absence for",
          "PROJ":"Project Completed"
      }
      const DataTableProp = {
        tableData : tableData, 
        columns : columns,
        codeDescriptionArr : codeDescriptionArr
    }
    let legalStudentPostData = StudentPostDataModel.StudentPostDataModelNonRelatedEventObjFinal(StudentPostData);
    return (
        <div>
            <TopDataBar data = {legalStudentPostData}></TopDataBar>
            <EventDataTable {...DataTableProp}></EventDataTable>
        </div>
    )
}
