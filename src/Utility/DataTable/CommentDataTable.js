import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './DataTable.module.less'
import {CommentDataModel} from '../../Model/comment/CommentDataModel'
import moment from 'moment';
const { TextArea } = Input;
export default function CommentDataTable(props) {
    var {tableData, columns, tableDataLoading} = props;
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
            alert("You must add Comment!");
            return;
        }
        let realObj = CommentDataModel.CommentDataModelObj(obj);
        console.log(realObj);
        //save 
        clearState();
        setisAddModalVisible(false);
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
                    loading = {tableDataLoading}
                >
                </Table>                         
            </div>
            
    )
}



