const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname , req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {

        '.html' : 'text/html',
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.json' : 'application/json',
        '.png' : 'image/png',
        '.jpg' : 'image/jpg',
        '.gif' : 'image/gif',
    }
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    let content;

    try {
        content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf8');
    } catch (err) {
        if(err.code == 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404: File not found ! Please go throught correct URL');
        } else {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('500: Internal Server Error! Please try again later');
        }
        return;
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

