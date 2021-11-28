import React from 'react'
import style from './StudentInfo.module.less'
import { Button, Select} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons'
import 'antd/dist/antd.less';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {StudentPostNumber, StudentInfoData,SaveStudentPostNumber} from '../../../Redux/Slices/StudentInfo'
function StudentInfo(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { Option } = Select;
    let curStudentInfoData = useSelector(StudentInfoData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    function handleChange(data){
        dispatch(SaveStudentPostNumber(data));
    }
    const createOption = () =>{
        return curStudentInfoData.post_numbers.map((item) =>{
            return (
                <Option key = {item} value={item}>{item}</Option>
            )
        })
    }
    const clickBackBtn = () =>{
        navigate('/Search',{ replace: true });
    }
    return (
        <div className = {style.container}>
            <div className = {style.leftcontainer}>
                <div className = {style.leftItemContainer}>
                    <span className = {style.titleRed}>ID &nbsp; </span>{curStudentInfoData.id}
                </div>
                <div className = {style.leftItemContainer}>
                    <span className = {style.titleRed}>NAME &nbsp; </span>{curStudentInfoData.name}
                </div>
            </div>
            <div className = {style.rightcontainer}>
                <div><span className = {style.titleRed}>POST &nbsp; </span>{curStudentInfoData.POST}</div>
                <Select defaultValue = {curStudentPostNumber} style={{ width: 120 }} onChange={handleChange}>
                    {createOption()}
                </Select>
                <Button 
                    className = {style.backButton}
                    key = "backBtn"
                    onClick = {clickBackBtn}
                    shape="circle"
                    icon = {<ArrowLeftOutlined />}
                ></Button>
            </div>
        </div>
    )
}

export default StudentInfo;