// Markdown 内容展示组件

import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'
import customRenderers from './renderers'

interface Iprops {
  className?: string
  source: string
}

export default memo(function Markdown({ className, source, ...rest }: Iprops) {
  const classes = classnames('markdown-body', className)

  return (
    <div className={classes} {...rest}>
      <ReactMarkdown skipHtml source={source} renderers={customRenderers} />
    </div>
  )
})
