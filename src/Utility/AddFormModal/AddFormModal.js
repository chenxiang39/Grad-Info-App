import React, { useState } from 'react'
import { Table, Input, Button, Modal, Form, message} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './AddFormModal.module.less'
const AddFormModal = ({title, visible, onOk, onCancel, AddFormComponent}) => {
    const [FormInstance] = Form.useForm();
    const onOkFun = () => {
        FormInstance.validateFields().then((values) => {
            onOk(values, FormInstance);
        }).catch((info) =>{
            message.warn(`Validate : Something is unvalid ! `,1)
        })
    }
    return (
        <Modal
            centered
            visible = {visible} 
            onCancel = {() => onCancel(FormInstance)}
            onOk = {onOkFun}
            maskClosable = {false}
            title = {[
                <div className = {style.modalTitle} >{title}</div>
            ]}
            footer={[
                <Button onClick = {() => onCancel(FormInstance)}>
                    Cancel
                </Button>,
                <Button type="primary" onClick={onOkFun}>
                    Submit  
                </Button>,]}
        >
            <AddFormComponent
                form = {FormInstance}
            ></AddFormComponent>
        </Modal>
    )
}

export default React.memo(AddFormModal);