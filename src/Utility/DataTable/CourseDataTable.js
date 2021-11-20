import React, { useState } from 'react'
import { Table,Button, Modal} from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import moment from 'moment';
export default function CourseDataTable(props) {
    var {tableData, columns} = props;
    var DefaultChooseData = props.ChosedArray(tableData);
    var DefaultChooseDataKeys = DefaultChooseData.map(item => item.key);
    const [selectedRowKeys, setselectedRowKeys] = useState(DefaultChooseDataKeys);
    const [selectedRows, setselectedRows] = useState(DefaultChooseData);
    const [isHistoryModalVisible, setisHistoryModalVisible] = useState(false);
    const [currentcheckedHistoryArr, setcurrentcheckedHistoryArr] = useState([]);
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
    const submit = () =>{
        console.log(selectedRows);
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
                >
                </Table>
                <div className = {style.buttonContainer}>
                    <Button onClick = {selectAll} className = {style.button}>SELECT ALL</Button>
                    <Button onClick = {submit} type="primary" className = {[style.button, style.Pbutton, ]}>SUBMIT</Button>
                </div>              
            </div>
            
    )
}



