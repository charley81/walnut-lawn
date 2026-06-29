// Fix Sanity Studio asset paths for serving from /studio subpath
const fs = require('fs')
const path = require('path')

const indexPath = path.join('public', 'studio', 'index.html')
let html = fs.readFileSync(indexPath, 'utf8')
html = html.replace(/="\/static\//g, '="/studio/static/')
fs.writeFileSync(indexPath, html)
console.log('Fixed Studio asset paths to /studio/ prefix')
