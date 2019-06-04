import {connect} from 'react-redux'
import {AddMeeting} from '../components/molecules/AddMeeting'
import {addMeeting, postMeetingRequest} from '../store/meetinglist/actions'

const mapStateToProps = (state) => {
  return {
    stateParam: state.meetinglist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMeeting: (inputSinceWhen, inputTilWhen, stateParam) => {
      dispatch(addMeeting(inputSinceWhen, inputTilWhen, stateParam))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeeting)
