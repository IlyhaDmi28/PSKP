const http = require('http');
const querystring = require('querystring');
const url = require('url');


const server = http.createServer(function (req, res) {
    let reg = /^\/fact.?k=(\d+)$/;
    
    
    if (reg.test(req.url)) {
        let parsedUrl = url.parse(req.url);
        let queryParams = querystring.parse(parsedUrl.query);   
        let factorialArg = Number.parseInt(queryParams.k);        

        let f = factorial(factorialArg);

        let result = {
            k: factorialArg,
            fact: f
        };

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(result));
    }

});

server.listen(5000, () => {
    console.log("Сервер начал прослушивание запросов на порту 5000");
});

function factorial(arg = 1) {
    if (arg <= 1)
        return 1;

    return arg * factorial(arg - 1);
}