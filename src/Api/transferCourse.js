import {axios} from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getTransferCourseTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getTransferCourseTableDataByIDAndPostNumber?student_id=${studentID}&sp_post_number=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

export const getTransferInfoByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getTransferInfoByIDAndPostNumber?student_id=${studentID}&sp_post_number=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

export const getBachelorDegreeInfoByID = async (studentID) => {
    try{
        const response = await axios.get(`${ipAddress}/getBachelorDegreeInfoByID?student_id=${studentID}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}