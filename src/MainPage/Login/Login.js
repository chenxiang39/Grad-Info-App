import React, { useState } from 'react'
import 'antd/dist/antd.less';
import { Form, Input, Button, Checkbox,Spin,message} from 'antd';
import {getCodeAndDescription, getUserInfoByUsernameAndPassword} from '../../Api/login'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {UserInfoDataModel} from '../../Model/userInfo/UserInfoDataModel';
import {SaveCodeAndDescription, SaveUserInfo} from '../../Redux/Slices/UserInfo'
import style from './Login.module.less';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try{
            setLoading(true);
            let UserInfoRes = await getUserInfoByUsernameAndPassword(values.username,values.password);
            let CodeAndDescriptionRes = await getCodeAndDescription();
            let userInfo = UserInfoDataModel.UserInfoDataModelObj(UserInfoRes);
            let codeAndDescription = UserInfoDataModel.CodeAndDescriptionDataModelArr(CodeAndDescriptionRes);
            if(!userInfo.username){
                message.error("Username or Password is wrong!", 1);
                setLoading(false);
            }
            else{
                dispatch(SaveUserInfo(userInfo));
                dispatch(SaveCodeAndDescription(codeAndDescription));
                navigate("/Search",{replace : true});
            }
        }catch(err){
            setLoading(false);
            message.error("Network is broken !", 1);
        }
        
    };
    
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
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
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
