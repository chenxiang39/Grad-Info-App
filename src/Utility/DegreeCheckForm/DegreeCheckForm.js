import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.less';
import style from './DegreeCheckForm.module.less'
import { Input , Button, Radio, Space} from 'antd';

function DegreeCheckForm(props) {
    var {curStudentPostData,curStudentPostNumber,curStudentID,title} = props;
    const [termOfAdmission, setTermOfAdmission] = useState(curStudentPostData[4].Admit);
    const [anticipatedTerm, setAnticipatedTerm] = useState("");
    const [catelogYearRequirement, setCatelogYearRequirement] = useState(curStudentPostData[4].Admit);
    const [foreignLanguageMet, setForeignLanguageMet] = useState("");
    const [shouldDisable, setShouldDisable] = useState(false);
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
            <div className = {style.title}>{title}</div>
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

export default React.memo(DegreeCheckForm)
