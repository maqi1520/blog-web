import React, { ReactElement, useState, useCallback, useRef } from 'react'
import { Button, Input, Divider, message } from 'antd'
import {
  MinusOutlined,
  PictureOutlined,
  LinkOutlined,
  BoldOutlined,
  ItalicOutlined,
  FontSizeOutlined,
  RedoOutlined,
  UndoOutlined,
  StrikethroughOutlined,
  BarsOutlined,
  DoubleRightOutlined,
  CheckSquareOutlined,
  OrderedListOutlined,
  RetweetOutlined,
  TableOutlined,
  LeftOutlined,
} from '@ant-design/icons'
import api from '@/common/api'
import IconButton from '@/components/IconButton'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { markdownToHtml } from '@/common/markdown'

const Codemirror = dynamic(() => import('@/components/codemirror'), {
  ssr: false,
})
//const Markdown = dynamic(() => import('@/components/markdown'), { ssr: false })

// 插入内容
const HEADING = (t: string) => `## ${t || '标题'}`
const BOLD = (t: string) => `**${t || '粗体'}**`
const ITALIC = (t: string) => `_${t || '斜体'}_`
const STRIKETHROUGH = (t: string) => `~~${t || '删除线'}~~`
const UNORDERED_LIST = (t: string) => `- ${t || '无序列表'}`
const ORDERED_LIST = (t: string) => `1. ${t || '无序列表'}`
const CHECK_LIST = (t: string) => `- [] ${t || '可选列表'}`
const QUOTE = (t: string) => `> ${t || '引用'}`
const TABLE = (t: string) => `\n| | |\n|--|--|\n|  |  |`
const CODE = (t: string) => '\n```\n' + (t || '代码') + '\n```'
const LINK = (t: string) => `[${t || '链接'}](地址)`
const IMAGE = (t: string) => `[${t || '链接'}](地址)`
const DIVIDER = (t: string) => '---'

export default function Create(): ReactElement {
  const editorRef: React.MutableRefObject<any> = useRef(null)
  const [value, setValue] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const [editable, setEditable] = useState<boolean>(true)

  const insertContent = useCallback((fn) => {
    editorRef.current?.insertText(fn)
  }, [])
  const handleUndo = useCallback(() => {
    editorRef.current.editor.undo()
  }, [])
  const handleRedo = useCallback(() => {
    editorRef.current.editor.redo()
  }, [])
  const insertHeading = useCallback(() => {
    insertContent(HEADING)
  }, [insertContent])
  const insertBold = useCallback(() => {
    insertContent(BOLD)
  }, [insertContent])
  const insertItalic = useCallback(() => {
    insertContent(ITALIC)
  }, [insertContent])
  const insertStrikethrough = useCallback(() => {
    insertContent(STRIKETHROUGH)
  }, [insertContent])
  const insertUnorderedList = useCallback(() => {
    insertContent(UNORDERED_LIST)
  }, [insertContent])
  const insertOrderedList = useCallback(() => {
    insertContent(ORDERED_LIST)
  }, [insertContent])
  const insertCheckList = useCallback(() => {
    insertContent(CHECK_LIST)
  }, [insertContent])
  const insertQuote = useCallback(() => {
    insertContent(QUOTE)
  }, [insertContent])
  const insertTable = useCallback(() => {
    insertContent(TABLE)
  }, [insertContent])
  const insertCode = useCallback(() => {
    insertContent(CODE)
  }, [insertContent])
  const insertLink = useCallback(() => {
    insertContent(LINK)
  }, [insertContent])
  const insertImage = useCallback(() => {
    insertContent(IMAGE)
  }, [insertContent])

  const insertDivider = useCallback(() => {
    insertContent(DIVIDER)
  }, [insertContent])

  const router = useRouter()

  const handleSave = useCallback(async () => {
    try {
      const { data: res } = await api.post('/article', {
        content: value,
        title,
      })
      if (res) {
        router.push('/')
      }
    } catch (error) {
      message.error(error.message)
    }
  }, [router, title, value])

  return (
    <div className="create-page">
      <div className="create-header">
        <div className="back-btn">
          <LeftOutlined style={{ fontSize: 18 }} />
        </div>
        <div className="input-box">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入标题"
          />
        </div>
        <div className="header-action">
          <Button
            style={{ marginRight: 20 }}
            onClick={() => setEditable(!editable)}
            type="default"
          >
            预览
          </Button>
          <Button
            onClick={handleSave}
            style={{ marginRight: 20 }}
            type="primary"
          >
            发布
          </Button>
        </div>
      </div>
      <div className="create-body">
        <div className="toolbar">
          <div className="toolbar-inner">
            <IconButton
              title="撤销"
              style={{ transform: 'rotate(90deg)' }}
              icon={<UndoOutlined />}
              onClick={handleUndo}
            />
            <IconButton
              title="重做"
              style={{ transform: 'rotate(-90deg)' }}
              icon={<RedoOutlined />}
              onClick={handleRedo}
            />
            <Divider type="vertical" />
            <IconButton
              title="标题"
              icon={<FontSizeOutlined />}
              onClick={insertHeading}
            />
            <Divider type="vertical" />
            <IconButton
              title="粗体"
              icon={<BoldOutlined />}
              onClick={insertBold}
            />
            <IconButton
              title="斜体"
              icon={<ItalicOutlined />}
              onClick={insertItalic}
            />
            <IconButton
              title="删除线"
              icon={<StrikethroughOutlined />}
              onClick={insertStrikethrough}
            />
            <Divider type="vertical" />
            <IconButton
              title="无序列表"
              icon={<BarsOutlined />}
              onClick={insertUnorderedList}
            />
            <IconButton
              title="有序列表"
              icon={<OrderedListOutlined />}
              onClick={insertOrderedList}
            />
            <IconButton
              title="可选列表"
              icon={<CheckSquareOutlined />}
              style={{ padding: '0 8px' }}
              onClick={insertCheckList}
            />
            <Divider type="vertical" />
            <IconButton
              title="引用"
              icon={<DoubleRightOutlined />}
              style={{ padding: '0 8px' }}
              onClick={insertQuote}
            />
            <IconButton
              title="表格"
              icon={<TableOutlined />}
              onClick={insertTable}
            />
            <IconButton
              title="代码"
              icon={<RetweetOutlined />}
              onClick={insertCode}
            />
            <Divider type="vertical" />
            <IconButton
              title="链接"
              icon={<LinkOutlined />}
              onClick={insertLink}
            />
            <IconButton
              title="图片"
              icon={<PictureOutlined />}
              onClick={insertImage}
            />
            <Divider type="vertical" />
            <IconButton
              title="分割线"
              icon={<MinusOutlined />}
              onClick={insertDivider}
            />
          </div>
        </div>
        <div className="create-content">
          {editable ? (
            <Codemirror
              ref={editorRef}
              className="markdown-editor"
              value={value}
              onChange={setValue}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }}
            ></div>
          )}
        </div>
      </div>
    </div>
  )
}
