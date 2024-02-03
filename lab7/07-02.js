let http = require('http');
let query = require('querystring');

let params = query.stringify({x: 3, y: 5});
let path = `/2?${params}`;

console.log('params: ', params);
console.log('path: ', path);

let options = {
    host: 'localhost',
    path: path,
    port: 5000,
    method: 'GET'
}
const req = http.request(options, (res) => {
    let data = '';

    res.on('end', () => {
        console.log(`Статус ответа: ${res.statusCode}`);
        console.log(`Тело ответа: ${data}`);
      });
});

req.on('error', (e) => {
    console.log('error: ', e.message);
});
req.end();