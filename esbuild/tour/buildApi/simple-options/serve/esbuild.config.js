require('esbuild').serve({
  servedir: 'serve',
  // port: 8000
}, {
  entryPoints: ['src/app.js'],
  outdir: 'serve/js',
  bundle: true
}).then(server => {
  console.log("server info:", server)
  // Call "stop" on the web server to stop serving
  // server.stop()
})