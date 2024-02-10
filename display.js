const http = require('http');

let enteredMessage = ''; // Variable to store the entered message

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<body>');
        res.write(`<p> ${enteredMessage}</p>`); // Display entered message
        res.write('<form action="/message" method="POST">');
        res.write('<input type="text" name="message" />');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]; // Assuming message is sent as "message=some_message"
            enteredMessage = message; // Store the entered message
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    }

    res.end();
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
