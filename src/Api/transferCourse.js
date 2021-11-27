import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getTransferCourseTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/transfer/getTransferCourseTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        console.log(error);
    }
}

export const getTransferInfoByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/transfer/getTransferInfoByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        console.log(error);
    }
}

export const getBachelorDegreeInfoByID = async (studentID) => {
    try{
        const response = await axios.get(`${ipAddress}/transfer/getBachelorDegreeInfoByID?studentId=${studentID}`);
        const data = await response.data;
        return data;
    }catch(error){
        console.log(error);
    }
}