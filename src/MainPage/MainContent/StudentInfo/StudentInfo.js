import React from 'react'
import style from './StudentInfo.module.less'
import { Select } from 'antd';
import 'antd/dist/antd.less';
import  validate  from 'validate.js';
import { useDispatch } from 'react-redux';
import { SaveStudentPostNumber} from '../../../Redux/Slices/StudentInfo'
function StudentInfo(props){
    const data = props.data;
    const isEmpty = !validate.isEmpty(data);
    const { Option } = Select;
    const dispatch = useDispatch();
    function handleChange(data){
        dispatch(SaveStudentPostNumber(data));
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
                    <span className = {style.titleRed}>ID &nbsp; </span>{isEmpty? data.id : null}
                </div>
                <div className = {style.leftItemContainer}>
                    <span className = {style.titleRed}>NAME &nbsp; </span>{isEmpty? data.name: null}
                </div>
            </div>
            <div className = {style.rightcontainer}>
                <div><span className = {style.titleRed}>POST &nbsp; </span>{isEmpty ? data.POST: null}</div>
                <Select defaultValue = {isEmpty ? data.post_numbers[0] : null} style={{ width: 120 }} onChange={handleChange}>
                    {isEmpty ? createOption() : null}
                </Select>
            </div>
        </div>
    )
}

export default StudentInfo;