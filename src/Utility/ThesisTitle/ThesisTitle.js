import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.less';
import { Table, Input, Button, Modal, Form, message} from 'antd';
import { FileTextOutlined,FormOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {AccessPostNumberList} from '../../Redux/Slices/UserInfo'
import {StudentID,StudentPostNumber} from '../../Redux/Slices/StudentInfo'
import { postPaperTitleByPaperTitleObj } from '../../Api/nonCourseRelatedEvent'
import { StudentPostDataModel} from '../../Model/studentInfo/StudentPostDataModel'
import SubmitConfirm from '../../Utility/PostConfirm/SubmitConfirm/SubmitConfirm'
import PostNumberAccess from '../CommonFunc/PostNumberAccess'
import style from './ThesisTitle.module.less'
const { TextArea } = Input;
function ThesisTitle(props) {
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    const {studentPostData, mainPageShouldRefresh} = props;
    const paperTitle = studentPostData.ThesisTitle;
    const accessPostNumberList = useSelector(AccessPostNumberList);
    const functionDisable = PostNumberAccess(accessPostNumberList, curStudentPostNumber);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isShowModalVisible,setIsShowModalVisible] = useState(false);
    const [curPaperTitle, setCurPaperTitle] = useState("");
    const handleCancel = () => {
        setIsEditModalVisible(false);
        setIsShowModalVisible(false);
        setCurPaperTitle("");
    }
    const openEditModal = () => {
        setIsEditModalVisible(true);
    }
    const openShowModal = () => {
        setIsShowModalVisible(true);
    }
    const showButton = () => {
        if(paperTitle === ""){
            return (
                <Button
                    disabled = {functionDisable}
                    key = "edit"
                    className = {style.button}
                    onClick = {() => openEditModal()}
                    shape="circle"
                    size = "large"
                    icon = {<FormOutlined />}
                >
                </Button>
            )
        }
        else{
            return (
                <Button
                    key = "show"
                    className = {style.button}
                    onClick = {() => openShowModal()}
                    shape="circle"
                    size = "large"
                    icon = {<FileTextOutlined />}
                >
                </Button>
            )
        }
    }
    const showModal = () => {
        return (
            <Modal 
                key = "showPaperTitleModal"
                centered
                visible={isShowModalVisible} 
                onCancel = {handleCancel}
                onOk = {handleCancel}
                maskClosable = {false}
                title = {[
                    <div key = "showEditThesisTitleHeader" className = {style.modalTitle} >Thesis Title</div>
                ]}
                footer={
                    <Button key="cancelPaperTitleBtn" type="primary" onClick={handleCancel}>
                        OK  
                    </Button>}
                >
               {paperTitle}
           </Modal>
        )
    }
    const editModal = () => {
        return (
            <Modal 
                key = "addPaperTitleModal"
                centered          
                visible={isEditModalVisible} 
                onCancel = {handleCancel}
                maskClosable = {false}
                title = {
                    <div key = "showAddThesisTitleHeader"  className = {style.modalTitle} >ADD THESIS TITLE</div>
                }
                footer={[
                    <Button key="cancelbtn" onClick = {handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submitbtn" type="primary" onClick={submitPaperTitle}>
                        Submit  
                    </Button>]}
                >
                <TextArea
                    key = "textArea"
                    maxLength = {1000}
                    autoSize = {
                        {
                            minRows : 0,
                            maxRows : 16
                        }
                    }
                    className = {style.textArea}
                    value = {curPaperTitle}
                    maskClosable = {false}
                    onChange = {(e) => setCurPaperTitle(e.target.value)}
                ></TextArea>  
            </Modal>
        )
    }
    const submitPaperTitle = () => {
        let obj = {
            ThesisTitle : curPaperTitle
        }
        if(!curPaperTitle){
            message.warning("Thesis title can not be empty!",1);
            return;
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let dataObject = StudentPostDataModel.StudentPostDataModelPaperTitleSubmitDataObj(obj,studentInfoObj);
        let ConfrimProps = {
            content: `Thesis title will be added.`,
            responseDataModelFun : StudentPostDataModel.StudentPostDataModelPaperTitleResponceDataObj,
            requestBody : dataObject,
            fetchDataFun: postPaperTitleByPaperTitleObj,
            mainPageShouldRefresh,
            formDisapperFun : handleCancel
        }
        SubmitConfirm({...ConfrimProps});
    }
    return (
        <div className = {style.container}>
            <div className = {style.title}>Thesis Title : </div>
            {showButton()}
            {editModal()}
            {showModal()}
        </div>
    )
}

export default React.memo(ThesisTitle)
