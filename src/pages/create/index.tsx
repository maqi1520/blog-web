import React, {
  ReactElement,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { Button, Input, Divider, message, Row, Col } from 'antd'
import CodeMirror from 'codemirror'
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
import api, { getArticle } from '@/common/api'
import IconButton from '@/components/IconButton'
import Auth from '@/components/layout/Auth'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { markdownToHtml } from '@/common/markdown'
import { Article } from '@/types'
import { OnRef } from '@/components/codemirror'
import Head from 'next/head'
import { BLOG_NAME } from '@/common/config'

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
const TABLE = () => `\n| | |\n|--|--|\n|  |  |`
const CODE = (t: string) => '\n```\n' + (t || '代码') + '\n```'
const LINK = (t: string) => `[${t || '链接'}](地址)`
const IMAGE = (t: string) => `[${t || '链接'}](地址)`
const DIVIDER = () => '---'

export default function Create(): ReactElement {
  const router = useRouter()
  const { id } = router.query
  const [data, setArticle] = useState<Article>({
    title: '',
    content: '',
  })
  useEffect(() => {
    if (id) {
      getArticle<Article>(id as string).then((res) => {
        setArticle(res)
      })
    }
  }, [id])

  const [height, setHeight] = useState<string | number>('100%')
  useEffect(() => {
    setHeight(document.body.clientHeight - 56 - 40 - 32)
  }, [])

  const previewRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<OnRef | null>(null)
  const [editable, setEditable] = useState<boolean>(true)

  const insertContent = useCallback((fn) => {
    editorRef.current?.insertText(fn)
  }, [])
  const handleUndo = useCallback(() => {
    editorRef.current?.editor.undo()
  }, [])
  const handleRedo = useCallback(() => {
    editorRef.current?.editor.redo()
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

  const setValue = useCallback((content) => {
    setArticle((prev) => ({ ...prev, content }))
  }, [])
  const setTitle = useCallback((title) => {
    setArticle((prev) => ({ ...prev, title }))
  }, [])

  const onEditorRef = useCallback((v: OnRef) => {
    editorRef.current = v
  }, [])

  const onScroll = useCallback((value: CodeMirror.ScrollInfo) => {
    if (previewRef.current) {
      previewRef.current.scrollTop = Math.round(
        previewRef.current.scrollHeight * (value.top / value.height)
      )
    }
  }, [])

  const handleSave = useCallback(async () => {
    try {
      if (!data.id) {
        const { data: res } = await api.post('/article', data)
        if (res) {
          router.push('/')
        }
      } else {
        const { data: res } = await api.put(`/article/${data.id}`, data)
        if (res) {
          router.push('/')
        }
      }
    } catch (error) {
      message.error(error.message)
    }
  }, [router, data])

  return (
    <Auth>
      <div className="create-page">
        <Head>
          <title>{`写文章-${BLOG_NAME}`}</title>
        </Head>
        <div className="create-header">
          <div className="back-btn">
            <Link href="/">
              <LeftOutlined style={{ fontSize: 18 }} />
            </Link>
          </div>
          <div className="input-box">
            <Input
              value={data.title}
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
          <Row style={{ padding: 16 }} gutter={16}>
            <Col span={editable ? 12 : 24}>
              <div
                style={{ height, paddingRight: 0 }}
                className="create-content"
              >
                <Codemirror
                  onRef={onEditorRef}
                  className="markdown-editor"
                  value={data.content || ''}
                  onChange={setValue}
                  onScroll={onScroll}
                />
              </div>
            </Col>
            <Col span={editable ? 12 : 0}>
              {editable && (
                <div
                  ref={previewRef}
                  style={{ height }}
                  className="create-content markdown-preview"
                  dangerouslySetInnerHTML={{
                    __html: markdownToHtml(data.content || ''),
                  }}
                ></div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Auth>
  )
}
