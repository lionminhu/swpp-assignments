import React from 'react'
import AddMeeting from '../../../containers/AddMeeting'
import MeetingList from '../../../containers/MeetingList'
import LoginPanel from '../../../containers/LoginPanel'

const HomePage = () => {
  return (
    <div>
      <LoginPanel />
      <AddMeeting />
      <MeetingList />
    </div>
  )
}

export default HomePage
