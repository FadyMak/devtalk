import marked from 'marked'

const renderer = new marked.Renderer()

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs ', // add highlight.js class (`hljs`) to code blocks
  highlight: (code, lang) => {
    return require('highlight.js').highlightAuto(code).value
  }
})

export default (markdown) => marked(markdown)
