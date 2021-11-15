import React from 'react'
import style from './StudentInfo.module.less'
import { Select } from 'antd';
import 'antd/dist/antd.less';
function StudentInfo(props){
    const data = props.data;
    const { Option } = Select;
    function handleChange(data){
        alert(data);
    }
    const createOption = () =>{
        return data.post_numbers.map((item) =>{
            return (
                <Option key = {item} value={item}>{item}</Option>
            )
        })
    }
    return (
        <div className = {style.container}>
            <div className = {style.leftcontainer}>
                <div className = {style.leftItemContainer}>
                    <span className = {style.titleRed}>ID &nbsp; </span>{data.id}
                </div>
                <div className = {style.leftItemContainer}>
                    <span className = {style.titleRed}>NAME &nbsp; </span>{data.name}
                </div>
            </div>
            <div className = {style.rightcontainer}>
                <div><span className = {style.titleRed}>POST &nbsp; </span>{data.POST}</div>
                <Select defaultValue = {data.post_numbers[0]} style={{ width: 120 }} onChange={handleChange}>
                    {createOption()}
                </Select>
            </div>
        </div>
    )
}

export default StudentInfo;