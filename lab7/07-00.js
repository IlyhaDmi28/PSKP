const http = require('http');
const url = require("url");
const xml2js = require('xml2js');
let mp = require('multiparty');
const fs = require("fs");

http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);

    switch (parsedUrl.pathname) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("");
            break;
        case "/2": {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            let x = parsedUrl.query.x;
            let y = parsedUrl.query.y;
            res.end(`x = ${x}, y = ${y}`);
            break;
        }
        case "/3": {
            let data = '';

            req.on('data', (chunk) => {
                data += chunk;
            });

            req.on('end', () => {
                const postData = JSON.parse(data);
                let x = postData.x;
                let y = postData.y;
                let s = postData.s;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(`x = ${x}, y = ${y}, s = ${s}`);
            });

            break;
        }
        case "/4":
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            
            req.on('end', () => {
                data = JSON.parse(data);
                res.writeHead(200, {'Content-type': 'application/json; charset=utf-8'});
                let comment = 'Ответ. Лабораторная работа 8/10';
                let resp = {};
                resp.__comment = comment;
                resp.x_plus_y = data.x + data.y;
                resp.Concatenation_s_o = data.s + ': ' + data.o.surname + ', ' + data.o.name;
                resp.Length_m = data.m.length;
                res.end(JSON.stringify(resp));
            });
            break;
        case "/5": {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                xml2js.parseString(data, (err, result) => {
                    res.writeHead(200, {'Content-type': 'application/xml'});
                    const req = result.req;
                    const id = req.id;
                    const xs = req.x.map(x => +x.$.value || 0);
                    const ms = req.m.map(m => m.$.value);

                    const sumX = xs.reduce((acc, curr) => acc + curr, 0);
                    const concatM = ms.join('');


                    const resBody = {
                        res: {
                            $: { id: id, req: id },
                            sum: { $: { element: 'x', result: sumX.toString() } },
                            concat: { $: { element: 'm', result: concatM } }
                        }
                    };
                    const builder = new xml2js.Builder();
                    const xml = builder.buildObject(resBody);

                    res.writeHead(200, { 'Content-Type': 'application/xml' });
                    res.end(xml);
                });
            });
            break;
        }
        case "/6":
            let result = '';
            let form = new mp.Form({uploadDir: './static'});

            form.on('field', (name, field) => {
                console.log(field);
                result += `'${name}' = ${field}`;
            });

            form.on('file', (name, file) => {
                console.log(name, file);
                result += `'${name}': Original filename – ${file.originalFilename}, Filepath – ${file.path}`
            });

            form.on('error', (err) => {
                res.writeHead(500, {'Content-Type': 'text/html'});
                console.log('error', err.message);
                res.end('Form error.');
            });

            form.on('close', () => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('Form data:');
                res.end(result);
            });

            form.parse(req);
            break;
        case "/7":
            res.writeHead(200, {'Content-Type': 'text/html'});
            let file = fs.readFileSync("./static/file_server.png");
            res.end(file);
            break;
    }
}).listen(5000, () => console.log('Server is running at http://localhost:5000'));