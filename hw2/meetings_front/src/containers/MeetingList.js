import {connect} from 'react-redux'
import MeetingList from '../components/molecules/MeetingList/index'
import {deleteMeeting} from '../store/meetinglist/actions'

const mapStateToProps = (state) => {
  return {
    meetingList: state.meetinglist.meetings,
    loggedIn: state.meetinglist.loggedIn,
    username: state.meetinglist.username,
    password: state.meetinglist.password,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteMeeting: (username, password, id) => {
      dispatch(deleteMeeting(username, password, id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingList)
