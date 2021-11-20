import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;


export const getStudentInfoByStudentID = async (studentID) =>{
    try{
        const response = await axios.get(`${ipAddress}/getStudentInfoByStudentID?student_id=${studentID}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

export const getStudentPostDataByStudentIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getStudentPostDataByStudentIDAndPostNumber?student_id=${studentID}&sp_post_number=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

