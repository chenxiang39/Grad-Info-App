import axios from "./axios";
import setting from '../setting.json'

const ipAddress = setting.Api.ServerIP;

export const getUserInfoByUsernameAndPassword = async (username,password) =>{
    try{
        const response = await axios.get(`${ipAddress}/getUserInfoByUsernameAndPassword?user_name=${username}&user_password=${password}`);
        const data = await response.data;
        return data;
    }catch(error){
        alert(error);
    }
}
