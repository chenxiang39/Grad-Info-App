import React, {useEffect} from 'react'
import 'antd/dist/antd.less';
import style from './Comment.module.less'
import {StudentID, StudentPostNumber} from '../../../../Redux/Slices/StudentInfo'
import { SaveCommentTableData, CommentTableData } from '../../../../Redux/Slices/Comment';
import { useSelector , useDispatch} from 'react-redux';
import { getCommentsTableDataByIDAndPostNumber} from '../../../../Api/comment'
import CommentDataTable from '../../../../Utility/DataTable/CommentDataTable'
import {CommentDataModel} from '../../../../Model/CommentDataModel'
export default function Comment(){
    const dispatch = useDispatch();
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    let curCommentTableData = useSelector(CommentTableData);
    useEffect(async ()=>{
        let APICommentsTableData = await getCommentsTableDataByIDAndPostNumber(curStudentID,curStudentPostNumber);
        dispatch(SaveCommentTableData(CommentDataModel.CommentDataModelArray(APICommentsTableData)));
    },[curStudentPostNumber]);  
    const columns = [
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

   const DataTableProp = {
        tableData : curCommentTableData, 
        columns : columns,
    }
   return (
        <div className = {style.container}>
            <CommentDataTable {...DataTableProp}></CommentDataTable>
        </div>
    )
}
