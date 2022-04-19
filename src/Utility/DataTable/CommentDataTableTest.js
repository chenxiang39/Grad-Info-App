import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, message} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import { useSelector } from 'react-redux';
import {AccessPostNumberList} from '../../Redux/Slices/UserInfo'
import {StudentID,StudentPostNumber} from '../../Redux/Slices/StudentInfo'
import {postCommentTableDataByCommentObj} from '../../Api/comment'
import SubmitConfirm from '../PostConfirm/SubmitConfirm/SubmitConfirm'
import {CommentDataModel} from '../../Model/comment/CommentDataModel'
import PostNumberAccess from '../CommonFunc/PostNumberAccess'
import moment from 'moment';
import AddFormModal from '../AddFormModal/AddFormModal';
const { TextArea } = Input;
function CommentDataTable(props) {
    var {tableData, columns, mainPageShouldRefresh} = props;
    const curStudentPostNumber = useSelector(StudentPostNumber);
    const curStudentID = useSelector(StudentID);
    const accessPostNumberList = useSelector(AccessPostNumberList);
    const functionDisable = PostNumberAccess(accessPostNumberList, curStudentPostNumber);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
    const [checkComment, setCheckComment] = useState("");
    const showAddCommentModalFun = () =>{
        setIsAddModalVisible(true);
    }
    const submitCommentAddFormFun = (value) =>{
        
    }
    const cancelCommentAddFormFun = () =>{
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
    const CommentAddForm = ({form}) =>{
        return (
            <Form
                form = {form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item
                    name = "comment"
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
                        maskClosable = {false}
                    ></TextArea>  
                </Form.Item>
                
          </Form>
        )
    }
    addCommentsColumn();
    const submitAddCommentFun = () => {

    }
    const cancelAddCommentFun = (form) => {
        setIsAddModalVisible(false);
        form.resetFields();
    }
    return (
            <div>
                <Button
                    disabled = {functionDisable}
                    onClick={() => showAddCommentModalFun()}
                    className={[style.button, style.topButton]}
                    >
                    ADD COMMENT
                </Button>
                <AddFormModal
                    title = "ADD COMMENT"
                    visible = {isAddModalVisible}
                    onOk = {submitAddCommentFun}
                    onCancel = {cancelAddCommentFun}
                    AddFormComponent = {CommentAddForm}
                >
                </AddFormModal>
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



