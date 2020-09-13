const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')

const fs = require('fs')
const path = require('path')

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './src/styles/antd-custom.less'),
    'utf8'
  )
)

module.exports = withLess({
  async rewrites() {
    return process.env.NODE_ENV !== 'production'
      ? [
          {
            source: '/api/:path*',
            destination: `http://localhost:4000/api/:path*`,
          },
          {
            source: '/page/:path*',
            destination: `/?pageNum=:path*`,
          },
        ]
      : []
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
    modifyVars: themeVariables, // make your antd custom effective
  },
  distDir: 'build',
})
