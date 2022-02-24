import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;


export const getStarsExceptionByStudentIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/stars/getStarsExceptionByStudentIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}

export const postStarExceptionByStarsObj = async (dataObj) => {
    const response = await axios.post(`${ipAddress}/stars/postStarsExceptionByStarsObj`,dataObj);
    const data = await response.data;
    return data;
}