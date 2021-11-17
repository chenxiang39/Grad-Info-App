import React, {useState} from 'react'
import 'antd/dist/antd.less';
import { Button, Input } from 'antd';
import style from './Comments.module.less'
import CommentsDataTable from '../../../Utility/DataTable/CommentsDataTable'
import {CommentsDataModel} from '../../../Model/CommentsDataModel'
const { TextArea } = Input;
export default function Comments(){
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
  const tableData = [
    {
        comment_transdate:"09/02/2019",
        cooment_content:"This is my first Comment",
        comment_oper:"VS5",
    },
    {
        comment_transdate:"09/02/2019",
        cooment_content:"This is my second Comment",
        comment_oper:"VS5",
    },
  ];
   
   let legalCommentsData = CommentsDataModel.CommentsDataModelArray(tableData);
   const DataTableProp = {
        tableData : legalCommentsData, 
        columns : columns,
    }
   return (
        <div className = {style.container}>
            <CommentsDataTable {...DataTableProp}></CommentsDataTable>
        </div>
    )
}
