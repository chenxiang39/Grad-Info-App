import React from 'react'
import style from './StudentInfo.module.less'
import { Select } from 'antd';
import 'antd/dist/antd.less';
import { useDispatch, useSelector } from 'react-redux';
import {StudentPostNumber, StudentInfoData,SaveStudentPostNumber} from '../../../Redux/Slices/StudentInfo'
function StudentInfo(){
    let curStudentInfoData = useSelector(StudentInfoData);
    const { Option } = Select;
    const dispatch = useDispatch();
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
            </div>
        </div>
    )
}

export default StudentInfo;