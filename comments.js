// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/comments' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(path.join(__dirname, 'comments.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error: File not found');
            } else {
                res.end(data);
            }
        });
    } else if (req.url === '/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.appendFile(path.join(__dirname, 'comments.html'), `<p>${body}</p>`, err => {
                if (err) {
                    res.writeHead(404);
                    res.end('Error: File not found');
                } else {
                    res.end('Comment was added');
                }
            });
        });
    } else {
        res.writeHead(404);
        res.end('Error: Route not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});