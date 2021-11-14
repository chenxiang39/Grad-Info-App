import React from 'react'
import TopDataBar from '../../../Utility/TopDataBar/TopDataBar';
import {StudentInfoDataModel} from '../../../Model/StudentInfoDataModel';
import EventDataTable from '../../../Utility/DataTable/EventDataTable';
export default function NonCourseRelatedEvent() {
    let studentAcademicData = {
        Obj:"MS",
        Major:"EE",
        NDocs:"Mast",
        Confu:"ENGR",
        Admit:"20103",
        ReAdmit:"ORG",
        TransactionDate: "09/07/2010",
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
      let legalStudentInfoData = [];
      for(let key in studentAcademicData){
          let newKey = StudentInfoDataModel.StudentInfoDataModelKey(key);
          let newVal = StudentInfoDataModel.StudentInfoDataModelVal(studentAcademicData[key]);
          let obj = {[newKey] : newVal};
          legalStudentInfoData.push(obj);
      }
      const codeDescriptionArr = {
          "LOA":"Leave of Absence for",
          "PROJ":"Project Completed"
      }
      const DataTableProp = {
        tableData : tableData, 
        columns : columns,
        codeDescriptionArr : codeDescriptionArr
    }
    return (
        <div>
            <TopDataBar data = {legalStudentInfoData}></TopDataBar>
            <EventDataTable {...DataTableProp}></EventDataTable>
        </div>
    )
}
