import axios from 'axios';
import { API, HEADERS } from '../../config/dummyapi';

const updateUser = async (id, firstName, lastName, gender, email, dateOfBirth, phone) => {

  const payLoad = {
    firstName,
    lastName,
    gender,
    email,
    dateOfBirth,
    phone
  };

    try{
      const { data } = await axios.put(`${API}/user/${id}` , payLoad, {
        headers:HEADERS,
      });
      const users = data.data;
      return users;
    }catch(error){
      return error.message;
    }

  };

  export default updateUser;