import { postData } from '../services/axiosServices'

export const loginData = (data) => {
  let url = 'user/login'
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token'
  }
  return postData(url, data, headers)
}

export const registerData = (data) => {
  let url = 'user/userSignUp'
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token'
  }
  return postData(url, data, headers)
}

export const forgotPassData = (data) => {
  let url = `user/reset`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'token'
  }
  return postData(url, data, headers)
}

export const resetPassData = (data, token) => {
  console.log(token)
  let url = `user/reset-password?access_token=${token}`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
  return postData(url, data, headers)
}
