import React from 'react'
import StudentInfo from './StudentInfo/StudentInfo'
import style from './MainContent.module.less'
import { Routes, Route, Navigate} from "react-router-dom";
import TopScrollNavBar from '../../Utility/TopScrollNavBar/TopScrollNavBar';
import { useSelector } from 'react-redux';
import AdmissionInfo from './Content/AdmissionInfo/AdmissionInfo'
import TransferRecords from './Content/TransferRecords/TransferRecords';
import NonCourseRelatedEvent from './Content/NonCourseRelatedEvent/NonCourseRelatedEvent';
import Comment from './Content/Comment/Comment';
import DegreeCheck from './Content/DegreeCheck/DegreeCheck';
export default function MainContent(){
    return (
        <div>
            <div className = {style.container}>
                <StudentInfo></StudentInfo>
                <TopScrollNavBar></TopScrollNavBar>
                <Routes>
                    <Route path="ADMISSION%20INFO" element={<AdmissionInfo />} />
                    <Route path="TRANSFER%20RECORDS" element = {<TransferRecords />}/>
                    <Route path="NON-COURSE%20RELATED%20EVENTS" element = {<NonCourseRelatedEvent />}/>
                    <Route path="COMMENTS" element = {<Comment/>}/>
                    <Route path="DEGREE%20CHECK" element = {<DegreeCheck/>}/>
                    <Route path="*" element ={<Navigate to="ADMISSION%20INFO" replace={true}/>} />
                </Routes>
            </div>
        </div>
    )
}