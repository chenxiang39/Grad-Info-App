import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getTransferCourseTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getTransferCourseTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

export const getTransferInfoByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getTransferInfoByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

export const getBachelorDegreeInfoByID = async (studentID) => {
    try{
        const response = await axios.get(`${ipAddress}/getBachelorDegreeInfoByID?studentId=${studentID}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}