import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;
export const getNonCourseRelatedEventTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getNonCourseRelatedEventTableDataByIDAndPostNumber?student_id=${studentID}&sp_post_number=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

export const getExamCommitteeTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getExamCommitteeTableDataByIDAndPostNumber?student_id=${studentID}&sp_post_number=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}


export const getThesisCommitteeTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getThesisCommitteeTableDataByIDAndPostNumber?student_id=${studentID}&sp_post_number=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}