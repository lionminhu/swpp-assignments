import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Meeting from '../../../components/atoms/Meeting'


const MeetingList = ({ meetingList, loggedIn, username, password, onDeleteMeeting }) => {
  if (loggedIn) {
    return (
      <ul>
        {meetingList.map(meeting =>
          <Meeting
            key={meeting.id}
            loggedInUser={username}
            password={password}
            onDeleteMeeting={onDeleteMeeting}
            {...meeting}
          />
        )}
      </ul>
    )
  } else {
    return <div />
  }
}

MeetingList.propTypes = {
  meetingList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      created: PropTypes.string,
      sinceWhen: PropTypes.string,
      tilWhen: PropTypes.string,
      user: PropTypes.string,
    })
  ),
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  onDeleteMeeting: PropTypes.func,
  reverse: PropTypes.bool,
}

export default MeetingList
