import React,{useState,useEffect,useCallback} from 'react'
import 'antd/dist/antd.less';
import style from './StarsException.module.less'
import { useSelector} from 'react-redux';
import {StudentID, StudentPostNumber} from '../../../../Redux/Slices/StudentInfo'
import {StarsExceptionTableData} from '../../../../Redux/Slices/StarsException'
import StarsExceptionDataTable from '../../../../Utility/DataTable/StarsExceptionDataTable'
import useFetchStarsExceptionTableData from '../../../../Hooks/Fetch/starsException/useFetchStarsExceptionTableData'
import { Spin } from 'antd';
export default function StarsException() {
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curStarsExceptionTableData = useSelector(StarsExceptionTableData);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [starsExceptionDataTableLoading, starsExceptionDataTableLoadingError] = useFetchStarsExceptionTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
    const starsExceptionColumns = [
        {
            title: '#',
            dataIndex: 'key',
            sorter: (a,b) => a.key - b.key
        },
        {
            title: 'CD',
            dataIndex: 'cd',
        },
        {
            title: 'RNAME',
            dataIndex: 'rname',
        },
        {
            title: 'PSNAME',
            dataIndex: 'psname',
        },
        {
            title: 'REQCT',
            dataIndex: 'reqct'
        },
        {
            title: 'REQHRS',
            dataIndex: 'reqhrs',
        },
        {
            title: 'COURSE',
            dataIndex: 'course'
        },
        {
            title: 'RCOURSE',
            dataIndex: 'rcourse'
        },
        {
            title: 'CLINE',
            dataIndex: 'cline'
        },
        {
            title: 'DEPT/REP',
            dataIndex: 'deptrep'
        },
        {
            title: 'DEPT',
            dataIndex: 'dept'
        },
        {
            title: 'OPER',
            dataIndex: 'oper'
        },
        {
            title: 'TRANS DATE',
            dataIndex: 'transdate'
        }
    ]  
    const starsExceptionTableDataProp = {
        StarsExceptionTableData : curStarsExceptionTableData, 
        columns : starsExceptionColumns,
        mainPageShouldRefresh : setShouldRefresh
    }
    const renderStarsExceptionDataTable = useCallback(()=>{
        return (
            <StarsExceptionDataTable {...starsExceptionTableDataProp}></StarsExceptionDataTable>
        )
    },[shouldRefresh,curStarsExceptionTableData])
    return (
        <div className = {style.container}>
            <Spin spinning = {starsExceptionDataTableLoading}>
                {renderStarsExceptionDataTable()}
            </Spin>
        </div>
    )
}
