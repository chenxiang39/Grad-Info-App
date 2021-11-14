import React from 'react'
import style from './TitleContent.module.less'
export default function TitleContent(props) {
    const {data} = props;
    function createContent(){
        return data.map((item) => {
            for(var key in item){
                return(
                    <div key = {key} className = {style.item}>
                        <div className = {style.itemRed}>{key}</div>
                        <div className = {style.itemKey}>{item[key]}</div>
                    </div>
                )
            }
        })
    }

    return (
        <div className = {style.container}>
            <div className = {style.title}>{props.title}</div>
            <div className = {style.itemContainer}>
                {createContent()}
            </div>
           
        </div>
    )
}
