import React, {useState} from 'react'
import 'antd/dist/antd.less';
import { Button, Input } from 'antd';
import style from './Comments.module.less'
import Item from 'antd/lib/list/Item';
const { TextArea } = Input;
const maxRows = 16;
export default function Comments() {
    const [textContent, setTextContent] = useState("Old data");
    const saveText = () =>{
        alert(textContent);
    }
    const changeText = (e) =>{
        setTextContent(e.target.value);
    }
    const createLine = () => {
        let lines = [];
        for(let i = 0; i < maxRows; i++){
            let diff = 0; 
            if(i < 3){
                diff = 37;
            }
            else if(i < 6){
                diff = 38.1;
            }
            else if(i < maxRows){
                diff = 39.2;
            }
            else{
                diff = 40.3;
            }
            lines.push(
                <div key = {i} style = {{top : i * diff + 75}} className = {style.line}></div>
            )
        }
        return lines;
    }
    return (
        <div className = {style.container}>
            <div className = {style.title}>Notes&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Comments</div>
            <div className = {style.textAreaContainer}>
                <TextArea
                    maxLength = {1000}
                    autoSize = {
                        {
                            minRows : 0,
                            maxRows : maxRows
                        }
                    }
                    bordered = {false}
                    className = {style.textArea}
                    value = {textContent}
                    onChange = {(e) => changeText(e)}
                ></TextArea>
                {createLine()}
            </div>
            <Button type="primary" className = {style.button} onClick = {saveText}>SAVE</Button>
        </div>
    )
}
