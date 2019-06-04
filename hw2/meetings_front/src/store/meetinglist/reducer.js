import {initialState, initialLoginState} from './selectors'

const main_reducer = (state=initialState, action) => {
  switch(action.type){

    case 'ADD_MEETING':
      return {
        ...state,
        inputSinceWhen: action.inputSinceWhen,
        inputTilWhen: action.inputTilWhen,
      }

    case 'ADD_MEETING_SUCCESS':
      return {
        ...state,
        meetings: action.meetings,
        addMeetingFailed: false,
      }

    case 'ADD_MEETING_FAILURE':
      return {
        ...state,
        addMeetingFailed: true,
      }

    case 'DELETE_MEETING':
      return {
        ...state,
        meetingToDelete: action.meetingToDelete,
      }

    case 'DELETE_MEETING_SUCCESS':
      return {
        ...state,
        meetings: action.meetings,
      }

    case 'LOGIN_REQUEST':
      return {
        ...state,
        username: action.username,
        password: action.password,
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        meetings: action.meetings,
        username: action.username,
        password: action.password,
        loggedIn: true,
        loginFailed: false,
      }

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loggedIn: false,
        loginFailed: true,
      }

    case 'LOGOUT_REQUEST':
      return {
        ...state,
        username: '',
        password: '',
        loggedIn: false,
        loginFailed: false,
        addMeetingFailed: false,
      }

    default:
      return state
  }
}

export default main_reducer
