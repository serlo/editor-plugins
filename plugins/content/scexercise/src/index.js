import React from 'react'
import SCExercise from './SCExercise'
import plugin from './plugin'

export default {
  ...plugin,
  Component: SCExercise,
  IconComponent: <img src={null} />,
  text: 'Single Choice Aufgabe',
  createInitialState: () => ({
    question: uuid.v4(),
    answers: uuid.v4()
  })
}
