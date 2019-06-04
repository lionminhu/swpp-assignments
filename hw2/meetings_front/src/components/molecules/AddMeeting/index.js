import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

export const AddMeeting = ({onAddMeeting, stateParam}) => {
  const loggedIn = stateParam.loggedIn
  const addMeetingFailed = stateParam.addMeetingFailed
  let inputSinceWhenField
  let inputTilWhenField
  const onSubmit = () => {
    if (inputSinceWhenField !== undefined && inputSinceWhenField.value !== ''
      && inputTilWhenField !== undefined && inputTilWhenField.value) {
      onAddMeeting(inputSinceWhenField.value, inputTilWhenField.value, stateParam)
      inputSinceWhenField = undefined
      inputTilWhenField = undefined
    }
  }
  if (loggedIn){
    return (
      <div>
        { addMeetingFailed ? (<p> Add meeting failed. </p>) : ('') }
        since:
        <input ref={node => {inputSinceWhenField = node}} />
        until:
        <input ref={node => {inputTilWhenField = node}} />
        <Button type="submit" onClick={onSubmit}>(Add meeting)</Button>
      </div>
    )
  }
  return <div />
}

AddMeeting.propTypes = {
  onAddMeeting: PropTypes.func,
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default AddMeeting
