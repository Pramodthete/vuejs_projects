import { postData, getData } from '../services/axiosServices'
const token = localStorage.getItem('loginToken')

export const addNotes = (data, token) => {
  let url = `notes/addNotes`
  let headersOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
  return postData(url, data, headersOptions)
}

export const getNotesList = () => {
  let url = `notes/getNotesList`
  let headersOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
  return getData(url, headersOptions)
}

export const deleteNote = (data, token) => {
  let url = `notes/trashNotes`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return postData(url, data, { headers })
}
