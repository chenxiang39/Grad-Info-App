import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, DatePicker, Select, message} from 'antd';
import 'antd/dist/antd.less';
import { useSelector } from 'react-redux';
import {UserInfo,AccessPostNumberList} from '../../Redux/Slices/UserInfo'
import { StudentPostNumber, StudentID} from '../../Redux/Slices/StudentInfo'
import style from './DataTable.module.less'
import moment from 'moment';
import { NonCourseRelatedEventDataModel } from '../../Model/nonCourseRelatedEvent/NonCourseRelatedEventDataModel';
import {postNonCourseRelatedEventTableDataByEventObj} from '../../Api/nonCourseRelatedEvent'
import SubmitConfirm from '../../Utility/PostConfirm/SubmitConfirm/SubmitConfirm'
import AddFormModal from '../../Utility/AddFormModal/AddFormModal';
import PostNumberAccess from '../CommonFunc/PostNumberAccess'
function EventDataTable(props) {
    var {tableData, columns,eventList,mainPageShouldRefresh} = props;
    const curUserInfo = useSelector(UserInfo);
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    const accessPostNumberList = useSelector(AccessPostNumberList);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const functionDisable = PostNumberAccess(accessPostNumberList, curStudentPostNumber);
    var formatGlobal = "NONE";
    var EventListOption = [];
    for(let i = 0; i < eventList.length; i++){
        EventListOption.push(eventList[i].code + " : " + eventList[i].description);
    }
    const showAddEventModalFun = () =>{
        setIsAddModalVisible(true);
    }
    const EventAddForm = ({form}) => {
        const [format, setFormat] = useState("NONE");
        const filterAddEventOption = (input, option) =>{
            return option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
        }
        const handleCodeChange = (value) =>{
            let dataArr = value.split(":");
            let code = dataArr[0].substring(0, dataArr[0].length - 1);
            let description = dataArr[1].substring(1, dataArr[1].length);
            form.setFieldsValue({
                description : description
            })
            for(let i = 0; i < eventList.length; i++){
                if(code === eventList[i].code){
                    setFormat(eventList[i].format);
                    formatGlobal = eventList[i].format;
                    break;
                }
            }
        }
        const selectEventOption = EventListOption.map((item) => {
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
        const selectRelatedYearAndSemster = () => {
            return (
                <div>
                    <Form.Item
                        name = "relatedYear"
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please choose one year!',
                            },
                        ]}
                    >
                        <DatePicker
                            allowClear = {false}
                            placeholder = "Year"
                            style={{ width: 120 }}
                            picker="year"/>
                    </Form.Item>
                    <Form.Item
                        name = "relatedSemster"
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please choose one semster!',
                            },
                        ]}
                    >
                        <Select
                            style={{ width: 100 }}
                            placeholder="Semster"
                        >
                        {selectSemsterOption}
                        </Select>   
                    </Form.Item>   
                </div>
                
            )
        }
        const selectRelatedUnits = () => {
            return (
                <Form.Item
                    name="units"
                    rules={[
                        {
                            pattern : /^\d+(.\d{1,2})?$/,
                            message : 'You should input a number(up to two decimal places)'
                        }
                    ]}
                >
                    <Input placeholder = "Please input units" />
                </Form.Item>            
            )
        }
        const selectFreeForm = () => {
            return (
                <Form.Item
                    name="freeForm"
                    rules={[
                        {
                            type: 'string',
                            max : 20,
                            message : 'Exceed the length limit(Max length is 20)'
                        }
                    ]}
                >
                    <Input placeholder = "Please input anything"/>
                </Form.Item>            
            )
        }
        const selectRelated = () => {
            if(format === "TERM"){
                return selectRelatedYearAndSemster();
            }
            else if(format === "UNITS"){
                return selectRelatedUnits();
            }
            else{
                return selectFreeForm();
            }
        }
        return (
            <Form
                form={form}
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item 
                    name = "code"
                    label="Code : "
                    rules={[
                        {
                            required: true,
                            message: 'Please choose one code!',
                        },
                    ]}
                >
                    <Select 
                        placeholder = "Please choose one code"
                        showSearch
                        filterOption = {filterAddEventOption}
                        onChange = {handleCodeChange}
                    >
                        {selectEventOption}
                    </Select>
                </Form.Item>
                <Form.Item 
                    name = "description"
                    label = "Description : "
                >
                    <Input 
                        readOnly = {true}
                    />
                 </Form.Item>
                 <Form.Item style = {{marginBottom:0}} label="Related : ">
                    {selectRelated()}
                </Form.Item>
                <Form.Item 
                    name = "date"
                    label = "Date"
                    style = {{marginBottom:0}}
                    rules={[
                        {
                            required: true,
                            message: 'Please choose one date!',
                        },
                    ]}
                >
                <DatePicker 
                    allowClear = {false}
                />
                </Form.Item>
            </Form>
        )
    }
    const submitEventAddFormFun = (values, form) => {
        let curRelated = "";
        if(formatGlobal === "TERM"){
            curRelated = `${moment(values.relatedYear).format("YYYY")}${values.relatedSemster}`;
        }
        else if(formatGlobal === "UNITS"){
            curRelated = values.units;
        }
        else{
            curRelated = values.freeForm;
        }
        let curCodeArr = values.code.split(":");
        let curCode = curCodeArr[0].substring(0, curCodeArr[0].length - 1);
        let obj = {
            code : curCode,
            description : values.description,
            related : curRelated,
            date : moment(values.date).format("MM/DD/YYYY"),
            transactiondate : moment().format("MM/DD/YYYY"),
            oper: curUserInfo.useroper
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let dataObject = NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelSubmitDataObj(obj,studentInfoObj);
        let ConfrimProps = {
            content: `One event will be added.`,
            responseDataModelFun : NonCourseRelatedEventDataModel.NonCourseRelatedEventDataModelResponseDataObj,
            requestBody : dataObject,
            fetchDataFun: postNonCourseRelatedEventTableDataByEventObj,
            mainPageShouldRefresh,
            formDisapperFun : () => cancelEventFormFun(form)
        }
        SubmitConfirm({...ConfrimProps});
    }
    const cancelEventFormFun = (form) => {
        setIsAddModalVisible(false);
        form.resetFields();
    }
    return (
        <div>
            <Button
                disabled = {functionDisable}
                onClick={() => showAddEventModalFun()}
                className={[style.button, style.topButton]}
                >
                ADD EVENT
            </Button>
            <AddFormModal
                key = "ADD EVENT"
                title = "ADD EVENT"
                visible = {isAddModalVisible}
                onOk = {submitEventAddFormFun}
                onCancel = {cancelEventFormFun}
                AddFormComponent = {EventAddForm}
            ></AddFormModal>
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