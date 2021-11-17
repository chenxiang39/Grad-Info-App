import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, Select} from 'antd';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import {CommitteesDataModel} from '../../Model/CommitteesDataModel'
export default function ExamCommitteeDataTable(props) {
    var {tableData, columns} = props;
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const [curCommitteeName, setcurCommitteeName] = useState("");
    const [curCommitteeChar, setcurCommitteeChar] = useState("");
    const handleAdd = () =>{
        setisAddModalVisible(true);
    }
    const handleAddModalOk = () =>{
        let obj = {
            committeeName: curCommitteeName,
            committeeChar: curCommitteeChar,
        }
        if(!curCommitteeName || !curCommitteeChar){
            alert("You must add all of items!");
            return;
        }
        let realObj = CommitteesDataModel.examCommitteesDataModelObj(obj);
        console.log(realObj);
        //save 
        setcurCommitteeName("");
        setcurCommitteeChar("");
        setisAddModalVisible(false);
    }
    const handleAddModalCancel = () =>{
        setcurCommitteeName("");
        setcurCommitteeChar("");
        setisAddModalVisible(false);
    }
    const changeCommitteeName = (e) =>{
        setcurCommitteeName(e.target.value);
    }
    const changeCommitteeChar = (value) =>{
        setcurCommitteeChar(value);
    }
    const AddCOMMITTEEModal = () =>{
        let char = ["CHAIR","CO-CHAIR","MEMBER"];
        const selectCharOption = char.map((item) => {
            return (
                <Select.Option key = {item + "char"} value = {item}>{item}</Select.Option>
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
            <Form.Item label= "Name: ">
                <Input
                    value = {curCommitteeName}
                    onChange = {changeCommitteeName}
                ></Input>
            </Form.Item>
            <Form.Item label= "Title: ">
                <Select
                    style={{ width: 100 }}
                    value = {curCommitteeChar}
                    onChange = {changeCommitteeChar}
                >
                    {selectCharOption}
                </Select>
            </Form.Item>
            </Form>
        )
    }
    return (
            <div>
                <div className = {style.tableTitle}>Comp/Qualifying Exam Committee</div>
                <Button
                    onClick={() => handleAdd()}
                    className={[style.button, style.topButton]}
                    >
                    ADD COMMITTEE
                </Button>
                <Modal 
                    key = "addCommittee"
                    centered
                    visible={isAddModalVisible} 
                    onCancel = {handleAddModalCancel}
                    onOk = {handleAddModalOk}
                    title = {[
                        <div key = "addEventTitle" className = {style.modalTitle} >ADD COMMITTEE</div>
                    ]}
                    footer={[
                        <Button  key = "addEventCancel" onClick = {handleAddModalCancel}>
                            Cancel
                        </Button>,
                        <Button key="addEventOk" type="primary" onClick={handleAddModalOk}>
                            Submit  
                        </Button>,]}
                    >
                    {AddCOMMITTEEModal()}
                </Modal>
                <Table
                    className = {style.header}
                    columns = {columns}
                    dataSource = {tableData}
                >
                </Table>                         
            </div>
            
    )
}