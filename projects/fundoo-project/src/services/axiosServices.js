import axios from 'axios'

const BASE_URL = `http://localhost:3000/api/`

export const postData = (url, data, header) => {
  return axios.post(`${BASE_URL}${url}`, data, { header })
}
