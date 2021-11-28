import React, { useState } from 'react'
import { Table,Button, Modal} from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {UserInfo} from '../../Redux/Slices/UserInfo'
import { StudentPostNumber, StudentID} from '../../Redux/Slices/StudentInfo'
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import {AdmissionCourseDataModel} from '../../Model/admissionCourse/AdmissionCourseDataModel'
import {TransferCourseDataModel} from '../../Model/transferCourse/TransferCourseDataModel'
export default function CourseDataTable(props) {
    const curUserInfo = useSelector(UserInfo);
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    var {tableData, columns, type, tableDataLoading} = props;
    var DefaultChooseData = props.ChosedArray(tableData);
    var DefaultChooseDataKeys = DefaultChooseData.map(item => item.key);
    const [selectedRowKeys, setselectedRowKeys] = useState(DefaultChooseDataKeys);
    const [selectedRows, setselectedRows] = useState(DefaultChooseData);
    const [isHistoryModalVisible, setisHistoryModalVisible] = useState(false);
    const [currentcheckedHistoryArr, setcurrentcheckedHistoryArr] = useState([]);
    const [isSubmitModalVisible, setisSubmitModalVisible] = useState(false);
    const clickHistoryBtn = (historyArr) => {
        setcurrentcheckedHistoryArr(historyArr);
        setisHistoryModalVisible(true);
    }
    const handleHistoryModalOk = () => {
        setisHistoryModalVisible(false);
    };
    const addHistoryColumn = () =>{
        columns = columns.map((item) => {
            let historyContent = {
                render: historyArr => {
                    if(historyArr.length > 1){
                        return (
                            <Button
                                key = {item}
                                onClick = {() => clickHistoryBtn(historyArr)}
                                shape="circle"
                                size = "small"
                                icon = {<InfoOutlined />}
                            >
                            </Button>
                        )
                    }
                }
            }
            if(item.dataIndex === "history"){
                return {...item,...historyContent};
            }
            else{
                return item;
            }
        })
    }
    const createHistoryContent = () =>{
        let res = [];
        for(let i = 0; i < currentcheckedHistoryArr.length; i++){
            let item = currentcheckedHistoryArr[i];
            let obj = (
                <div key = {item + i} className = {style.historyItem}>
                     {`Course ${item.course} was ${item.apply ? "applied":"unapplied"} by ${item.oper} on ${item.transactiondate}`}
                </div>
            )
            res.push(obj);
        }
        return res;
    }
    const handleOnChange = (selectedRowKeys, selectedRows) =>{
        setselectedRowKeys(selectedRowKeys);
        setselectedRows(selectedRows);
    }
    const selectAll = () =>{
        const legalData = props.CanBeChosedArray(tableData);
        if(legalData.length === selectedRowKeys.length){
            handleOnChange([],[]);
        }
        else{
            const keys = legalData.map((item) => item.key);
            handleOnChange(keys, legalData);
        }
    }
    const submitFun = () =>{
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        if(type === "AdmissionCourse"){
            let a = AdmissionCourseDataModel.AdmissionCourseTableDataModelSubmitDataObj(selectedRows,studentInfoObj,curUserInfo.useroper);
            console.log(a);
        }
        else if(type === "TransferCourse"){
            let b = TransferCourseDataModel.TransferCourseTableDataModelSubmitDataObj(selectedRows,studentInfoObj, curUserInfo.useroper);
            console.log(b);
        }
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: handleOnChange,
        getCheckboxProps: (record) => props.ChooseDisableOrAble(record)
    };
    addHistoryColumn();
    return (
            <div>
                <div className = {style.tableTitle}>{!!props.title ? props.title : null}</div>
                <Modal 
                    key = "historyCheck"
                    centered
                    visible={isHistoryModalVisible} 
                    closable={false}
                    title = {[
                        <div key = "checkHistoryTitle" className = {style.modalTitle} >APPLY HISTORY</div>
                    ]}
                    footer={[
                        <Button key="historyCheckOk" type="primary" onClick={handleHistoryModalOk}>
                            OK  
                        </Button>,]}
                    >
                       {createHistoryContent()}
                </Modal>
                <Table
                    className = {style.header}
                    rowSelection = {{
                        type: "Checkbox",
                        columnTitle: "APPLY",
                        ...rowSelection
                    }}
                    columns = {columns}
                    dataSource = {tableData}
                    loading = {tableDataLoading}
                >
                </Table>
                <div className = {style.buttonContainer}>
                    <Button onClick = {selectAll} className = {style.button}>SELECT ALL</Button>
                    <Button onClick = {submitFun} type="primary" className = {[style.button, style.Pbutton, ]}>SUBMIT</Button>
                </div>              
            </div>
            
    )
}



