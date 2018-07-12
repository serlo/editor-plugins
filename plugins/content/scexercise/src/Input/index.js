import { Editable } from '@splish-me/editor/src/editable.component'
import { Button } from 'glamorous'
import '../index.css'

export default class Input extends React.Component {
  render() {
    const { handleValueChange } = this.props
    return (
      <React.Fragment>
        <Editable id={question} />
        <hr />
        <Editable id={answers} />
        <Button className="addButton"> Add Answer</Button>
      </React.Fragment>
    )
  }
}
