import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getAdmissionCourseTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    try{
        const response = await axios.get(`${ipAddress}/getAdmissionCourseTableDataByIDAndPostNumber?student_id=${studentID}&sp_post_number=${postNumber}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}

// export const postAdmissionCourseTableDataByNewArr = async (newArr) => {
//     try{
//         const response = await axios.post()
//     }catch(error){
//         alert(error);
//     }
// }