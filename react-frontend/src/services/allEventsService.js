import axios from "axios";

let host;
if(window.location.host === 'localhost'){
    host = 'http://localhost:5000';
}else{
    host = '';
}

const allEvents = async () => {
  const response = await axios.get(`${host}/events/all`);
    let temp = response.data;
    console.log('All Events Service');
    console.log(temp);
    return temp;};

export default allEvents;