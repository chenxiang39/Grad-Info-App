import React from 'react'
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import {StudentPostDataModel} from '../../../../Model/StudentPostDataModel';
import { TransferDataModel } from '../../../../Model/TransferDataModel';
import CourseDataTable from '../../../../Utility/DataTable/CourseDataTable';
import TitleContent from '../../../../Utility/TitleContent/TitleContent';
import { TransferCoursesDataModel } from '../../../../Model/TransferCourseDataModel';
export default function TransferRecords() {
    let StudentPostData = {
        sp_obj:"MS",
        sp_major:"EE",
        sp_ndocs:"Mast",
        sp_confu:"ENGR",
        sp_admit:"20103",
        sp_readmit:"ORG",
        sp_transdate: "09/07/2010",
        sp_earnunits: 22.00,
        sp_rgunits:0.00,
        sp_gpa_apply:3.40,
        sp_gpa_all:3.53
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
      const tableData = [
        {
            tr_course_name:"EE-478L",
            tr_course_term:"20103",
            tr_course_grade:"A",
            tr_course_units: 4.0,
            tr_course_gpts: 14.80,
            tr_course_apply_code:"X",
            tr_course_oper:"VS5",
            tr_course_transdate:"09/02/2021",
            tr_course_history:[
                {
                    tr_history_course_oper:"VS5",
                    tr_history_course_apply_status:true,
                    tr_course_transdate:"09/02/2021",
                    tr_history_course_name:"EE-477"
                },
                {
                    tr_history_course_oper:"VS6",
                    tr_history_course_apply_status:false,
                    tr_course_transdate:"09/02/2021",
                    tr_history_course_name:"EE-477"
                },
            ],
            tr_course_apply_status: false
        },
        {
            tr_course_name:"EE-478L",
            tr_course_term:"20103",
            tr_course_grade:"A",
            tr_course_units: 4.0,
            tr_course_gpts: 14.80,
            tr_course_apply_code:"Y",
            tr_course_oper:"VS5",
            tr_course_transdate:"09/02/2021",
            tr_course_history:[
                {
                    tr_history_course_oper:"VS5",
                    tr_history_course_apply_status:true,
                    tr_course_transdate:"09/02/2021",
                    tr_history_course_name:"EE-477"
                },
            ],
            tr_course_apply_status: true
        },
      ];
    let TransferTitle = "Transfer Program of Study"
    let TransferData = {
        institution_ceeb:"2074",
        institution_name: "Carnegie-Mellon",
        institution_date_earned : "FA06"
    }

    let legalTransferData =　TransferDataModel.TransferDataModelLegalArr(TransferData);
    let legalTableData = TransferCoursesDataModel.TransferCoursesTableDataModelArray(tableData);

    const DataTableProp = {
        tableData : legalTableData, 
        columns : columns,
        ChooseDisableOrAble : TransferCoursesDataModel.TransferCoursesTableDataModelChooseDisableOrAble,
        CanBeChosedArray: TransferCoursesDataModel.TransferCoursesTableDataModelItemCanBeChosedArray,
        ChosedArray: TransferCoursesDataModel.TransferCoursesTableDataModelItemChosedArray,
    }
    let legalStudentPostData = StudentPostDataModel.StudentPostDataModelObjFinal(StudentPostData);
    return (
        <div>
            <TopDataBar data = {legalStudentPostData}></TopDataBar>
            <TitleContent title = {TransferTitle} data = {legalTransferData}></TitleContent>
            <CourseDataTable {...DataTableProp}></CourseDataTable>
        </div>
    )
}
