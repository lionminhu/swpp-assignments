import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../atoms/Button'

export const LoginPanel = ({ loggedIn, onLoginRequest, onLogoutRequest, loggedUsername, loginFailed }) => {
  let inputUsernameField
  let inputPasswordField
  const onSubmit = () => {
    if (inputUsernameField !== undefined && inputUsernameField.value !== '' &&
      inputPasswordField !== undefined && inputPasswordField.value !== '') {
      onLoginRequest(inputUsernameField.value, inputPasswordField.value)
    }
  }
  if (loggedIn) {
    return (
      <div>
        Logged in as: { loggedUsername }
        <Button type="submit" onClick={onLogoutRequest}>(Logout)</Button>
      </div>
    )
  }
  return (
    <div>
      <p>
        {loginFailed ? 'Login failed.' : ''}
      </p>
      Username
      <input ref={(node) => {
        inputUsernameField = node
      }} />
      Password
      <input ref={(node) => {inputPasswordField = node}} />
      <Button type="submit" onClick={onSubmit}>(Login)</Button>
    </div>
  )
}

LoginPanel.propTypes = {
  loggedIn: PropTypes.bool,
  onLoginRequest: PropTypes.func,
  onLogout: PropTypes.func,
  loggedUsername: PropTypes.string,
}

export default LoginPanel
