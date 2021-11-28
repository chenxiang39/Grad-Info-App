import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getTransferCourseTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/transfer/getTransferCourseTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}

export const getTransferProgramOfStudyByIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/transfer/getTransferProgramOfStudyByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}

export const getBachelorDegreeInfoByID = async (studentID) => {
    const response = await axios.get(`${ipAddress}/transfer/getBachelorDegreeInfoByID?studentId=${studentID}`);
    const data = await response.data;
    return data;
}