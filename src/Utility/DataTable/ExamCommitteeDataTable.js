import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, Select, message} from 'antd';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import { useSelector } from 'react-redux';
import {StudentID,StudentPostNumber} from '../../Redux/Slices/StudentInfo'
import SubmitConfirm from '../PostConfirm/SubmitConfirm/SubmitConfirm';
import {postExamCommitteeTableDataByCommitteeObj} from '../../Api/nonCourseRelatedEvent'
import {CommitteeDataModel} from '../../Model/nonCourseRelatedEvent/CommitteeDataModel'
import FilterSamePersonInCommitteeTable from '../CommonFunc/FilterSamePersonInCommitteeTable';
function ExamCommitteeDataTable(props) {
    var {tableData, columns,committee,mainPageShouldRefresh} = props;
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const [curCommitteeName, setcurCommitteeName] = useState("");
    const [curCommitteeChar, setcurCommitteeChar] = useState("");
    const cleanState = () =>{
        setcurCommitteeName("");
        setcurCommitteeChar("");
    }
    const handleAdd = () =>{
        setisAddModalVisible(true);
    }
    const handleAddModalOk = () =>{
        let obj = {
            committeeName: curCommitteeName,
            committeeChar: curCommitteeChar,
        }
        if(!curCommitteeName || !curCommitteeChar){
            message.warning("You must add all of items!",1);
            return;
        }
        if(FilterSamePersonInCommitteeTable(tableData,curCommitteeName)){
            message.warning("Same person should not be added again!",1); 
            return;
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let dataObject = CommitteeDataModel.examCommitteeDataModelSubmitObj(obj,studentInfoObj)
        let ConfrimProps = {
            content: `One committee will be added.`,
            responseDataModelFun : CommitteeDataModel.committeeDataModelResponseObj,
            requestBody : dataObject,
            fetchDataFun: postExamCommitteeTableDataByCommitteeObj,
            mainPageShouldRefresh,
            formDisapperFun : handleAddModalCancel
        }
        SubmitConfirm({...ConfrimProps});
    }
    const handleAddModalCancel = () =>{
        cleanState();
        setisAddModalVisible(false);
    }
    const changeCommitteeName = (value) =>{
        setcurCommitteeName(value);
    }
    const changeCommitteeChar = (value) =>{
        setcurCommitteeChar(value);
    }
    const filterCommitteeNameOption = (input, option) =>{
        return option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
    }
    const selectCommitteeOptionSelect = committee.map((item) => {
        return (
            <Select.Option key = {item} value = {item}>{item}</Select.Option>
        )
    })
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
                <Select 
                    showSearch
                    value = {curCommitteeName}
                    filterOption = {filterCommitteeNameOption}
                    onChange = {changeCommitteeName}>
                    {selectCommitteeOptionSelect}
                </Select>
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
                    maskClosable = {false}
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

export default React.memo(ExamCommitteeDataTable)