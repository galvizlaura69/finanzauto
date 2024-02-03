import axios from 'axios';
import { API, HEADERS } from '../../config/dummyapi';


  const deleteUser = async (id) => {
    try{
      const { data } = await axios.delete(`${API}/user/${id}`, {
        headers: HEADERS,
      });
      const posts = data.data;
      return posts;
    }catch(error){
      console.log(error);
      return error.message;
    }

  };

  export default deleteUser;