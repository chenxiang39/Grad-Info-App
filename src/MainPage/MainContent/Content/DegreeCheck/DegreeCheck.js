import React, {useState} from 'react'
import 'antd/dist/antd.less';
import style from './DegreeCheck.module.less'
import { Input , Button} from 'antd';
export default function DegreeCheck() {
    const [termOfAdmission, setTermOfAdmission] = useState("");
    const [anticipatedTerm, setAnticipatedTerm] = useState("");
    const [catelogYearRequirement, setCatelogYearRequirement] = useState("");
    const [foreignLanguageMet, setForeignLanguageMet] = useState("");
    const [shouldDisable, setShouldDisable] = useState(false);
    const inputTermOfAdmission = (e) =>{
        setTermOfAdmission(e.target.value);
    }
    const inputAnticipatedTerm = (e) =>{
        setAnticipatedTerm(e.target.value);
    }
    const inputCatelogYearRequirement = (e) =>{
        setCatelogYearRequirement(e.target.value);
    }
    const inputForeignLanguageMet = (e) =>{
        setForeignLanguageMet(e.target.value);
    }
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
        console.log(obj);
    }
    return (
        <div className = {style.container}>
            <div className = {style.title}>PROGRAM - Electrical Engineering</div>
            <div className = {style.inputContainer}>
                <div className = {style.inputTitle}>TERM of admission/readmission: 
                    <Input
                        disabled = {shouldDisable}
                        className = {style.input}
                        onChange = {inputTermOfAdmission}
                    ></Input>
                </div>
                <div className = {style.inputTitle}>Anticipated graduation TERM: 
                    <Input
                        disabled = {shouldDisable}
                        className = {style.input}
                        onChange = {inputAnticipatedTerm}
                    ></Input>
                </div>
                <div className = {style.inputTitle}>Catalog year requirements student is following: 
                    <Input
                        disabled = {shouldDisable}
                        className = {style.input}
                        onChange = {inputCatelogYearRequirement}
                    ></Input>
                </div>
                <div className = {style.inputTitle}>Foreign language/research component has been met:
                    <Input
                        disabled = {shouldDisable}
                        className = {style.input}
                        onChange = {inputForeignLanguageMet}
                    ></Input>
                </div>
            </div>
            <div className = {style.buttonContainer}>
                <Button onClick = {submit} type="primary" className = {[style.button, style.Pbutton,]}>SUBMIT</Button>
            </div>
            
        </div>
    )
}
