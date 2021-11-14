import React from 'react'
import TopDataBar from '../../../Utility/TopDataBar/TopDataBar';
import DataTable from '../../../Utility/DataTable/DataTable';
import {StudentInfoDataModel} from '../../../Model/StudentInfoDataModel';
import {CoursesTableDataModel} from '../../../Model/CoursesTableDataModel';
export default function AdmissionInfo() {
    let studentAcademicData = {
        Obj:"MS",
        Major:"EE",
        NDocs:"Mast",
        Confu:"ENGR",
        Admit:"20103",
        ReAdmit:"ORG",
        TransactionDate: "09/07/2010",
        EarnedUnits: 22.00,
        RGUnits:0.00,
        GPAApply:3.40,
        GPAOverall:3.53
    }
    const columns = [
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
            title: 'EX TYPE',
            dataIndex: 'extype',
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
      const tableData = [
        {
            key:"1",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"applied"
        },
        {
            key:"2",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"apply"
        },
        {
            key:"3",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"apply"
        },
        {
            key:"4",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"disable"
        },
        {
            key:"5",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"applied"
        },
        {
            key:"6",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"apply"
        },
        {
            key:"7",
            course:"EE-476L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"apply"
        },
        {
            key:"8",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:null,
            apply:"apply"
        },
        {
            key:"9",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:null,
            apply:"apply"
        },
        {
            key:"10",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"applied"
        },
        {
            key:"11",
            course:"EE-477L",
            term:"20103",
            grade:"A",
            units:4.00,
            gpts:14.80,
            extype:null,
            oper: "VSS",
            transactiondate:"09/02/2021",
            history:"This is the history",
            apply:"apply"
        },
    ]  
    let legalData = [];
    for(let key in studentAcademicData){
        let newKey = StudentInfoDataModel.StudentInfoDataModelKey(key);
        let newVal = StudentInfoDataModel.StudentInfoDataModelVal(studentAcademicData[key]);
        let obj = {[newKey] : newVal};
        legalData.push(obj);
    }
    const legaltableData = CoursesTableDataModel.CoursesTableDataModelArray(tableData);
    const DataTableProp = {
        tableData : legaltableData, 
        columns : columns,
        needSelect : true ,
        needAdd : false, 
        chooseDisableOrAble : CoursesTableDataModel.CoursesTableDataModelChooseDisableOrAble,
        filterCanChooseData: CoursesTableDataModel.CoursesTableDataModelItemCanApplyArray,
        filterDefaultChooseData: CoursesTableDataModel.CoursesTableDataModelDefaultChooseData,
    }
    return (
        <div>
            <TopDataBar data = {legalData}></TopDataBar>
            <DataTable {...DataTableProp}></DataTable>
        </div>
    )
}
