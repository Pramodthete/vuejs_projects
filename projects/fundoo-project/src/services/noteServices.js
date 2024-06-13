import { postData } from '../services/axiosServices'
import { getData } from '../services/axiosServices'

export const addNotes = (data, token) => {
  let url = `notes/addNotes?access_token=${token}`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return postData(url, data, headers)
}

export const getNotesList = (token) => {
  let url = `notes/getNotesList?access_token=${token}`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return getData(url, headers)
}

export const deleteNote = (id, token) => {
  let url = `notes/removeNote/${id}?access_token=${token}`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return deleteData(url, headers)
}
