import React,{useEffect,useState} from 'react'
import {StudentID, StudentPostNumber, SaveStudentPostData} from '../../../../Redux/Slices/StudentInfo'
import { useSelector , useDispatch} from 'react-redux';
import style from './StarsException.module.less'
import {StudentPostDataModel} from '../../../../Model/StudentPostDataModel';
import {getStudentPostDataByStudentIDAndPostNumber} from '../../../../Api/studentInfo';
import StarsExceptionDataTable from '../../../../Utility/DataTable/StarsExceptionDataTable'
import moment from 'moment';
export default function NonCourseRelatedEvent() {
    const dispatch = useDispatch();
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    useEffect( async () => {
        let APIStudentPostData = await getStudentPostDataByStudentIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveStudentPostData(StudentPostDataModel.StudentPostDataModelObjFinal(APIStudentPostData))); 
    },[curStudentPostNumber]);
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
            dataIndex: 'rep'
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
    const  starsExceptionTableData = [
        {
            key: 1,
            cd: 'RA',
            rname: 'MAJ-HIST',  
            psname: 'MAJ-HISTA',
            reqct:-1,
            reqhrs:'0400',
            course:'HIST499',
            rcourse:'HIST198',
            cline:'ADDED COURSE HIST499',
            rep:'REG',
            dept:'REG',
            oper:'VS5',
            transdate:moment().format('DD/MM/YYYY')
        }
    ]
    const starsExceptionTableDataProp = {
        tableData : starsExceptionTableData, 
        columns : starsExceptionColumns,
      }
    return (
        <div className = {style.container}>
            <StarsExceptionDataTable {...starsExceptionTableDataProp}></StarsExceptionDataTable>
        </div>
    )
}
