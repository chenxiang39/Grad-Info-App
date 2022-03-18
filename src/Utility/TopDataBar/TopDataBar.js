import React from 'react'
import style from './TopDataBar.module.less'
import {StudentPostDataModel} from '../../Model/studentInfo/StudentPostDataModel';
function TopDataBar(props) {
    const {data} = props;
    const transferData = StudentPostDataModel.StudentPostDataModelObjTransferToArray(data);
    function createContent(){
        return transferData.map((item) => {
            for(var key in item){
                if(key === "ThesisTitle"){
                    continue;
                }
                return(
                    <div key = {key} className = {style.item}>
                        <div className = {style.itemRed}>{key}</div>
                        <div>{item[key]}</div>
                    </div>
                )
            }
        })
    }

    return (
        <div className = {style.container}>
            {createContent()}
        </div>
    )
}

export default React.memo(TopDataBar);