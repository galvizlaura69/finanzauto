import axios from 'axios';
import { API, HEADERS } from '../../config/dummyapi';



  const getUsersAll = async (page, size, areMyUsers) => {
    try{
   const { data } = await axios.get(`${API}/user?${areMyUsers?'created=1&':''}page=${page}&limit=${size}`, {
    headers: HEADERS 
  });
    const users = data.data.reverse();
    const total = data.total;
    return {users, total};      
    }catch(error){
      console.log(error);
      return error.message;
    }
  };

  export default getUsersAll;