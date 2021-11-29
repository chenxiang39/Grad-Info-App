import React from 'react';
import 'antd/dist/antd.less';
import { Modal, message} from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
const { confirm } = Modal;
export default function SubmitConfirm(props){
    const {content,responseDataModelFun,requestBody,fetchDataFun, mainPageShouldRefresh} = props;
    confirm({
        centered : true,
        title: "Do you want to submit ?",
        icon: <ExclamationCircleOutlined />,
        content: content,
        async onOk() {
            try{
                let APIData = await fetchDataFun(requestBody);
                let realData = responseDataModelFun(APIData);
                if(realData.flag === false){
                    message.error(`Submit failed ! The reason is `);
                }
                else{
                    message.success("Submit success !");
                    mainPageShouldRefresh(state => !state);
                }
            }catch(error){
                message.error("Network is broken !")
            }
        },
        onCancel() {

        },
    });  
}
    