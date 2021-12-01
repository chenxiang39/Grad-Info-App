import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, DatePicker, Select} from 'antd';
import 'antd/dist/antd.less';
import { useSelector } from 'react-redux';
import {UserInfo} from '../../Redux/Slices/UserInfo'
import { StudentPostNumber, StudentID} from '../../Redux/Slices/StudentInfo'
import style from './DataTable.module.less'
import moment from 'moment';
import { NonCourseRelatedEventDataModel } from '../../Model/nonCourseRelatedEvent/NonCourseRelatedEventDataModel';
function EventDataTable(props) {
    var {tableData, columns} = props;
    const curUserInfo = useSelector(UserInfo);
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    var selectCodeOption = [];
    for(let key in props.codeDescriptionArr){
        selectCodeOption.push(key);
    }
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const [code, setCode] = useState(""); 
    const [description, setDescription] = useState("");
    const [relatedYear, setRelatedYear] = useState("");
    const [relatedSemster, setRelatedSemster] = useState("");
    const [eventDate, setEventDate] = useState("");
    const cleanState = () =>{
        setCode("");
        setDescription("");
        setEventDate("");
        setRelatedSemster("");
        setRelatedYear("");
    }
    const handleAdd = () =>{
        setisAddModalVisible(true);
    }
    const handleAddModalOk = () =>{
        let obj = {
            code : code,
            description : description,
            related : `${moment(relatedYear).format("YYYY")}${relatedSemster}`,
            date : moment(eventDate).format("MM/DD/YYYY"),
            transactiondate : moment().format("MM/DD/YYYY"),
            oper: curUserInfo.useroper
        }
        if(!code || !relatedSemster || !eventDate){
            alert("You must add all of items!");
            return;
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let a = NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelSubmitDataObj(obj,studentInfoObj);
        console.log(a);
        cleanState();
        setisAddModalVisible(false);
    }
    const handleAddModalCancel = () =>{
        cleanState();
        setisAddModalVisible(false);
    }
    const handleCodeChange = (value) =>{
        setCode(value);
        setDescription(props.codeDescriptionArr[value])
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
                <Select.Option key = {item + "semster"} value = {item}>{item}</Select.Option>
            )
        });
        return (
            <Form
                labelCol={{
                span: 5,
                }}
                wrapperCol={{
                span: 14,
                }}
                layout="horizontal"
            >
            <Form.Item label="Code">
              <Select 
                value = {code}
                onChange = {handleCodeChange}>
                {selectCodeOptionSelect}
              </Select>
            </Form.Item>
            <Form.Item label="Description">
              <Input key = {description} value = {description}></Input>
            </Form.Item>
            <Form.Item label="Related">
                <DatePicker 
                 allowClear = {false}
                 placeholder = "Year"
                 style={{ width: 120 }}
                 onChange = {(value) => setRelatedYear(moment(value).valueOf())}
                 picker="year"/>
                <Select
                    style={{ width: 100 }}
                    placeholder="Semster"
                    onChange = {(value) => setRelatedSemster(value)}
                >
                    {selectSemsterOption}
                </Select>
            </Form.Item>
            <Form.Item label="Date">
              <DatePicker 
                allowClear = {false}
                onChange={(value) => setEventDate(moment(value).valueOf())}/>
            </Form.Item>
          </Form>
        )
    }
    return (
            <div>
                <Button
                    onClick={() => handleAdd()}
                    className={[style.button, style.topButton]}
                    >
                    ADD EVENT
                </Button>
                <Modal 
                    key = "addEvent"
                    centered
                    visible={isAddModalVisible} 
                    onCancel = {handleAddModalCancel}
                    onOk = {handleAddModalOk}
                    maskClosable = {false}
                    title = {[
                        <div key = "addEventTitle" className = {style.modalTitle} >ADD EVENT</div>
                    ]}
                    footer={[
                        <Button  key = "addEventCancel" onClick = {handleAddModalCancel}>
                            Cancel
                        </Button>,
                        <Button key="addEventOk" type="primary" onClick={handleAddModalOk}>
                            Submit  
                        </Button>,]}
                    >
                    {AddModalForm()}
                </Modal>
                <Table
                    key = "EventTable"
                    className = {style.header}
                    columns = {columns}
                    dataSource = {tableData}
                >
                </Table>                         
            </div>
            
    )
}

export default React.memo(EventDataTable);