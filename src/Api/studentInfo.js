import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;


export const getStudentInfoByStudentID = async (studentID) =>{
    const response = await axios.get(`${ipAddress}/common/getStudentInfoByStudentID?studentId=${studentID}`);
    const data = await response.data;
    return data;
}

export const getStudentPostDataByStudentIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/admission/getStudentPostDataByStudentIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}

