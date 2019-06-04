import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../Button'

const Meeting = ({ id, user, created, sinceWhen, tilWhen, loggedInUser, onDeleteMeeting, password }) => {
  const onDelete = () => {
    onDeleteMeeting(user, password, id)
  }
  return (
    <ul>
      <li>meeting id: {id} </li>
      <li>created by: {user} </li>
      <li>created in: {created} </li>
      <li>since: {sinceWhen} </li>
      <li>until: {tilWhen} </li>
      {
        (loggedInUser === user) ? (
          <Button type="submit" onClick={onDelete}>(Cancel)</Button>
        ) : ("")
      }
      <br />
      <br />
    </ul>
  )
}

Meeting.propTypes = {
  id: PropTypes.number,
  user: PropTypes.string,
  created: PropTypes.string,
  sinceWhen: PropTypes.string,
  tilWhen: PropTypes.string,
  loggedInUser: PropTypes.string,
  onDeleteMeeting: PropTypes.func,
  password: PropTypes.string,
  reverse: PropTypes.bool,
}

export default Meeting
