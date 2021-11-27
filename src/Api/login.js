import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getUserInfoByUsernameAndPassword = async (username,password) =>{
    try{
        const response = await axios.get(`${ipAddress}/login/getUserInfoByUsernameAndPassword?userName=${username}&userPassword=${password}`);
        const data = await response.data;
        return data;
    }catch(error){
        console.log(error);
    }
}
