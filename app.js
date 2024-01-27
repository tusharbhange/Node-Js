const http = require('http');

const server = http.createServer((req,res)=>{
    Response.writeHead(200,{'Content-type': 'text/plain'});

    console.log('My name is Tushar')

    Response.end('My name is Tushar')
});

server.listen(4000,()=>{
    console.log('Port is 4000: ');
});