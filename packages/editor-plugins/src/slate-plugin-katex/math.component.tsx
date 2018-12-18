import KaTeX from 'katex'
import * as React from 'react'

const createMathComponent = (Component, { displayMode }) => {
  class MathComponent extends React.Component {
    constructor(props) {
      super(props)

      this.usedProp = props.math ? 'math' : 'children'

      this.state = this.createNewState(null, props)
    }

    componentWillReceiveProps() {
      this.setState(this.createNewState)
    }

    shouldComponentUpdate(nextProps) {
      return nextProps[this.usedProp] !== this.props[this.usedProp]
    }

    createNewState(prevState, props) {
      try {
        const html = this.generateHtml(props)

        return { html, error: undefined }
      } catch (error) {
        if (error instanceof KaTeX.ParseError || error instanceof TypeError) {
          return { error }
        }

        throw error
      }
    }

    generateHtml(props) {
      const { errorColor, renderError } = props

      return KaTeX.renderToString(props[this.usedProp], {
        displayMode,
        errorColor,
        throwOnError: !!renderError
      })
    }

    render() {
      const { error, html } = this.state
      const { renderError } = this.props

      if (error) {
        return renderError ? (
          renderError(error)
        ) : (
          <Component html={`${error.message}`} />
        )
      }

      return <Component html={html} />
    }
  }

  return MathComponent
}

const IBlockMath = ({ html }: { html: string }) => {
  return (
    <span
      style={{ display: 'block' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

const BlockMath = createMathComponent(IBlockMath, { displayMode: true })

const IInlineMath = ({ html }: { html: string }) => {
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

const InlineMath = createMathComponent(IInlineMath, {
  displayMode: false
})

const handleError = (formula, error, inline, oldErrorPosition) => {
  const errorStyle = {
    color: '#CC0000'
  }

  if (error.position === oldErrorPosition) {
    return <span style={errorStyle}>{formula}</span>
  }

  const beforeError = formula.substring(0, error.position)
  const afterError = formula.substring(error.position)
  return (
    <span
      style={{
        display: 'inline-block'
      }}
    >
      <Math
        formula={beforeError}
        inline={inline}
        oldErrorPosition={error.position}
      />
      <span style={errorStyle}>{afterError}</span>
      <span style={{ ...errorStyle, display: 'block' }}>
        <b>
          {error.name}: {error.message}
        </b>
      </span>
    </span>
  )
}

export const Math = ({ inline, formula, oldErrorPosition }) => {
  // hack... empty string doesn't work. FIXME
  if (!formula) {
    return null
  }

  const Component = inline ? InlineMath : BlockMath
  return (
    <Component
      math={formula}
      renderError={error =>
        handleError(formula, error, inline, oldErrorPosition)
      }
    />
  )
}

export default Math
