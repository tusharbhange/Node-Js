const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<body>');
        res.write('<form action="/message" method="POST"><input type="text" name="message"/><button>Send</button></form>');
        res.write('<form action="/home" method="POST"><button>Home</button></form>');
        res.write('<form action="/about" method="POST"><button>About</button></form>');
        res.write('<form action="/node" method="POST"><button>Node</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if(url ==='/message' && method==='POST'){
        const body =[];
        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        });
       
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
    }
    if (url === '/home') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><h1>Welcome to home</h1></body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/about') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><h1>Welcome to About Us Page</h1></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/node') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><h1>Welcome to my Node Js project</h1></body>');
        res.write('</html>');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><h1>Welcome to my first Node Js Project</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(4000, () => {
    console.log('Port is 4000');
});
