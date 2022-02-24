import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, message} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import { useSelector } from 'react-redux';
import {StudentID,StudentPostNumber} from '../../Redux/Slices/StudentInfo'
import {postCommentTableDataByCommentObj} from '../../Api/comment'
import SubmitConfirm from '../PostConfirm/SubmitConfirm/SubmitConfirm';
import {CommentDataModel} from '../../Model/comment/CommentDataModel'
import moment from 'moment';
const { TextArea } = Input;
function CommentDataTable(props) {
    var {tableData, columns, mainPageShouldRefresh} = props;
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
    const [curComment, setcurComment] = useState("");
    const [checkComment, setCheckComment] = useState("");
    const clearState = () => {
        setcurComment("");
    }
    const handleAdd = () =>{
        setisAddModalVisible(true);
    }
    const handleAddModalOk = () =>{
        let obj = {
            content : curComment,
            transactiondate : moment().format("MM/DD/YYYY"),
            oper:"VS5"
        }
        if(!curComment){
            message.warning("You must add Comment!",1);
            return;
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let dataObject = CommentDataModel.CommentDataModelSubmitDataObj(obj,studentInfoObj);
        let ConfrimProps = {
            content: `One comment will be added.`,
            responseDataModelFun : CommentDataModel.CommentDataModelResponseObj,
            requestBody : dataObject,
            fetchDataFun: postCommentTableDataByCommentObj,
            mainPageShouldRefresh,
            formDisapperFun : handleAddModalCancel
        }
        SubmitConfirm({...ConfrimProps});
    }
    const handleAddModalCancel = () =>{
        clearState();
        setisAddModalVisible(false);
    }
    const clickCommentBtn = (comment) => {
        setCheckComment(comment);
        setIsCommentsModalVisible(true);
    }
    const addCommentsColumn = () =>{
        columns = columns.map((item) => {
            let commentsContent = {
                render: comment => {
                    if(!!comment){
                        return (
                            <Button
                                className = {style.commentButton}
                                key = {item}
                                onClick = {() => clickCommentBtn(comment)}
                                shape="circle"
                                size = "large"
                                icon = {<FileTextOutlined />}
                            >
                            </Button>
                        )
                    }
                }
            }
            if(item.dataIndex === "content"){
                return {...item,...commentsContent};
            }
            else{
                return item;
            }
        })
    }
    const handleCommentModalCancel = () =>{
        setIsCommentsModalVisible(false);
    }
    const AddCommentModal = () =>{
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
              <TextArea
                    maxLength = {1000}
                    autoSize = {
                        {
                            minRows : 0,
                            maxRows : 16
                        }
                    }
                    className = {style.textArea}
                    value = {curComment}
                    maskClosable = {false}
                    onChange = {(e) => setcurComment(e.target.value)}
                ></TextArea>  
          </Form>
        )
    }
    addCommentsColumn();
    return (
            <div>
                <Button
                    onClick={() => handleAdd()}
                    className={[style.button, style.topButton]}
                    >
                    ADD COMMENT
                </Button>
                <Modal 
                    key = "addEvent"
                    centered          
                    visible={isAddModalVisible} 
                    onCancel = {handleAddModalCancel}
                    onOk = {handleAddModalOk}
                    maskClosable = {false}
                    title = {[
                        <div key = "addEventTitle" className = {style.modalTitle} >ADD COMMENT</div>
                    ]}
                    footer={[
                        <Button  key = "addEventCancel" onClick = {handleAddModalCancel}>
                            Cancel
                        </Button>,
                        <Button key="addEventOk" type="primary" onClick={handleAddModalOk}>
                            Submit  
                        </Button>,]}
                    >
                    {AddCommentModal()}
                </Modal>
                <Modal 
                    key = "showComment"
                    centered
                    visible={isCommentsModalVisible} 
                    onCancel = {handleCommentModalCancel}
                    onOk = {handleCommentModalCancel}
                    maskClosable = {false}
                    title = {[
                        <div key = "addEventTitle" className = {style.modalTitle} >COMMENT</div>
                    ]}
                    footer={[
                        <Button key="addEventOk" type="primary" onClick={handleCommentModalCancel}>
                            OK  
                        </Button>,]}
                    >
                    {checkComment}
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

export default React.memo(CommentDataTable)



