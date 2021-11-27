import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getCommentsTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getCommentsTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        console.log(error);
    }
}