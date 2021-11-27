import React,{useState, useEffect} from 'react'
import { Input, Button} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './Search.module.less';
import { useDispatch , useSelector} from 'react-redux';
import {SaveStudentID, SaveStudentPostNumber, SaveStudentInfo, SaveStudentPostData, fetchStudentInfoByStudentID, StudentInfoLoading, StudentInfoData} from '../../Redux/Slices/StudentInfo'
import { useNavigate } from "react-router-dom";
import {getStudentInfoByStudentID, getStudentPostDataByStudentIDAndPostNumber} from '../../Api/studentInfo' 
import { StudentInfoDataModel } from '../../Model/StudentInfoDataModel';   
import { StudentPostDataModel } from '../../Model/StudentPostDataModel';
export default function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [curSearchStudentID, setcurSearchStudentID] = useState("");
    useEffect(() => {
        dispatch(SaveStudentID(""));
      },[]);
      
    const submit = async () =>{
        if(!curSearchStudentID){
            alert("You must input POST ID!");
            return;
        }
        try{
            const curStudentInfoData = await dispatch(fetchStudentInfoByStudentID(curSearchStudentID)).unwrap();
            if(!curStudentInfoData.id){
                alert("POST ID is not exist!");
                return;
            }
            else{
                dispatch(SaveStudentID(curSearchStudentID));
                //default first one
                dispatch(SaveStudentPostNumber(curStudentInfoData.post_numbers[0]));
                navigate("/MainContent");
            }
        }catch(rejectedValueOrSerializedError){
            alert(rejectedValueOrSerializedError);
        }
    }
    return (
        <div className = {style.container}>
            POST ID : &nbsp;&nbsp;&nbsp;
            <Input
                style = {{width:250}}
                className = {style.input}
                value = {curSearchStudentID}
                onChange = {(e) => setcurSearchStudentID(e.target.value)}
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
