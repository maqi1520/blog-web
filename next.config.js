const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')

const fs = require('fs')
const path = require('path')
const { nodeModuleNameResolver } = require('typescript')

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './src/styles/antd-custom.less'),
    'utf8'
  )
)

let rewrites = [
  {
    source: '/page/:path*',
    destination: `/?pageNum=:path*`,
  },
]
if (process.env.NODE_ENV !== 'production') {
  rewrites.push({
    source: '/api/:path*',
    destination: `http://localhost:4000/api/:path*`,
  })
}

module.exports = withLess({
  async rewrites() {
    return rewrites
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
    modifyVars: themeVariables, // make your antd custom effective
  },
  distDir: 'build',
})
