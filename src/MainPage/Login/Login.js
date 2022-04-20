import React, { useState } from 'react'
import 'antd/dist/antd.less';
import { Form, Input, Button, Checkbox,Spin,message} from 'antd';
import {getEventList, getUserInfoByUsernameAndPassword, getAllSpPostNumber, getPostNumberByUserID} from '../../Api/login'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {UserInfoDataModel} from '../../Model/userInfo/UserInfoDataModel';
import {SaveAccessPostNumberList, SaveEventList, SaveUserInfo} from '../../Redux/Slices/UserInfo'
import style from './Login.module.less';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = (values) => {
        setLoading(true);
        getUserInfoByUsernameAndPassword(values.username,values.password).then((UserInfoRes) => {
            let userInfo = UserInfoDataModel.UserInfoDataModelObj(UserInfoRes);
            if(!userInfo.username){
                message.error("Username or Password is wrong!", 1);
                setLoading(false);
                return new Promise((resolve, reject) => {
                    reject("validate error");
                })
            }
            else{
                dispatch(SaveUserInfo(userInfo));
                let getSpPostNumberFun = () =>{
                    if(userInfo.userSuper === "1"){
                        return getAllSpPostNumber();
                    }
                    else{
                        return getPostNumberByUserID(userInfo.userid);
                    }
                }
                return Promise.all([getEventList(),getSpPostNumberFun()]);
            }
        }).then((res) => {
            let eventList = UserInfoDataModel.EventListDataModelArr(res[0]); 
            let accessPostNumberList = UserInfoDataModel.AccessPostNumberListDataModelArr(res[1]);
            dispatch(SaveEventList(eventList));
            dispatch(SaveAccessPostNumberList(accessPostNumberList));
            navigate("/Search",{replace : true});
        }).catch(error => {
            setLoading(false);
            if(error !== 'validate error'){
                message.error( `Network is broken !`, 1);
            }
        })
    }
    return (
        <Spin className = {style.spinContainer} size = "large" spinning = {loading}>
            <Form
            name="normal_login"
            className = {style.loginform}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={
                        <UserOutlined className={style.siteformitemicon}/>
                    } placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>    
                </Form.Item>
        
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </Spin>
      );
}
