import { postData } from '../services/axiosServices'
const token = localStorage.getItem('loginToken')

export const addLabels = (data) => {
  console.log('in service label')
  let url = `noteLabels`
  let headersOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
  return postData(url, data, headersOptions)
}
