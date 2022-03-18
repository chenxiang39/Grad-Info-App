import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getUserInfoByUsernameAndPassword = async (username,password) =>{
    const response = await axios.get(`${ipAddress}/login/getUserInfoByUsernameAndPassword?userName=${username}&userPassword=${password}`);
    const data = await response.data;
    return data;
}

export const getCodeAndDescription = async () =>{
    const response = await axios.get(`${ipAddress}/login/getCodeAndDescription`);
    const data = await response.data;
    return data;
}

export const getAllSpPostNumber = async () => {
    const response = await axios.get(`${ipAddress}/login/getAllSpPostNumber`);
    const data = await response.data;
    return data;
}

export const getPostNumberByUserID = async (userId) => {
    const response = await axios.get(`${ipAddress}/login/getPostNumberByUserID?userId=${userId}`);
    const data = await response.data;
    return data;
}
