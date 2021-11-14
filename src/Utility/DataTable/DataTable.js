import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, DatePicker, Select} from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import moment from 'moment';
export default function DataTable(props) {
    var {tableData, columns} = props;
    if(props.needSelect){
        var DefaultChooseData = props.filterDefaultChooseData(tableData);
        var DefaultChooseDataKeys = DefaultChooseData.map(item => item.key);
    }
    if(props.needAdd){
        var selectCodeOption = [];
        for(let key in props.codeDescriptionArr){
            selectCodeOption.push(key);
        }
    }
    const [selectedRowKeys, setselectedRowKeys] = useState(DefaultChooseDataKeys);
    const [selectedRows, setselectedRows] = useState(DefaultChooseData);
    const [isHistoryModalVisible, setisHistoryModalVisible] = useState(false);
    const [HistoryModalContent, setHistoryModalContent] = useState("");
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const [CodeDescription, setCodeDescription] = useState("");
    const [relatedYear, setRelatedYear] = useState("");
    const [relatedSemster, setRelatedSemster] = useState("");
    const clickHistory = (history) => {
        setHistoryModalContent(history);
        setisHistoryModalVisible(true);
    }
    const handleHistoryModalOk = () => {
        setisHistoryModalVisible(false);
    };
    
    const handleHistoryCancel = () => {
        setisHistoryModalVisible(false);
    };
    const addHistoryColumn = () =>{
        columns = columns.map((item) => {
            let historyContent = {
                render: history => {
                    if(history !== null){
                        return (
                            <Button
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
    const handleAdd = () =>{
        setisAddModalVisible(true);
    }
    const handleAddModalOk = () =>{
        setisAddModalVisible(false);
    }
    const handleCodeChange = (value) =>{
        setCodeDescription(props.codeDescriptionArr[value])
    }
    const handleAddModalCancel = () =>{
        setisAddModalVisible(false);
    }
    const handleRelatedSemster = (value) =>{
        setRelatedSemster(value);
    }
    const handleRelatedYear = (value) => {
        setRelatedYear(moment(value).valueOf())
    }
    const handleDate = () =>{
        
    }
    const AddModalForm = () => {
        const selectCodeOptionSelect = selectCodeOption.map((item) => {
            return (
                <Select.Option key = {item} value = {item}>{item}</Select.Option>
            )
        })
        let semster = [1,2,3];
        const selectSemsterOption = semster.map((item) => {
            return (
                <Select.Option key = {item} value = {item}>{item}</Select.Option>
            )
        });
        return (
            <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="Code">
              <Select onChange = {handleCodeChange}>
                {selectCodeOptionSelect}
              </Select>
            </Form.Item>
            <Form.Item label="Description">
              <Input value = {CodeDescription}></Input>
            </Form.Item>
            <Form.Item label="Related">
                <DatePicker 
                 allowClear = {false}
                 placeholder = "Year"
                 style={{ width: 120 }}
                 onChange = {handleRelatedYear}
                 picker="year"/>
                <Select
                    style={{ width: 100 }}
                    placeholder="Semster"
                    onChange = {handleRelatedSemster}
                >
                    {selectSemsterOption}
                </Select>
            </Form.Item>
            <Form.Item label="Date">
              <DatePicker 
                allowClear = {false}
                onChange={handleDate}/>
            </Form.Item>
          </Form>
        )
    }
    addHistoryColumn();
    return (
            <div>
                {props.needAdd ? <Button
                    onClick={() => handleAdd()}
                    className={[style.button, style.topButton]}
                    >
                    ADD EVENT
                </Button>: null}
                <Modal 
                    centered
                    visible={isHistoryModalVisible} 
                    closable={false}
                    onOk={handleHistoryModalOk}
                    onCancel = {handleHistoryCancel}
                    title = {[
                        <div className = {style.modalTitle} >APPLY HISTORY</div>
                    ]}
                    footer={[
                        <Button key="ok" type="primary" onClick={handleHistoryModalOk}>
                            OK  
                        </Button>,]}
                    >
                       {HistoryModalContent}
                </Modal>
                {props.needAdd ? <Modal 
                    centered
                    visible={isAddModalVisible} 
                    onOk={handleAddModalOk}
                    onCancel = {handleAddModalCancel}
                    okText = "Submit"
                    title = {[
                        <div className = {style.modalTitle} >ADD EVENT</div>
                    ]}
                    >
                    {AddModalForm()}
                </Modal> : null}
                <Table
                    className = {style.header}
                    rowSelection={props.needSelect ?{
                    type: "Checkbox",
                    columnTitle: "APPLY",
                    ...rowSelection
                }: null}
                    columns = {columns}
                    dataSource = {tableData}
                >
                </Table>
                {props.needSelect ? <div className = {style.buttonContainer}>
                    <Button onClick = {selectAll} className = {style.button}>SELECT ALL</Button>
                    <Button onClick = {submit} type="primary" className = {[style.button, style.Pbutton, ]}>SUBMIT</Button>
                </div> : null}
                              
            </div>
            
    )
}



