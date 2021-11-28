import React from 'react'
import 'antd/dist/antd.less';
import style from './Comment.module.less'
import { useSelector} from 'react-redux';
import {StudentID, StudentPostNumber} from '../../../../Redux/Slices/StudentInfo'
import { CommentTableData } from '../../../../Redux/Slices/Comment';
import CommentDataTable from '../../../../Utility/DataTable/CommentDataTable'
import useFetchCommentTableData from '../../../../Hooks/Fetch/comment/useFetchCommentTableData'
export default function Comment(){
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curCommentTableData = useSelector(CommentTableData);
    const [commentDataTableLoading, commentDataTableLoadingError] = useFetchCommentTableData([curStudentID, curStudentPostNumber],[curStudentPostNumber]);
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
        tableDataLoading: commentDataTableLoading
    }
   return (
        <div className = {style.container}>
            <CommentDataTable {...CommentDataTableProp}></CommentDataTable>
        </div>
    )
}
