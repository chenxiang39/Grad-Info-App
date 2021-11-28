import React, { useMemo, useState } from 'react'
import { Spin } from 'antd';
import { useSelector} from 'react-redux';
import TopDataBar from '../../../../Utility/TopDataBar/TopDataBar';
import CourseDataTable from '../../../../Utility/DataTable/CourseDataTable';
import { AdmissionCourseDataModel } from '../../../../Model/admissionCourse/AdmissionCourseDataModel';
import {StudentID, StudentPostData, StudentPostNumber} from '../../../../Redux/Slices/StudentInfo'
import {AdmissionCourseTableData} from '../../../../Redux/Slices/AdmissionCourse'
import useFetchAdmissionCourseTableData from '../../../../Hooks/Fetch/admissionCourse/useFetchAdmissionCourseTableData';
import useFetchStudentPostData from '../../../../Hooks/Fetch/studentInfo/useFetchStudentPostData';
export default function AdmissionInfo() {
      const [shouldRefresh, setshouldRefresh] = useState(false);
      let curStudentPostData = useSelector(StudentPostData);
      let curStudentPostNumber = useSelector(StudentPostNumber);
      let curStudentID = useSelector(StudentID);
      let curAdmissionCourseTableData = useSelector(AdmissionCourseTableData);
      const [tableDataLoading, tableDataLoadingError] = useFetchAdmissionCourseTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
      const [topDataBarLoading, topDataBarLoadingError] = useFetchStudentPostData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
      const AdmissionTableDataColumns = [
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
    const DataTableProp = {
        type: "AdmissionCourse",
        tableData : curAdmissionCourseTableData, 
        columns : AdmissionTableDataColumns,
        ChooseDisableOrAble : AdmissionCourseDataModel.AdmissionCourseTableDataModelChooseDisableOrAble,
        CanBeChosedArray: AdmissionCourseDataModel.AdmissionCourseTableDataModelItemCanBeChosedArray,
        ChosedArray: AdmissionCourseDataModel.AdmissionCourseTableDataModelItemChosedArray,
        tableDataLoading : tableDataLoading,
        mainPageShouldRefresh : setshouldRefresh
    }
    return (
        <div>
            <Spin spinning = {topDataBarLoading}>
                <TopDataBar data = {curStudentPostData} />
            </Spin>
            <CourseDataTable {...DataTableProp}></CourseDataTable>
        </div>
    )
}
