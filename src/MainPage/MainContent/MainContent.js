import React from 'react'
import StudentInfo from './StudentInfo/StudentInfo'
import style from './MainContent.module.less'
import { Routes, Route, Navigate} from "react-router-dom";
import TopScrollNavBar from '../../Utility/TopScrollNavBar/TopScrollNavBar';
import { titleDataArr } from '../../Constant/titleLinkManage';
export default function MainContent(){
    const createRoutes = () => {
        return titleDataArr.map((data)=>{
            return <Route key = {data} path = {data.link} element={data.element} />
        })
    }
    return (
        <div>
            <div className = {style.container}>
                <StudentInfo></StudentInfo>
                <TopScrollNavBar></TopScrollNavBar>
                <Routes>
                    {createRoutes()}
                    <Route path="*" element ={<Navigate to = {titleDataArr[0].link} replace={true}/>} />
                </Routes>
            </div>
        </div>
    )
}