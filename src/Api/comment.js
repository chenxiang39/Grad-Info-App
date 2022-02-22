import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getCommentsTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/comment/getCommentsTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}

export const postCommentTableDataByCommentObj = async (dataObj) =>{
    const response = await axios.post(`${ipAddress}/comment/postCommentTableDataByCommentObj`,dataObj);
    const data = await response.data;
    return data;
}