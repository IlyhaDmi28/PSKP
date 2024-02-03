const http = require("http");

let h = (r) => {
    let rc = '';
    for(key in r.headers) rc += '<p>' + key + ':' + r.headers[key] + '</p>';
    return rc;
}

http.createServer(function(request, response){
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })


    let data = '';
    request.on('data', (chunk) => {
        data += chunk;
    });

    request.on('end', () => {

        const responseHtml = `
          <html>
          <head>
            <title>HTTP Request Info</title>
          </head>
          <body>
            <h3>Структура HTTP запроса</h3>
            <p>Метод запроса: ${request.method}</p>
            <p>URI: ${request.url}</p>
            <p>Версия протокола: HTTP/${request.httpVersion}</p>
            <p>Заголовки: ${h(request)}</p>
            <p>Тело запроса: ${data}</p>
          </body>
          </html>
        `;

        response.end(responseHtml);
      });
     
}).listen(3000, "127.0.0.1", function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});