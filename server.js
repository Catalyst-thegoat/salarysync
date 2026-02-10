const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 3010

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      product: 'SalarySync',
      status: 'running',
      version: '1.0.0',
      type: 'Moroccan Payroll SaaS',
      features: ['IR Calculation', 'CNSS 4.48%', 'AMO 2.26%', 'PDF Payslips']
    }))
    return
  }

  let filePath = req.url === '/' ? '/index.html' : req.url
  filePath = path.join(__dirname, 'public', filePath)
  
  const ext = path.extname(filePath)
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404)
      res.end('Not Found')
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content)
    }
  })
})

server.listen(PORT, () => {
  console.log(`🚀 SalarySync running on http://localhost:${PORT}`)
})
