import { postData, getData } from '../services/axiosServices'
const token = localStorage.getItem('loginToken')

export const addNotes = (data) => {
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

export const deleteNote = (data) => {
  let url = `notes/trashNotes`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return postData(url, data, { headers })
}

export const updateNotes = (data) => {
  let url = `notes/updateNotes`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return postData(url, data, { headers })
}

export const updateArchivedNotes = (data) => {
  let url = `notes/archiveNotes`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return postData(url, data, { headers })
}

export const updateColorNotes = (data) => {
  let url = `notes/changesColorNotes`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return postData(url, data, { headers })
}

export const getTrashNotes = () => {
  let url = `notes/getTrashNotesList`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return getData(url, { headers })
}

export const getArchivedNotes = () => {
  let url = `notes/getArchiveNotesList`
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }
  return getData(url, { headers })
}
