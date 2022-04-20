import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, Select, message} from 'antd';
import { FileTextOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less';
import { useSelector } from 'react-redux';
import {AccessPostNumberList} from '../../Redux/Slices/UserInfo'
import SubmitConfirm from '../PostConfirm/SubmitConfirm/SubmitConfirm';
import {postThesisCommitteeTableDataByCommitteeObj} from '../../Api/nonCourseRelatedEvent'
import {StudentID,StudentPostNumber} from '../../Redux/Slices/StudentInfo'
import {CommitteeDataModel} from '../../Model/nonCourseRelatedEvent/CommitteeDataModel'
import FilterSamePersonInCommitteeTable from '../../Utility/CommonFunc/FilterSamePersonInCommitteeTable'
import AddFormModal from '../../Utility/AddFormModal/AddFormModal';
import PostNumberAccess from '../CommonFunc/PostNumberAccess'
function ThesisCommitteeDataTable(props) {
    var {tableData, columns,committee,mainPageShouldRefresh} = props;
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    const accessPostNumberList = useSelector(AccessPostNumberList);
    const functionDisable = PostNumberAccess(accessPostNumberList, curStudentPostNumber);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const showAddCommitteeModalFun = () =>{
        setIsAddModalVisible(true);
    }
    const CommitteeAddForm = ({form}) => {
        const filterCommitteeNameOption = (input, option) =>{
            return option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
        }
        const selectCommitteeOptionSelect = committee.map((item) => {
            return (
                <Select.Option key = {item} value = {item}>{item}</Select.Option>
            )
        })
        let char = ["CHAIR","CO-CHAIR","MEMBER"];
        const selectCharOption = char.map((item) => {
            return (
                <Select.Option key = {item + "char"} value = {item}>{item}</Select.Option>
            )
        });
        return (
            <Form
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item 
                    name = "name"
                    label = "Name : "
                    rules={[
                        {
                            required: true,
                            message: 'Please choose one committee!',
                        },
                        () => ({
                            validator(_, value) {
                              if (!FilterSamePersonInCommitteeTable(tableData,value)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Same person should not be added again!'));
                            },
                        }),
                    ]}
                >
                <Select 
                    showSearch
                    filterOption = {filterCommitteeNameOption}
                >
                    {selectCommitteeOptionSelect}
                </Select>
                </Form.Item>
                <Form.Item 
                    name = "role"
                    label = "Role : "
                    rules={[
                        {
                            required: true,
                            message: 'Please choose one role!',
                        },
                    ]}
                >
                    <Select
                        style={{ width: 130 }}
                    >
                        {selectCharOption}
                    </Select>
                </Form.Item>
            </Form>
        )
    }
    const submitAddCommitteeFun = (values, form) =>{
        let obj = {
            committeeName: values.name,
            committeeChar: values.role,
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let dataObject = CommitteeDataModel.thesisCommitteeDataModelSubmitObj(obj,studentInfoObj)
        let ConfrimProps = {
            content: `One committee will be added.`,
            responseDataModelFun : CommitteeDataModel.committeeDataModelResponseObj,
            requestBody : dataObject,
            fetchDataFun: postThesisCommitteeTableDataByCommitteeObj,
            mainPageShouldRefresh,
            formDisapperFun : () => cancelAddCommitteeFun (form)
        }
        console.log(dataObject);
        SubmitConfirm({...ConfrimProps});
    }
    const cancelAddCommitteeFun = (form) =>{
        setIsAddModalVisible(false);
        form.resetFields();
    }
    return (
            <div>
                <div className = {style.tableTitle}>Thesis/Dissertation Committee</div>
                <Button
                    disabled = {functionDisable}
                    onClick={() => showAddCommitteeModalFun()}
                    className={[style.button, style.topButton]}
                    >
                    ADD COMMITTEE
                </Button>
                <AddFormModal
                    key = "ADD THESIS COMMITTEE"
                    title = "ADD COMMITTEE"
                    visible = {isAddModalVisible}
                    onOk = {submitAddCommitteeFun}
                    onCancel = {cancelAddCommitteeFun}
                    AddFormComponent = {CommitteeAddForm}
                >
                </AddFormModal>
                <Table
                    className = {style.header}
                    columns = {columns}
                    dataSource = {tableData}
                >
                </Table>                         
            </div>
            
    )
}

export default React.memo(ThesisCommitteeDataTable)