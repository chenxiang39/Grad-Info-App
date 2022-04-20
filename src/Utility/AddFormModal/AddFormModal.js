import React from 'react'
import { Button, Modal, Form, message} from 'antd';
import 'antd/dist/antd.less';
import style from './AddFormModal.module.less'
const AddFormModal = ({title, visible, onOk, onCancel, AddFormComponent}) => {
    const [FormInstance] = Form.useForm();
    const onOkFun = () => {
        FormInstance.validateFields().then((values) => {
            onOk(values, FormInstance);
        }).catch((info) =>{
            let messageArr = info.errorFields;
            for (let i = 0; i < messageArr.length; i++){
                let validateMessage = `Your ${messageArr[i].name[0]} is unvalid.`;
                message.error(validateMessage,1);
            }
        })
    }
    return (
        <Modal
            key = {title + "Modal"}
            centered
            visible = {visible} 
            onCancel = {() => onCancel(FormInstance)}
            onOk = {onOkFun}
            maskClosable = {false}
            title = {[
                <div key = {title + "Title"} className = {style.modalTitle} >{title}</div>
            ]}
            footer={[
                <Button key = {title + "Cancel"} onClick = {() => onCancel(FormInstance)}>
                    Cancel
                </Button>,
                <Button key = {title + "Submit"} type="primary" onClick={onOkFun}>
                    Submit  
                </Button>,]}
        >
            <AddFormComponent
                key = {title + "Form"}
                form = {FormInstance}
            ></AddFormComponent>
        </Modal>
    )
}

export default React.memo(AddFormModal);