import axios from 'axios';
import { API, HEADERS } from '../../config/dummyapi';



const getUsersAll = async (page, size, areMyUsers) => {
  try {
    const paramsPagination = areMyUsers ? 'created=1&' : `page=${page}&limit=${size}`;
    const { data } = await axios.get(`${API}/user?${paramsPagination}`, {
      headers: HEADERS
    });
    const users = data.data.reverse();
    const total = data.total;
    return { users, total };
  } catch (error) {
    return error.message;
  }
};

export default getUsersAll;