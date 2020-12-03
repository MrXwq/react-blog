// const withCss = require('@zeit/next-css')
// if (typeof require !== 'undefined') {
//   require.extensions['.css'] = file => {}
// }
// module.exports = withCss({})
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
module.exports = withSass(withCSS({}))