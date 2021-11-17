import React from 'react'
import TopDataBar from '../../../Utility/TopDataBar/TopDataBar';
import {StudentPostDataModel} from '../../../Model/StudentPostDataModel';
import EventDataTable from '../../../Utility/DataTable/EventDataTable';
import { NonCourseRelatedEventDataModel } from '../../../Model/NonCourseRelatedEventDataModel';
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
      let legalTableData = NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelArray(tableData);
      const DataTableProp = {
        tableData : legalTableData, 
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
