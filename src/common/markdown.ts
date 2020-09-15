import remark from 'remark'
import html from 'remark-html'
import slug from 'remark-slug'
import toc from 'mdast-util-toc'
import highlight from 'remark-highlight.js'

function mytoc() {
  return (tree: any) => {
    var ast = toc(tree, {
      maxDepth: 6,
    })
    tree.children = [ast.map]
  }
}

export function markdownToToc(markdown: string) {
  const result = remark().use(slug).use(mytoc).use(html).processSync(markdown)
  return result.toString()
}

export function markdownToHtml(markdown: string) {
  const result = remark()
    .use(slug)
    .use(highlight)
    .use(html)
    .processSync(markdown)
  return result.toString()
}
