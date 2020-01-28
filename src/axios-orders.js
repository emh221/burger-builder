import axios from 'axios';

const instance = axios.create({
  baseURL : 'https://react-my-burger-ab5c1.firebaseio.com/'
})

export default instance;
