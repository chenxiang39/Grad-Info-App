import React,{useState, useEffect} from 'react'
import { Input, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './Search.module.less';
import { useDispatch } from 'react-redux';
import {SaveStudentID} from '../../Redux/Slices/StudentInfo'
import { useNavigate } from "react-router-dom";
export default function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [curSearchStudentID, setcurSearchStudentID] = useState("");
    const changeStudentID = (e) =>{
        setcurSearchStudentID(e.target.value);
    }
    useEffect(() => {
        dispatch(SaveStudentID(""));
      },[]);
      
    const submit = () =>{
        if(!curSearchStudentID){
            alert("You must input USC ID!");
            return;
        }
      
        //success
        dispatch(SaveStudentID(curSearchStudentID));
        navigate("/MainContent");
    }
    return (
        <div className = {style.container}>
            USC ID : &nbsp;&nbsp;&nbsp;
            <Input
                style = {{width:250}}
                className = {style.input}
                value = {curSearchStudentID}
                onChange = {changeStudentID}
            ></Input>
            <Button
                className = {style.button}
                onClick = {submit}
                icon = {<SearchOutlined />}
                size = "large"
            ></Button>
        </div>
    )
}
