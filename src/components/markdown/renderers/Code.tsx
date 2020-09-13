import React, { PureComponent } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs'

class CodeBlock extends PureComponent<{ language: string; value: string }, {}> {
  static defaultProps = {
    language: null,
  }

  render() {
    const { language, value = '' } = this.props

    return (
      <SyntaxHighlighter language={language} style={vs}>
        {value}
      </SyntaxHighlighter>
    )
  }
}

export default CodeBlock
