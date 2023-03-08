import axios from "axios";

let host;
if(window.location.host === 'localhost'){
    host = 'http://127.0.0.1:5000';
}else{
    host = '';
}

export async function signout(){
    const response = await axios.post(`${host}/user/signout`);
    return response.data;
    
}