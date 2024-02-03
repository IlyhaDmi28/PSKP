const http = require('http');
const querystring = require('querystring');
const url = require('url');

const server = http.createServer(function (req, res) {
    let reg = /^\/fact.?k=(\d+)$/;
    
    if (reg.test(req.url)) {
        let parsedUrl = url.parse(req.url);
        let queryParams = querystring.parse(parsedUrl.query);   
        let factorialArg = Number.parseInt(queryParams.k);        

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const startTime = new Date();

        for (let x = 0; x < factorialArg; x++) {
            setImmediate(() => {
                let f = factorial(x);
                let t = Date.now() - startTime;

                let result = {
                    k: x,
                    fact: f,
                    time: t
                };

                if(x < factorialArg - 1) res.write(JSON.stringify(result) + "\n");
                else res.end(JSON.stringify(result));
            });
        }
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