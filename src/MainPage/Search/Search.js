import React,{useState, useEffect} from 'react'
import { Input, Button , Spin,message} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import style from './Search.module.less';
import { useDispatch } from 'react-redux';
import {SaveStudentID, SaveStudentPostNumber, SaveStudentInfo} from '../../Redux/Slices/StudentInfo'
import { useNavigate } from "react-router-dom";
import {getStudentInfoByStudentID} from '../../Api/studentInfo' 
import { StudentInfoDataModel } from '../../Model/studentInfo/StudentInfoDataModel';   
export default function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [curSearchStudentID, setcurSearchStudentID] = useState("");
    useEffect(() => {
        dispatch(SaveStudentID(""));
    },[]);
    
    const keyPress = (e) => {
        //click enter execute
        if(e.code === "Enter" || e.key === "Enter"){
            submit();
        }
    }
    const submit = async () =>{
        if(!curSearchStudentID){
            message.warning("You must input STUDENT ID!" , 1);
            return;
        }
        try{
            setLoading(true);
            let studentInfo = await getStudentInfoByStudentID(curSearchStudentID);
            studentInfo = StudentInfoDataModel.StudentInfoDataModelObj(studentInfo);
            if(!studentInfo.id){
                setLoading(false);
                message.warning("STUDENT ID is not exist!" , 1);
                return;
            }
            else{
                dispatch(SaveStudentID(curSearchStudentID));
                //default first one
                dispatch(SaveStudentPostNumber(studentInfo.post_numbers[0]));
                dispatch(SaveStudentInfo(studentInfo));
                navigate("/MainContent",{replace: true});
            }
        }catch(error){
            setLoading(false);
            message.error("Network is broken !" , 1);
        }
    }
    return (
        <Spin className = {style.spinContainer} size = "large" spinning = {loading}>
            <div 
                onKeyDown = {keyPress}
                className = {style.container}>
                STUDENT ID : &nbsp;&nbsp;&nbsp;
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
        </Spin>
    )
}
