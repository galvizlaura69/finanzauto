import axios from 'axios';
import { API, HEADERS } from '../../config/dummyapi';
const getUserId = async (id) => {


  try {
    const { data } = await axios.get(`${API}/user/${id}`, {
      headers: HEADERS,
    });
    const user = data;
    return user;
  } catch (error) {
    return error.message;
  }

};

export default getUserId;