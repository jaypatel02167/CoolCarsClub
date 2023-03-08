import axios from "axios";

let host;
if(window.location.host === 'localhost'){
    host = 'http://127.0.0.1:5000';
}else{
    host = '';
}

export async function topThreeEvents(){
    const response = await axios.get(`${host}/events/topEvents`);
    console.log(response.data)
    return response.data;
}