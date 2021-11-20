import {axios} from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getCommentsTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getCommentsTableDataByIDAndPostNumber?student_id=${studentID}&sp_post_number=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}