let nextMeetingId = 0

export const addMeeting = (inputSinceWhen, inputTilWhen, stateParam) => {
  return {
    type: 'ADD_MEETING',
    inputSinceWhen: inputSinceWhen,
    inputTilWhen: inputTilWhen,
    username: stateParam.username,
    password: stateParam.password,
  }
}

export const addMeetingSuccess = (meetings) => {
  return {
    type: 'ADD_MEETING_SUCCESS',
    meetings: meetings,
  }
}

export const addMeetingFailure = () => {
  return {
    type: 'ADD_MEETING_FAILURE',
  }
}

export const deleteMeeting = (username, password, meetingToDelete) => {
  return {
    type: 'DELETE_MEETING',
    username: username,
    password: password,
    meetingToDelete: meetingToDelete,
  }
}

export const deleteMeetingSuccess = (meetings) => {
  return {
    type: 'DELETE_MEETING_SUCCESS',
    meetings: meetings,
  }
}

export const loginRequest = (username, password) => {
  return {
    type: 'LOGIN_REQUEST',
    username: username,
    password: password,
  }
}

export const loginSuccess = (username, password, meetings) => {
  return {
    type: 'LOGIN_SUCCESS',
    username: username,
    password: password,
    meetings: meetings,
  }
}

export const loginFailure = () => {
  return { type: 'LOGIN_FAILURE' }
}

export const logoutRequest = () => {
  return { type: 'LOGOUT_REQUEST' }
}
