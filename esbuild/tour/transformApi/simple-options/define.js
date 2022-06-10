let js = 'hooks = DEBUG && require("hooks")'
let res = require('esbuild').transformSync(js, {
  define: { DEBUG: 'true' },
})
console.log(res)
// {
//   code: 'hooks = require("hooks");\n',
//   map: '',
//   warnings: []
// }
res = require('esbuild').transformSync(js, {
  define: { DEBUG: 'false' },
})
console.log(res);
// {
//   code: 'hooks = false;\n',
//   map: '',
//   warnings: []
// }