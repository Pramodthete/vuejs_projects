import axios from 'axios'

const BASE_URL = `https://fundoonotes.incubation.bridgelabz.com/api/`

// https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp

export const postData = (url, data, header) => {
  return axios.post(`${BASE_URL}${url}`, data, { header })
}

export const getData = (url) => {
  return axios.get(`${BASE_URL}${url}`)
}

export const deleteData = (url) => {
  return axios.delete(`${BASE_URL}${url}`)
}
