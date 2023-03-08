import axios from "axios";

let host;
if(window.location.host === 'localhost'){
    host = 'http://localhost:5000';
}else{
    host = '';
}

export async function signup(payload){
    const response = await axios.post(`${host}/user/signup`, payload);
    return response.data;
}