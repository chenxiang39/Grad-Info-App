import React, { useState } from 'react'
import { Table, Input, Button, Form, Select} from 'antd';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import SubmitConfirm from '../../Utility/PostConfirm/SubmitConfirm/SubmitConfirm'
import { useSelector } from 'react-redux';
import {UserInfo,AccessPostNumberList} from '../../Redux/Slices/UserInfo'
import { StudentPostNumber, StudentID} from '../../Redux/Slices/StudentInfo'
import { StarsExceptionDataModel } from '../../Model/starsException/StarsExceptionDataModel';
import {postStarExceptionByStarsObj} from '../../Api/starsException'
import PostNumberAccess from '../CommonFunc/PostNumberAccess'
import AddFormModal from '../AddFormModal/AddFormModal';
import moment from 'moment';
function StarExceptionDataTable(props) {
    var {StarsExceptionTableData, columns, mainPageShouldRefresh} = props;
    const curUserInfo = useSelector(UserInfo);
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    const accessPostNumberList = useSelector(AccessPostNumberList);
    const functionDisable = PostNumberAccess(accessPostNumberList, curStudentPostNumber);
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const showAddExceptionModalFun = () =>{
        setisAddModalVisible(true);
    }
    const ExceptionAddForm = ({form}) => {
        let char = ["RA","RE","UW","CW"];
        const selectCharOption = char.map((item) => {
            return (
                <Select.Option key = {item + "char"} value = {item}>{item}</Select.Option>
            )
        });
        const RnameInput = () => {
            return (
                <Form.Item name = "rname" label= "Rname: ">
                    <Input/>
                </Form.Item>
            )
        }
        const PsNameInput = () => {
            return (
                <Form.Item name = "psname" label= "PsName: ">
                    <Input/>
                </Form.Item>
            )
        }
        const ReqhrsInput = () => {
            return (
                <Form.Item 
                    name = "reqhrs" 
                    label= "Reqhrs: "
                    rules={[
                        {
                            pattern : /^-(([0-9]){4})$/,
                            message : "Reqhrs should be a negative sign followed by 4 numbers",
                            warningOnly : true
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
            )
        }
        const ReqctInput = () => {
            return (
                <Form.Item 
                    name = "reqct" 
                    label= "Reqct: "
                    rules={[
                        {
                            type : 'enum',
                            enum : ['-1'],
                            message : 'Reqct should always be ‘-1’',
                            warningOnly : true
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
            )
        }
        const CourseInput = () => {
            return (
                <Form.Item 
                    name = "course" 
                    label= "Course: " 
                    rules={[
                        {
                            pattern : /^[A-Za-z\s]{4,4}[0-9]/,
                            message : 'Course should be 4 alphabetical characters or spaces followed by numbers, like AAAA101',
                            warningOnly : true
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
            )
        }
        const RcourseInput = () => {
            return (
                <Form.Item name = "rcourse" label= "Rcourse: ">
                    <Input/>
                </Form.Item>
            )
        }
        const DeptRepInput = () => {
            return (
                <Form.Item name = "deptRep" label= "Dept/Rep: ">
                    <Input/>
                </Form.Item>
            )
        }
        const DeptInput = () => {
            return (
                <Form.Item name = "dept" label= "Dept: ">
                    <Input/>
                </Form.Item>
            )
        }
        return (
            <Form
                form = {form}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item 
                    initialValue = "RA"
                    name = "type"
                    label = "Exception type: "
                >
                    <Select
                        style={{ width: 100 }}
                    >
                        {selectCharOption}
                    </Select>
                </Form.Item>
                <RnameInput />
                <PsNameInput />
                <Form.Item
                    noStyle
                    shouldUpdate = {(prevValues, currentValues) => prevValues.type !== currentValues.type}
                >
                    {({getFieldValue}) => {
                        return getFieldValue('type') === 'UW' ? <ReqhrsInput /> : null
                    }
                }
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate = {(prevValues, currentValues) => prevValues.type !== currentValues.type}
                >
                    {({getFieldValue}) => 
                    getFieldValue('type') === 'CW' ? <ReqctInput/> : null
                }
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate = {(prevValues, currentValues) => prevValues.type !== currentValues.type}
                >
                    {({getFieldValue}) => 
                    getFieldValue('type') === 'RA' || getFieldValue('type') === 'RE' || getFieldValue('type') === 'CW' ? <CourseInput /> : null
                }
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate = {(prevValues, currentValues) => prevValues.type !== currentValues.type}
                >
                    {({getFieldValue}) => 
                    getFieldValue('type') === 'RE' ? <RcourseInput /> : null
                }
                </Form.Item>
                <DeptRepInput />
                <DeptInput />
            </Form>
        )
    }
    const submitAddExceptionFun = (value, form) =>{
        let obj = {
            cd : !!value.type ? value.type : "",
            rname : !!value.rname ? value.rname : "",
            psname : !!value.psname ? value.psname : "",
            reqct : !!value.reqct ? value.reqct : "",
            reqhrs : !!value.reqhrs ? value.reqhrs : "",
            deptrep : !!value.deptRep ? value.deptRep : "",
            dept : !!value.dept ? value.dept : "",
            oper : curUserInfo.useroper,
            transdate: moment().format("MM/DD/YYYY"),
            course : !!value.course ? value.course : "",
            rcourse : !!value.rcourse ? value.rcourse : ""
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let dataObject = StarsExceptionDataModel.StarsExceptionDataModelSubmitDataObj(obj,studentInfoObj);
        let ConfrimProps = {
            content: `One Stars Exception will be submitted.`,
            responseDataModelFun : StarsExceptionDataModel.StarsExceptionDataModelResponseObj,
            requestBody : dataObject,
            fetchDataFun: postStarExceptionByStarsObj,
            mainPageShouldRefresh,
            formDisapperFun : () => cancelAddExceptionFun(form)
        }
        SubmitConfirm({...ConfrimProps});
    }
    const cancelAddExceptionFun = (form) =>{
        setisAddModalVisible(false);
        form.resetFields();
    }
    return (
            <div>
                <Button
                    disabled = {functionDisable}
                    onClick={() => showAddExceptionModalFun()}
                    className={[style.button, style.topButton]}
                    >
                    ADD EXCEPTION
                </Button>
                <AddFormModal
                    key = "ADD EXCEPTION"
                    title = "ADD EXCEPTION"
                    visible = {isAddModalVisible}
                    onOk = {submitAddExceptionFun}
                    onCancel = {cancelAddExceptionFun}
                    AddFormComponent = {ExceptionAddForm}
                >
                </AddFormModal>
                <Table
                    className = {style.header}
                    columns = {columns}
                    dataSource = {StarsExceptionTableData}
                >
                </Table>                         
            </div>
            
    )
}

export default React.memo(StarExceptionDataTable);