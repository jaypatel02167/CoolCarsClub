import axios from "axios";

let host;
if(window.location.host === 'localhost'){
    host = 'http://localhost:5000';
}else{
    host = '';
}

export async function rate(payload){
    const response = await axios.post(`${host}/search/rate`, payload);
    return response.data;
}