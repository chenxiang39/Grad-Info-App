import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, Select} from 'antd';
import { FileTextOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less';
import {CommitteeDataModel} from '../../Model/nonCourseRelatedEvent/CommitteeDataModel';
function ThesisCommitteeDataTable(props) {
    const { confirm } = Modal;
    var {tableData, columns,committee} = props;
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const [curCommitteeName, setcurCommitteeName] = useState("");
    const [curCommitteeChar, setcurCommitteeChar] = useState("");
    const [curPaperTitle, setcurPaperTitle] = useState("");
    const [isPaperTitleModalVisible, setIsPaperTitleModalVisible] = useState(false);
    const [curCheckPaperTitle, setcurCheckPaperTitle] = useState("");
    const cleanState = () =>{
        setcurCommitteeName("");
        setcurCommitteeChar("");
        setcurPaperTitle("");
    }
    const handleAdd = () =>{
        setisAddModalVisible(true);
    }
    function showConfirm(obj) {
        confirm({
          title: 'Do you want to submit? ',
          icon: <ExclamationCircleOutlined />,
          content: `Thesis/Dissertation title: ${obj.paperTitle}`,
          onOk() {
            let realObj = CommitteeDataModel.thesisCommitteeDataModelObj(obj);
            console.log(realObj);
            //save 
            cleanState();
            setisAddModalVisible(false);
          },
          onCancel() {
            
          },
        });
    }
    const handleAddModalOk = () =>{
        let obj = {
            committeeName: curCommitteeName,
            committeeChar: curCommitteeChar,
            paperTitle: curPaperTitle
        }
        if(!curCommitteeName || !curCommitteeChar || !curPaperTitle){
            alert("You must add all of items!");
            return;
        }
        showConfirm(obj);
        
    }
    const handleAddModalCancel = () =>{
        cleanState();
        setisAddModalVisible(false);
    }
    const clickPaperTitleBtn = (value) =>{
        setcurCheckPaperTitle(value);
        setIsPaperTitleModalVisible(true);
    }
    const handlePaperTitleModalOk = ()=> {
        setIsPaperTitleModalVisible(false);
    }
    const changeCommitteeChar = (value) => {
        setcurCommitteeChar(value);
    }
    const changeCommitteeName = (value) =>{
        setcurCommitteeName(value);
    }
    const filterCommitteeNameOption = (input, option) =>{
        return option.children.toLowerCase().indexOf(input.toLowerCase()) === 0
    }
    const selectCommitteeOptionSelect = committee.map((item) => {
        return (
            <Select.Option key = {item} value = {item}>{item}</Select.Option>
        )
    })
    const addPaperTitleColumn = () =>{
        columns = columns.map((item) => {
            let PaperTitlesContent = {
                render: PaperTitle => {
                    if(!!PaperTitle){
                        return (
                            <Button
                                className = {style.commentButton}
                                key = {item}
                                onClick = {() => clickPaperTitleBtn(PaperTitle)}
                                shape="circle"
                                size = "large"
                                icon = {<FileTextOutlined />}
                            >
                            </Button>
                        )
                    }
                }
            }
            if(item.dataIndex === "paperTitle"){
                return {...item,...PaperTitlesContent};
            }
            else{
                return item;
            }
        })
    }
    addPaperTitleColumn();
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
                        style={{ width: 130 }}
                        value = {curCommitteeChar}
                        onChange = {changeCommitteeChar}
                    >
                        {selectCharOption}
                    </Select>
                </Form.Item>
                <Form.Item label= "T/D Title: ">
                    <Input
                        // style={{ width: 120 }}
                        value = {curPaperTitle}
                        onChange = {(e) => setcurPaperTitle(e.target.value)}
                    ></Input>
                </Form.Item>
            </Form>
        )
    }
    return (
            <div>
                <div className = {style.tableTitle}>Thesis/Dissertation Committee</div>
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
                <Modal 
                    key = "showPaperTitle"
                    centered
                    visible={isPaperTitleModalVisible} 
                    onCancel = {handlePaperTitleModalOk}
                    onOk = {handlePaperTitleModalOk}
                    maskClosable = {false}
                    title = {[
                        <div key = "paperTitle" className = {style.modalTitle} >PAPER TITLE</div>
                    ]}
                    footer={[
                        <Button key="addEventOk" type="primary" onClick={handlePaperTitleModalOk}>
                            OK  
                        </Button>,]}
                    >
                    {curCheckPaperTitle}
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

export default React.memo(ThesisCommitteeDataTable)