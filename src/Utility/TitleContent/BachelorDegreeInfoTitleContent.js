import React from 'react'
import style from './TitleContent.module.less'
function BachelorDegreeInfoTitleContent(props) {
    const {data} = props;
    return (
        <div className = {style.container}>
            <div className = {style.title}>Bachelors Degree Verification</div>
            <div className = {style.itemContainer}>
                <div className = {style.item}>
                    <div className = {style.itemRed}>CEEB</div>
                    <div className = {style.itemKey}>{data.ceeb}</div>
                </div>
                <div className = {style.item}>
                    <div className = {style.itemRed}>INSTITUTION NAME</div>
                    <div className = {style.itemKey}>{data.institutionName}</div>
                </div>
                <div className = {style.item}>
                    <div className = {style.itemRed}>DEGREE</div>
                    <div className = {style.itemKey}>BS</div>
                </div>
                <div className = {style.item}>
                    <div className = {style.itemRed}>DATE EARNING</div>
                    <div className = {style.itemKey}>{data.dateEarned}</div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(BachelorDegreeInfoTitleContent)
