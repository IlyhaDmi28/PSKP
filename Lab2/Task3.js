const http = require('http');


const server = http.createServer((req, res) => {
  if (req.url === '/api/name' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Дмитрук Илья Игоревич');
      }
});

server.listen(5000, () => {
  console.log("Сервер начал прослушивание запросов на порту 5000");
});





