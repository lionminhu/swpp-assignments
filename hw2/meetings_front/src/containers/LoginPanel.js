import {connect} from 'react-redux'
import LoginPanel from '../components/molecules/LoginPanel/index'
import {loginRequest, logoutRequest} from '../store/meetinglist/actions'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.meetinglist.loggedIn,
    loggedUsername: state.meetinglist.username,
    loginFailed: state.meetinglist.loginFailed,
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLoginRequest: (inputUsername, inputPassword) => {
    dispatch(loginRequest(inputUsername, inputPassword))
  },

  onLogoutRequest: () => {
    dispatch(logoutRequest())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel)
