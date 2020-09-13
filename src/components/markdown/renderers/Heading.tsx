import React, { memo, ReactElement } from 'react'
import uslug from 'uslug'

interface Iprops {
  level: number
  children: ReactElement
}
export default memo(function Heading(props: Iprops) {
  const children = React.Children.toArray(props.children)
  const text = children.reduce(flatten, '')
  const id = uslug(text)
  return React.createElement('h' + props.level, { id }, props.children)
})

function flatten(text: string, child: any): string {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
}
