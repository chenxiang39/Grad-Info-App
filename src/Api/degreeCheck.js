import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getDegreeCheckTableDataByStudentIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/degreecheck/getDegreeCheckTableDataByStudentIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}


export const postDegreeCheckByDegreeCheckObj = async (dataObj) =>{
    const response = await axios.post(`${ipAddress}/degreecheck/postDegreeCheckByDegreeCheckObj`,dataObj);
    const data = await response.data;
    return data;
}

