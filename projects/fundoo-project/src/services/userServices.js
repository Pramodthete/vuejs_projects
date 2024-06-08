import { postData } from '../services/axiosServices'

export const loginData = (data) => {
  let url = '/admin/login/'
  const headers = {
    'Content-Type': 'application/json'
  }
  return postData(url, data, headers)
}
