import React from 'react'
import style from './TopDataBar.module.less'

function TopDataBar(props) {
    const {data} = props;
    function createContent(){
        return data.map((item) => {
            for(var key in item){
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