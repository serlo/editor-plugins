import {
  Editable,
  createEditableIdentifier
} from '@splish-me/editor/dist/editable.component'
import * as React from 'react'
import slate from 'ory-editor-plugins-slate'
//import * as uuid from 'uuid'
import Display from './Display'
import Input from './Input'
import SCButton from './Button/SCButton'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

export default class SCEXercise extends React.Component {
  handleCheckboxChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.props.onChange({
      [name]: value
    })
  }

  removeButton = () => {
    //TODO
  }
  addButton = () => {
    const { onChange, state } = this.props

    onChange({
      answers: [
        ...state.answers,
        {
          id: createEditableIdentifier(),
          isCorrect: false,
          feedback: null
        }
      ]
    })
  }

  render() {
    const { readOnly, state } = this.props
    const { question, answers } = state

    return (
      <React.Fragment>
        {readOnly ? (
          <Display {...this.props} />
        ) : (
          <React.Fragment>
            <Tabs>
              <TabList>
                <Tab>Multiple Choice</Tab>
                <Tab>Single Choice</Tab>
              </TabList>
              <div style={{ border: '3px solid black' }}>
                <Editable id={question} />
              </div>
              <hr />
              <TabPanel>
                <div>
                  <div>
                    {answers.map((answer, index) => {
                      return (
                        <SCButton
                          removeButton={this.removeButton}
                          key={index}
                          index={index}
                          {...this.props}
                        >
                          <Editable id={answer} />
                        </SCButton>
                      )
                    })}
                    <button onClick={this.addButton}>Add Answer</button>{' '}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <div>
                    {answers.map((answer, index) => {
                      return (
                        <SCButton
                          removeButton={this.removeButton}
                          key={index}
                          index={index}
                          {...this.props}
                          isSingleChoice
                        >
                          <Editable id={answer} />
                        </SCButton>
                      )
                    })}
                    <button onClick={this.addButton}>Add Answer</button>{' '}
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}
