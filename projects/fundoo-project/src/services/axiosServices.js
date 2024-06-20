import axios from 'axios'

const BASE_URL = `https://fundoonotes.incubation.bridgelabz.com/api/`

// https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp

export const patchData = (url, data, header) => {
  return axios.patch(`${BASE_URL}${url}`, data, header)
}

export const getData = (url, headerOption) => {
  return axios.get(`${BASE_URL}${url}`, headerOption)
}

export const deleteData = (url, headerOption) => {
  return axios.delete(`${BASE_URL}${url}`, headerOption)
}

export const postData = (url, data, header) => {
  return axios.post(`${BASE_URL}${url}`, data, header)
}
