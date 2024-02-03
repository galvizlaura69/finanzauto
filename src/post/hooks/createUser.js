import axios from 'axios';
import { API, HEADERS } from '../../config/dummyapi';


  const createUser = async (firstName, lastName, email, title) => {
    try{
      const payLoad = {
        firstName,
        lastName,
        email,
        title
      };

    const { data } = await axios.post(API + '/user/create', payLoad, {
      headers: HEADERS,
    });
    const posts = data.data;
    return posts;
    }catch(error){
      console.log(error);
      return error.message;
    }
  };

  export default createUser;