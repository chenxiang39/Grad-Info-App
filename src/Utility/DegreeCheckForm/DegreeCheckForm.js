import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.less';
import style from './DegreeCheckForm.module.less'
import { Input , Button, Radio, Space} from 'antd';
import { DegreeCheckDataModel } from '../../Model/degreeCheck/DegreeCheckDataModel';
import {postDegreeCheckByDegreeCheckObj} from '../../Api/degreeCheck'
import SubmitConfirm from '../PostConfirm/SubmitConfirm/SubmitConfirm'
function DegreeCheckForm(props) {
    var {curStudentPostData,curStudentPostNumber,curStudentID,degreeCheckFormData, mainPageShouldRefresh} = props;
    const [termOfAdmission, setTermOfAdmission] = useState("");
    const [anticipatedTerm, setAnticipatedTerm] = useState("");
    const [catelogYearRequirement, setCatelogYearRequirement] = useState("");
    const [foreignLanguageMet, setForeignLanguageMet] = useState("");
    const [shouldDisable, setShouldDisable] = useState(false);
    useEffect(() => {
        if(degreeCheckFormData.completed){
            setTermOfAdmission(degreeCheckFormData.admissionTerm);
            setAnticipatedTerm(degreeCheckFormData.anticipatedTerm);
            setCatelogYearRequirement(degreeCheckFormData.catalogYear);
            setForeignLanguageMet(degreeCheckFormData.foreignLanguage);
            setShouldDisable(true);
        }
        else{
            setTermOfAdmission(curStudentPostData[4].Admit)
            setAnticipatedTerm("");
            setCatelogYearRequirement(curStudentPostData[4].Admit);
            setForeignLanguageMet("");
            setShouldDisable(false);
        }
        return () => {
            
        }
    }, [curStudentPostData,degreeCheckFormData])
    const submit = () =>{
        let obj = {
            program : degreeCheckFormData.program,
            termOfAdmission :termOfAdmission,
            anticipatedTerm :anticipatedTerm,
            catelogYearRequirement :catelogYearRequirement,
            foreignLanguageMet :foreignLanguageMet
        }
        if(!termOfAdmission || !anticipatedTerm || !catelogYearRequirement || !foreignLanguageMet){
            alert("You must add all of items!");
            return;
        }
        let semster = anticipatedTerm.charAt(anticipatedTerm.length - 1);
        if( anticipatedTerm.length !== 5 || (semster !== '1' && semster !== '2' && semster !== '3')){
            alert("Anticipated graduation TERM is unvalid");
            return;
        }
        if(parseInt(anticipatedTerm) <= parseInt(termOfAdmission)){
            alert("Anticipated graduation TERM must be later than TERM of admission");
            return;
        }
        let semster2 = catelogYearRequirement.charAt(catelogYearRequirement.length - 1);
        if( catelogYearRequirement.length !== 5 || (semster2 !== '1' && semster2 !== '2' && semster2 !== '3')){
            alert("Catelog Year Requirement is unvalid");
            return;
        }
        if(parseInt(catelogYearRequirement) < parseInt(catelogYearRequirement)){
            alert("Catelog Year Requirement must be no ealier than TERM of admission");
            return;
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let dataObject = DegreeCheckDataModel.DegreeCheckTableDataModelSubmitObj(obj,studentInfoObj);
        let ConfrimProps = {
            content: `One program will be submit.`,
            responseDataModelFun : DegreeCheckDataModel.DegreeCheckDataModelResponseObj,
            requestBody : dataObject,
            fetchDataFun: postDegreeCheckByDegreeCheckObj,
            mainPageShouldRefresh
        }

        SubmitConfirm({...ConfrimProps});
    }
    return (
        <div className = {style.container}>
            <div className = {style.title}>PROGRAM - {degreeCheckFormData.program}</div>
            <div className = {style.inputContainer}>
                <div className = {style.inputTitle}>TERM of admission/readmission: 
                    <Input
                        disabled = {true}
                        className = {style.input}
                        value = {termOfAdmission}
                    ></Input>
                </div>
                <div className = {style.inputTitle}>Anticipated graduation TERM: 
                    <Input
                        value={anticipatedTerm}
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
                        disabled = {shouldDisable}
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
                <Button disabled = {shouldDisable} onClick = {submit} type="primary" className = {[style.button,]}>{shouldDisable ? "COMPELETED" : "SUBMIT"}</Button>
            </div>
        </div>
    )
}

export default React.memo(DegreeCheckForm)
