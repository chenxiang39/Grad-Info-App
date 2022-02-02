import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.less';
import style from './DegreeCheck.module.less'
import { Input , Button, Radio, Space} from 'antd';
import { useSelector } from 'react-redux';
import {StudentPostData , StudentPostNumber, StudentID} from '../../../../Redux/Slices/StudentInfo'
import useFetchStudentPostData from '../../../../Hooks/Fetch/studentInfo/useFetchStudentPostData';
export default function DegreeCheck() {
    let curStudentPostData = useSelector(StudentPostData);
    let curStudentPostNumber = useSelector(StudentPostNumber);
    let curStudentID = useSelector(StudentID);
    const [shouldRefresh, setshouldRefresh] = useState(false);
    const [termOfAdmission, setTermOfAdmission] = useState("");
    const [anticipatedTerm, setAnticipatedTerm] = useState("");
    const [catelogYearRequirement, setCatelogYearRequirement] = useState("");
    const [foreignLanguageMet, setForeignLanguageMet] = useState("");
    const [shouldDisable, setShouldDisable] = useState(false);
    const [topDataBarLoading, topDataBarLoadingError] = useFetchStudentPostData([curStudentID, curStudentPostNumber],[curStudentPostNumber,shouldRefresh]);
    useEffect(() => {
        setTermOfAdmission(curStudentPostData[4].Admit)
        setCatelogYearRequirement(curStudentPostData[4].Admit);
        return () => {
            
        }
    }, [curStudentPostData])
    const submit = () =>{
        let obj = {
            termOfAdmission :termOfAdmission,
            anticipatedTerm :anticipatedTerm,
            catelogYearRequirement :catelogYearRequirement,
            foreignLanguageMet :foreignLanguageMet
        }
        if(!termOfAdmission || !anticipatedTerm || !catelogYearRequirement || !foreignLanguageMet){
            alert("You must add all of items!");
            return;
        }
    }
    return (
        <div className = {style.container}>
            <div className = {style.title}>PROGRAM - Electrical Engineering</div>
            <div className = {style.inputContainer}>
                <div className = {style.inputTitle}>TERM of admission/readmission: 
                    <Input
                        disabled = {true}
                        className = {style.input}
                        value={termOfAdmission}
                    ></Input>
                </div>
                <div className = {style.inputTitle}>Anticipated graduation TERM: 
                    <Input
                        disabled = {shouldDisable}
                        className = {style.input}
                        onChange = {(e) => setAnticipatedTerm(e.target.value)}
                    ></Input>
                </div>
                <div className = {style.inputTitle}>Catalog year requirements student is following: 
                    <Input
                        disabled = {shouldDisable}
                        className = {style.input}
                        value={catelogYearRequirement}
                        onChange = {(e) => setCatelogYearRequirement(e.target.value)}
                    ></Input>
                </div>
                <div className = {style.inputTitle}>Foreign language/research component has been met:
                    <Radio.Group 
                        onChange={(e) => setForeignLanguageMet(e.target.value)} 
                        value={foreignLanguageMet} 
                        optionType="button"
                        buttonStyle="solid"
                        className = {style.input}
                    ><Space direction="horizontal">
                        <Radio value={"YES"}>YES</Radio>
                        <Radio value={"NO"}>NO</Radio>
                        <Radio value={"N/A"}>N/A</Radio>
                    </Space>
                    </Radio.Group>
                </div>
            </div>
            <div className = {style.buttonContainer}>
                <Button onClick = {submit} type="primary" className = {[style.button, style.Pbutton,]}>SUBMIT</Button>
            </div>
        </div>
    )
}
