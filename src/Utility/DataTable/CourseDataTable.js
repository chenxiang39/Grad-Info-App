import React, { useState } from 'react'
import { Table,Button, Modal} from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import moment from 'moment';
export default function CourseDataTable(props) {
    var {tableData, columns} = props;
    var DefaultChooseData = props.filterDefaultChooseData(tableData);
    var DefaultChooseDataKeys = DefaultChooseData.map(item => item.key);
    const [selectedRowKeys, setselectedRowKeys] = useState(DefaultChooseDataKeys);
    const [selectedRows, setselectedRows] = useState(DefaultChooseData);
    const [isHistoryModalVisible, setisHistoryModalVisible] = useState(false);
    const [HistoryModalContent, setHistoryModalContent] = useState("");
    const clickHistory = (history) => {
        setHistoryModalContent(history);
        setisHistoryModalVisible(true);
    }
    const handleHistoryModalOk = () => {
        setisHistoryModalVisible(false);
    };
    const addHistoryColumn = () =>{
        columns = columns.map((item) => {
            let historyContent = {
                render: history => {
                    if(history !== null){
                        return (
                            <Button
                                key = {item}
                                onClick = {() => clickHistory(history)}
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
    const handleOnChange = (selectedRowKeys, selectedRows) =>{
        setselectedRowKeys(selectedRowKeys);
        setselectedRows(selectedRows);
    }
    const selectAll = () =>{
        const legalData = props.filterCanChooseData(tableData);
        if(legalData.length === selectedRowKeys.length){
            handleOnChange([],[]);
        }
        else{
            const keys = legalData.map((item) => item.key);
            handleOnChange(keys, legalData);
        }
        addHistoryColumn();
    }
    const submit = () =>{
        console.log(selectedRows);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: handleOnChange,
        getCheckboxProps: (record) => props.chooseDisableOrAble(record)
    };
    addHistoryColumn();
    return (
            <div>
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
                       {HistoryModalContent}
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



