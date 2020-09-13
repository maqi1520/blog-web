import CodeMirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/xml/xml'
import React, { Component, CSSProperties } from 'react'

interface Props {
  ref?: any
  style?: CSSProperties
  readOnly?: boolean
  defaultValue?: string
  className?: string
  onChange?: (value: string) => void
  forceTextArea?: boolean
  value?: string
}
interface State {
  isControlled: boolean
}

const IS_MOBILE =
  typeof navigator === 'undefined' ||
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i)

export default class CodeMirrorEditor extends Component<Props, State> {
  editor: CodeMirror.EditorFromTextArea | undefined
  editorRef: React.RefObject<HTMLTextAreaElement>
  constructor(props: Props) {
    super(props)
    this.state = { isControlled: Boolean(this.props.value) }
    this.editorRef = React.createRef<HTMLTextAreaElement>()
  }

  componentDidMount() {
    const isTextArea = this.props.forceTextArea || IS_MOBILE
    if (!isTextArea && this.editorRef.current) {
      this.editor = CodeMirror.fromTextArea(this.editorRef.current, {
        mode: 'markdown',
        addModeClass: true,
        autofocus: true,
        lineNumbers: false,
        lineWrapping: true,
      })
      this.editor.on('change', this.handleChange)
    }
  }

  insertText = (fn: (text?: string) => string) => {
    if (!this.editor) {
      return
    }

    const editor = this.editor
    const sel = this.editor.getSelection()
    if (sel) {
      const text = fn(sel)
      editor.replaceSelection(text)
    } else {
      const form = this.editor.getCursor()
      const text = fn()
      editor.replaceRange(text, form)
    }
    editor.focus()
  }

  componentDidUpdate() {
    if (!this.editor) {
      return
    }

    if (this.props.value && this.editor.getValue() !== this.props.value) {
      this.editor.setValue(this.props.value)
    }
  }

  handleChange = () => {
    if (!this.editor) {
      return
    }
    const value = this.editor.getValue()
    if (value === this.props.value) {
      return
    }
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }
  onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //this.props.onChange(e.target.value)
  }

  render() {
    const { className, style, value, defaultValue, readOnly } = this.props

    return (
      <div style={style} className={className}>
        <textarea
          style={{ height: '100%' }}
          value={value}
          readOnly={readOnly}
          defaultValue={defaultValue}
          onChange={this.onChange}
          ref={this.editorRef}
        ></textarea>
      </div>
    )
  }
}
