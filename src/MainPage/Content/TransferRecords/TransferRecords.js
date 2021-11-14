import React from 'react'
import TopDataBar from '../../../Utility/TopDataBar/TopDataBar';
import {StudentInfoDataModel} from '../../../Model/StudentInfoDataModel';
import { TransferDataModel } from '../../../Model/TransferDataModel';
import DataTable from '../../../Utility/DataTable/DataTable';
import TitleContent from '../../../Utility/TitleContent/TitleContent';
import {CoursesTableDataModel} from '../../../Model/CoursesTableDataModel';
export default function TransferRecords() {
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
            units:"4.0",
            gpts:"14.80",
            extype:'N/A',
            oper:null,
            transactiondate:null,
            history:null,
            apply:"disable"
        },
      ];
    let legalStudentInfoData = [];
    for(let key in studentAcademicData){
        let newKey = StudentInfoDataModel.StudentInfoDataModelKey(key);
        let newVal = StudentInfoDataModel.StudentInfoDataModelVal(studentAcademicData[key]);
        let obj = {[newKey] : newVal};
        legalStudentInfoData.push(obj);
    }
    let TransferTitle = "Transfer Program of Study"
    let TransferData = {
        CEEB:"2074",
        INSTITUTIONNAME: "Carnegie-Mellon",
        DATESOFATTENDANCE : "FA06"
    }
    let legalTransferData = [];
    for(let key in TransferData){
        let newKey = TransferDataModel.TransferDataModelKey(key);
        let newVal = TransferDataModel.TransferDataModelVal(TransferData[key]);
        let obj = {[newKey] : newVal};
        legalTransferData.push(obj);
    }
    const DataTableProp = {
        tableData : tableData, 
        columns : columns,
        needSelect : true ,
        needAdd : false, 
        chooseDisableOrAble : CoursesTableDataModel.CoursesTableDataModelChooseDisableOrAble,
        filterCanChooseData: CoursesTableDataModel.CoursesTableDataModelItemCanApplyArray,
        filterDefaultChooseData: CoursesTableDataModel.CoursesTableDataModelDefaultChooseData,
    }
    return (
        <div>
            <TopDataBar data = {legalStudentInfoData}></TopDataBar>
            <TitleContent title = {TransferTitle} data = {legalTransferData}></TitleContent>
            <DataTable {...DataTableProp}></DataTable>
        </div>
    )
}
