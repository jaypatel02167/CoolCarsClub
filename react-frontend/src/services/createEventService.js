import axios from "axios";

let host;
if(window.location.host === 'localhost'){
    host = 'http://localhost:5000';
}else{
    host = '';
}

export async function createEvent(payload){
    const response = await axios.post(`${host}/events/create`, payload);
    return response.data;
}