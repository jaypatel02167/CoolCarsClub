import axios from "axios";

let host;
if(window.location.host === 'localhost'){
    host = 'http://localhost:5000';
}else{
    host = '';
}

export async function search(payload){
    const response = await axios.post(`${host}/search/`, payload);
    return response.data;
}