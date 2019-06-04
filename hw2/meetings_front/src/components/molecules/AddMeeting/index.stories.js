import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AddMeeting } from 'components'

storiesOf('AddMeeting', module)
  .add('default', () => (
    <AddMeeting>Hello</AddMeeting>
  ))
  .add('reverse', () => (
    <AddMeeting reverse>Hello</AddMeeting>
  ))
