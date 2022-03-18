import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.less';
import style from './DegreeCheckForm.module.less'
import { useSelector } from 'react-redux';
import {AccessPostNumberList} from '../../Redux/Slices/UserInfo'
import { Input , Button, Radio, Space, message} from 'antd';
import { DegreeCheckDataModel } from '../../Model/degreeCheck/DegreeCheckDataModel';
import {postDegreeCheckByDegreeCheckObj} from '../../Api/degreeCheck'
import SubmitConfirm from '../PostConfirm/SubmitConfirm/SubmitConfirm'
import PostNumberAccess from '../CommonFunc/PostNumberAccess'
function DegreeCheckForm(props) {
    var {curStudentPostData,curStudentPostNumber,curStudentID,degreeCheckFormData, mainPageShouldRefresh} = props;
    const accessPostNumberList = useSelector(AccessPostNumberList);
    const functionDisable = PostNumberAccess(accessPostNumberList, curStudentPostNumber);
    const [termOfAdmission, setTermOfAdmission] = useState("");
    const [anticipatedTerm, setAnticipatedTerm] = useState("");
    const [catalogYearRequirement, setcatalogYearRequirement] = useState("");
    const [foreignLanguageMet, setForeignLanguageMet] = useState("");
    const [shouldDisable, setShouldDisable] = useState(false);
    useEffect(() => {
        if(degreeCheckFormData.completed){
            setTermOfAdmission(degreeCheckFormData.admissionTerm);
            setAnticipatedTerm(degreeCheckFormData.anticipatedTerm);
            setcatalogYearRequirement(degreeCheckFormData.catalogYear);
            setForeignLanguageMet(degreeCheckFormData.foreignLanguage);
            setShouldDisable(true);
        }
        else{
            setTermOfAdmission(curStudentPostData.Admit)
            setAnticipatedTerm("");
            setcatalogYearRequirement(curStudentPostData.Admit);
            setForeignLanguageMet("");
            setShouldDisable(false);
        }
        return () => {
            
        }
    }, [curStudentPostData,degreeCheckFormData])
    const submit = () =>{
        let obj = {
            id: degreeCheckFormData.id,
            program : degreeCheckFormData.program,
            admissionTerm : termOfAdmission,
            anticipatedTerm :anticipatedTerm,
            catalogYear :catalogYearRequirement,
            foreignLanguage :foreignLanguageMet,
        }
        if(!termOfAdmission || !anticipatedTerm || !catalogYearRequirement || !foreignLanguageMet){
            message.warning("You must add all of items!",1);
            return;
        }
        let semster = anticipatedTerm.charAt(anticipatedTerm.length - 1);
        if( anticipatedTerm.length !== 5 || (semster !== '1' && semster !== '2' && semster !== '3')){
            message.warning("Anticipated graduation TERM is unvalid!",1);
            return;
        }
        if(parseInt(anticipatedTerm) <= parseInt(termOfAdmission)){
            message.warning("Anticipated graduation TERM must be later than TERM of admission!",1);
            return;
        }
        let semster2 = catalogYearRequirement.charAt(catalogYearRequirement.length - 1);
        if( catalogYearRequirement.length !== 5 || (semster2 !== '1' && semster2 !== '2' && semster2 !== '3')){
            message.warning("catalog Year Requirement is unvalid!",1);
            return;
        }
        if(parseInt(catalogYearRequirement) < parseInt(termOfAdmission)){
            message.warning("catalog Year Requirement must be no ealier than TERM of admission!",1);
            return;
        }
        const studentInfoObj = {
            id : curStudentID,
            studentPostNumber: curStudentPostNumber
        }
        let dataObject = DegreeCheckDataModel.DegreeCheckTableDataModelSubmitObj(obj,studentInfoObj);
        let ConfrimProps = {
            content: `One program will be submitted.`,
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
                        value={catalogYearRequirement}
                        onChange = {(e) => setcatalogYearRequirement(e.target.value)}
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
                <Button disabled = {shouldDisable || functionDisable} onClick = {submit} type="primary" className = {[style.button,]}>{shouldDisable ? "COMPELETED" : "SUBMIT"}</Button>
            </div>
        </div>
    )
}

export default React.memo(DegreeCheckForm)
