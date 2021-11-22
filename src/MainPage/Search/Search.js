import React,{useState, useEffect} from 'react'
import { Input, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './Search.module.less';
import { useDispatch } from 'react-redux';
import {SaveStudentID, SaveStudentPostNumber, SaveStudentInfo, SaveStudentPostData} from '../../Redux/Slices/StudentInfo'
import { useNavigate } from "react-router-dom";
import {getStudentInfoByStudentID, getStudentPostDataByStudentIDAndPostNumber} from '../../Api/studentInfo' 
import { StudentInfoDataModel } from '../../Model/StudentInfoDataModel';   
import { StudentPostDataModel } from '../../Model/StudentPostDataModel';
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
      
    const submit = async () =>{
        if(!curSearchStudentID){
            alert("You must input POST ID!");
            return;
        }
        let studentInfo = await getStudentInfoByStudentID(curSearchStudentID);
        if(!!studentInfo){
            studentInfo = StudentInfoDataModel.StudentInfoDataModelObj(studentInfo);
            if(!studentInfo.id){
                alert("POST ID is not exist!");
                return;
            }
            else{
                dispatch(SaveStudentID(curSearchStudentID));
                //default first one
                dispatch(SaveStudentPostNumber(studentInfo.post_numbers[0]));
                dispatch(SaveStudentInfo(studentInfo));
                const studentPostData = await getStudentPostDataByStudentIDAndPostNumber(curSearchStudentID,studentInfo.post_numbers[0]);
                dispatch(SaveStudentPostData(StudentPostDataModel.StudentPostDataModelObjFinal(studentPostData)));
                navigate("/MainContent");
            }
        }
    }
    return (
        <div className = {style.container}>
            POST ID : &nbsp;&nbsp;&nbsp;
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
