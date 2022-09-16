import React from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-sql'
import './code-editor.css'

const code = 'SELECT * FROM ...'

class CodeEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code: props.code || code
    }
  }

  render () {
    return (
      <Editor
        value={this.state.code}
        onValueChange={code => this.setState({ code })}
        highlight={code => highlight(code, languages.sql)}
        padding={10}
        onBlur={this.props.onBlur}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          border: '1px black solid'
        }}
      />
    )
  }
}

export default CodeEditor
