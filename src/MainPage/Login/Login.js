import React from 'react'
import 'antd/dist/antd.less';
import { Form, Input, Button, Checkbox,message} from 'antd';
import {getUserInfoByUsernameAndPassword} from '../../Api/login'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {UserInfoDataModel} from '../../Model/userInfo/UserInfoDataModel';
import {SaveUserInfo} from '../../Redux/Slices/UserInfo'
import style from './Login.module.less';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchUserInfo = (values) => {
        getUserInfoByUsernameAndPassword(values.username,values.password).then((res)=>{
            let userInfo = UserInfoDataModel.UserInfoDataModelObj(res);
            if(!userInfo.username){
                message.error("Username or Password is wrong!", 1);
                return;
            }
            else{
                dispatch(SaveUserInfo(userInfo));
                navigate("/Search",{replace : true});
            }
        },(err)=>{
            console.log(err);
        });
    }
    const onFinish = async (values) => {
        fetchUserInfo(values);
    };
    
    return (
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
      );
}
