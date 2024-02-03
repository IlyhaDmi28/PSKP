const http = require("http");

http.createServer(function(request,response){
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end("<h1>Hello World!</h1>");
     
}).listen(3000, "127.0.0.1", function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});