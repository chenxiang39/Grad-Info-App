import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, DatePicker, Select} from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import moment from 'moment';
import { NonCourseRelatedEventDataModel } from '../../Model/NonCourseRelatedEventDataModel';
export default function EventDataTable(props) {
    var {tableData, columns} = props;
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
            oper:"VS5"
        }
        if(!code || !relatedSemster || !eventDate){
            alert("You must add all of items!");
            return;
        }
        console.log(NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelObj(obj));
        setisAddModalVisible(false);
    }
    const handleCodeChange = (value) =>{
        setCode(value);
        setDescription(props.codeDescriptionArr[value])
    }
    const handleAddModalCancel = () =>{
        setCode("");
        setDescription("");
        setEventDate("");
        setRelatedSemster("");
        setRelatedYear("");
        setisAddModalVisible(false);
    }
    const handleRelatedSemster = (value) =>{
        setRelatedSemster(value);
    }
    const handleRelatedYear = (value) => {
        setRelatedYear(moment(value).valueOf())
    }
    const handleDate = (value) =>{
        setEventDate(moment(value).valueOf());
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
                span: 4,
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



