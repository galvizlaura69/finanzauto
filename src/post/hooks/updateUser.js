import axios from 'axios';
import { API, HEADERS } from '../../config/dummyapi';

  const updateUser = async (id, firstName, lastName) => {

    const payLoad = {
        firstName,
        lastName,
      };

    try{
      const { data } = await axios.put(`${API}/user/${id}` , payLoad, {
        headers:HEADERS,
      });
      const posts = data.data;
      return posts;
    }catch(error){
      console.log(error);
      return error.message;
    }

  };

  export default updateUser;