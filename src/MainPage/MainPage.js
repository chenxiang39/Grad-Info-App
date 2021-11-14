import React from 'react'
import Header from './Header/Header'
import StudentInfo from './StudentInfo/StudentInfo'
import style from './MainPage.module.less'
import { Routes, Route} from "react-router-dom";
import TopScrollNavBar from '../Utility/TopScrollNavBar/TopScrollNavBar';
import AdmissionInfo from './Content/AdmissionInfo/AdmissionInfo'
import TransferRecords from './Content/TransferRecords/TransferRecords';
import NonCourseRelatedEvent from './Content/NonCourseRelatedEvent/NonCourseRelatedEvent';
import Comments from './Content/Comments/Comments';
import DegreeCheck from './Content/DegreeCheck/DegreeCheck';
function MainPage(){
    let studentInfo = {
        id:"1777-4041-99",
        name: "Trojan",
        ssn:"1777-4042-01",
        post_numbers:["309","409","509"]  
    }
    return (
        
        <div>
            <Header></Header>
            <div className = {style.container}>
                <StudentInfo data = {studentInfo}></StudentInfo>
                <TopScrollNavBar></TopScrollNavBar>
                <Routes>
                    <Route path="/ADMISSION%20INFO" element={<AdmissionInfo />} />
                    <Route path="/TRANSFER%20RECORDS" element = {<TransferRecords />}/>
                    <Route path="/NON-COURSE%20RELATED%20EVENTS" element = {<NonCourseRelatedEvent />}/>
                    <Route path="/COMMENTS" element = {<Comments/>}/>
                    <Route path="/DEGREE%20CHECK" element = {<DegreeCheck/>}/>
                    <Route path="*" element={<AdmissionInfo />} />
                </Routes>
            </div>
        </div>
    )
}

export default MainPage;