import React from 'react'
import StudentInfo from './StudentInfo/StudentInfo'
import style from './MainContent.module.less'
import { Routes, Route, Navigate,useLocation} from "react-router-dom";
import TopScrollNavBar from '../../Utility/TopScrollNavBar/TopScrollNavBar';
import { StudentInfoDataModel } from '../../Model/StudentInfoDataModel';
import {StudentID} from '../../Redux/Slices/StudentInfo';
import { useSelector } from 'react-redux';
import AdmissionInfo from './Content/AdmissionInfo/AdmissionInfo'
import TransferRecords from './Content/TransferRecords/TransferRecords';
import NonCourseRelatedEvent from './Content/NonCourseRelatedEvent/NonCourseRelatedEvent';
import Comments from './Content/Comments/Comments';
import DegreeCheck from './Content/DegreeCheck/DegreeCheck';
export default function MainContent(){
    let studentInfo = {
        student_id:"1777-4041-99",
        student_name: "Trojan",
        sp_post_numbers:["309","409","509"]  
    }
    let legalStudentInfo = StudentInfoDataModel.StudentInfoDataModelObj(studentInfo);
    return (
        
        <div>
            <div className = {style.container}>
                <StudentInfo data = {legalStudentInfo}></StudentInfo>
                <TopScrollNavBar></TopScrollNavBar>
                <Routes>
                    <Route path="ADMISSION%20INFO" element={<AdmissionInfo />} />
                    <Route path="TRANSFER%20RECORDS" element = {<TransferRecords />}/>
                    <Route path="NON-COURSE%20RELATED%20EVENTS" element = {<NonCourseRelatedEvent />}/>
                    <Route path="COMMENTS" element = {<Comments/>}/>
                    <Route path="DEGREE%20CHECK" element = {<DegreeCheck/>}/>
                    <Route path="*" element ={<Navigate to="ADMISSION%20INFO" replace={true}/>} />
                </Routes>
            </div>
        </div>
    )
}