import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getNonCourseRelatedEventTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/noncourseevent/getNonCourseRelatedEventTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}
export const postNonCourseRelatedEventTableDataByEventObj = async (dataObj) =>{
    const response = await axios.post(`${ipAddress}/noncourseevent/postNonCourseRelatedEventTableDataByEventObj`, dataObj);
    const data = await response.data;
    return data;
}
export const getExamCommitteeTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/noncourseevent/getExamCommitteeTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}

export const postExamCommitteeTableDataByCommitteeObj = async (dataObj) =>{
    const response = await axios.post(`${ipAddress}/noncourseevent/postExamCommitteeTableDataByCommitteeObj`, dataObj);
    const data = await response.data;
    return data;
}

export const getThesisCommitteeTableDataByIDAndPostNumber = async (studentID, postNumber) =>{
    const response = await axios.get(`${ipAddress}/noncourseevent/getThesisCommitteeTableDataByIDAndPostNumber?studentId=${studentID}&spPostNumber=${postNumber}`);
    const data = await response.data;
    return data;
}

export const postThesisCommitteeTableDataByCommitteeObj = async (dataObj) =>{
    const response = await axios.post(`${ipAddress}/noncourseevent/postThesisCommitteeTableDataByCommitteeObj`, dataObj);
    const data = await response.data;
    return data;
}

export const postPaperTitleByPaperTitleObj = async (dataObj) => {
    const response = await axios.post(`${ipAddress}/noncourseevent/postPaperTitleByPaperTitleObj`, dataObj);
    const data = await response.data;
    return data;
}
