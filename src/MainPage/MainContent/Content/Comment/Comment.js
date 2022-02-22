import React, { useCallback, useState } from 'react'
import 'antd/dist/antd.less';
import style from './Comment.module.less'
import { useSelector} from 'react-redux';
import {StudentID, StudentPostNumber} from '../../../../Redux/Slices/StudentInfo'
import { CommentTableData } from '../../../../Redux/Slices/Comment';
import CommentDataTable from '../../../../Utility/DataTable/CommentDataTable'
import useFetchCommentTableData from '../../../../Hooks/Fetch/comment/useFetchCommentTableData'
import { Spin } from 'antd';
export default function Comment(){
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curCommentTableData = useSelector(CommentTableData);
    const [shouldRefresh, setshouldRefresh] = useState(false);
    const [commentDataTableLoading, commentDataTableLoadingError] = useFetchCommentTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
    const CommentDataTableColumns = [
        {
        title: '#',
        dataIndex: 'key',
        sorter: (a,b) => a.key - b.key
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
            title: 'COMMENT',
            dataIndex: 'content'
        }
    ];   

   const CommentDataTableProp = {
        tableData : curCommentTableData, 
        columns : CommentDataTableColumns,
        mainPageShouldRefresh : setshouldRefresh
    }
    const renderCourseDataTable = useCallback(()=>{
        return (
            <CommentDataTable {...CommentDataTableProp}></CommentDataTable>
        )
    },[shouldRefresh,curCommentTableData])
   return (
        <div className = {style.container}>
            <Spin spinning = {commentDataTableLoading}>
                {renderCourseDataTable()}
            </Spin>
        </div>
    )
}
