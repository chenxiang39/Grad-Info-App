import {axios} from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;


export const getStudentInfoByStudentID = async (studentID) =>{
    try{
        const response = await axios.get(`${ipAddress}/studentById?student_id=${studentID}`);
        const data = await response.data;
        return data;
    }catch(error){
        console.log(error);
    }
}