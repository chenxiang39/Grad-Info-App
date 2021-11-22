import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;
export const getNonCourseRelatedEventTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getNonCourseRelatedEventTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

export const getExamCommitteeTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getExamCommitteeTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}


export const getThesisCommitteeTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getThesisCommitteeTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}