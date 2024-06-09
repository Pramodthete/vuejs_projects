import axios from 'axios'

const BASE_URL = `https://fundoonotes.incubation.bridgelabz.com/api/`

// https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp

export const postData = (url, data, header) => {
  return axios.post(`${BASE_URL}${url}`, data, { header })
}
