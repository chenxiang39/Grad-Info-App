import React from 'react'
import TopDataBar from '../../../Utility/TopDataBar/TopDataBar';
import {StudentPostDataModel} from '../../../Model/StudentPostDataModel';
import CourseDataTable from '../../../Utility/DataTable/CourseDataTable';
import { AdmissionCourseDataModel } from '../../../Model/AdmissionCourseDataModel';
export default function AdmissionInfo() {
    let StudentPostData = {
        sp_obj:"MS",
        sp_major:"EE",
        sp_ndocs:"Mast",
        sp_confu:"ENGR",
        sp_admit:"20103",
        sp_readmit:"ORG",
        sp_transdate: "09/07/2010",
        sp_earnunits: 22.00,
        sp_rgunits:2.00,
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
            ad_course_name:"EE-477L",
            ad_course_term:"20103",
            ad_course_grade:"A",
            ad_course_units: 4.0,
            ad_course_gpts: 14.80,
            ad_course_apply_code:"V",
            ad_course_oper:"VS5",
            ad_course_transdate:"09/02/2021",
            ad_course_history:[
                {
                    ad_history_course_oper:"VS5",
                    ad_history_course_apply_status:true,
                    ad_course_transdate:"09/02/2021",
                    ad_history_course_name:"EE-477"
                },
                {
                    ad_history_course_oper:"VS6",
                    ad_history_course_apply_status:false,
                    ad_course_transdate:"09/02/2021",
                    ad_history_course_name:"EE-477"
                },
            ],
            ad_course_apply_status: false
        },
        {
            ad_course_name:"EE-478L",
            ad_course_term:"20103",
            ad_course_grade:"A",
            ad_course_units: 4.0,
            ad_course_gpts: 14.80,
            ad_course_apply_code:"X",
            ad_course_oper:"VS5",
            ad_course_transdate:"09/02/2021",
            ad_course_history:[
                {
                    ad_history_course_oper:"VS5",
                    ad_history_course_apply_status:true,
                    ad_course_transdate:"09/02/2021",
                    ad_history_course_name:"EE-477"
                },
                {
                    ad_history_course_oper:"VS6",
                    ad_history_course_apply_status:false,
                    ad_course_transdate:"09/02/2021",
                    ad_history_course_name:"EE-477"
                },
            ],
            ad_course_apply_status: false
        },
        {
            ad_course_name:"EE-478L",
            ad_course_term:"20103",
            ad_course_grade:"A",
            ad_course_units: 4.0,
            ad_course_gpts: 14.80,
            ad_course_apply_code:"R",
            ad_course_oper:"VS5",
            ad_course_transdate:"09/02/2021",
            ad_course_history:[
                {
                    ad_history_course_oper:"VS5",
                    ad_history_course_apply_status:true,
                    ad_course_transdate:"09/02/2021",
                    ad_history_course_name:"EE-477"
                },
            ],
            ad_course_apply_status: true
        },
      ];
    let legalTableData = AdmissionCourseDataModel.AdmissionCoursesTableDataModelArray(tableData);
    const DataTableProp = {
        tableData : legalTableData, 
        columns : columns,
        ChooseDisableOrAble : AdmissionCourseDataModel.AdmissionCoursesTableDataModelChooseDisableOrAble,
        CanBeChosedArray: AdmissionCourseDataModel.AdmissionCoursesTableDataModelItemCanBeChosedArray,
        ChosedArray: AdmissionCourseDataModel.AdmissionCoursesTableDataModelItemChosedArray,
    }
    let legalStudentPostData = StudentPostDataModel.StudentPostDataModelObjFinal(StudentPostData);
    return (
        <div>
            <TopDataBar data = {legalStudentPostData}></TopDataBar>
            <CourseDataTable {...DataTableProp}></CourseDataTable>
        </div>
    )
}
