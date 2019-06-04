import {take, takeLatest, call, put, fork} from 'redux-saga/effects'
import api from 'services/api'
import {addMeetingSuccess, addMeetingFailure, deleteMeetingSuccess, loginSuccess, loginFailure} from './actions'

const url = "http://localhost:9000/meetings/"
const loginUrl = "http://localhost:9000/api/login/"

export function* sendGetMeetingsRequest(username, password) {
  const credentials = new Buffer(`${username}:${password}`).toString('base64')
  const response = yield call(
    fetch,
    url,
    {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
    }
  )
  const jsonData = yield response.json()
  return jsonData
}

export function* sendAddMeetingRequest(username, password, inputSinceWhen, inputTilWhen) {
  const credentials = new Buffer(`${username}:${password}`).toString('base64')
  const response = yield call(
    fetch,
    url,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sinceWhen: inputSinceWhen,
        tilWhen: inputTilWhen,
      }),
    }
  )
  if (response.ok) {
    const jsonData = yield call(sendGetMeetingsRequest, username, password)
    yield put(addMeetingSuccess(jsonData))
  } else {
    yield put(addMeetingFailure())
  }
}

export function* watchAddMeetingRequest() {
  while (true) {
    const { username, password, inputSinceWhen, inputTilWhen } = yield take('ADD_MEETING')
    yield call(sendAddMeetingRequest, username, password, inputSinceWhen, inputTilWhen)
  }
}

export function* deleteMeeting(username, password, meetingToDelete) {
  const credentials = new Buffer(`${username}:${password}`).toString('base64')
  const selectUrl = url + meetingToDelete + '/'
  const response = yield call(
    fetch,
    selectUrl,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }
  )
  const jsonData = yield call(sendGetMeetingsRequest, username, password)
  yield put(deleteMeetingSuccess(jsonData))
}

export function* watchDeleteMeetingRequest() {
  while (true) {
    const { username, password, meetingToDelete } = yield take('DELETE_MEETING')
    yield call(deleteMeeting, username, password, meetingToDelete)
  }
}

export function* sendLogin(username, password) {
  const credentials = new Buffer(`${username}:${password}`).toString('base64')
  const response = yield call(
    fetch,
    loginUrl,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    },
  )
  if (response.ok) {
    const jsonData = yield call(sendGetMeetingsRequest, username, password)
    yield put(loginSuccess(username, password, jsonData))
  } else {
    yield put(loginFailure())
  }
}

export function* watchLoginRequest() {
  while (true) {
    const { username, password } = yield take('LOGIN_REQUEST')
    yield call(sendLogin, username, password)
  }
}

export default function* () {
  yield fork(watchLoginRequest)
  yield fork(watchAddMeetingRequest)
  yield fork(watchDeleteMeetingRequest)
}
