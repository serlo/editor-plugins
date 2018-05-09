import React from 'react'
import Quote from 'material-ui/svg-icons/communication/comment'
import Feedback from './Feedback'
import plugin from './plugin'

export default {
    ...plugin,
    Component: Feedback,
    IconComponent: <Quote />,
    text: 'Feedback'
}