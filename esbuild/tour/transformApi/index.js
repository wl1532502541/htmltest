let res = require('esbuild').transformSync('let x: number = 1', {
  loader: 'ts',
})
console.log(res)  //  { warnings: [], code: 'let x = 1;\n', map: '' }