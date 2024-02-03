const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require("fs");
const xml2js = require('xml2js');
const path = require('path');

let keepAliveTimeout = 60;

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const queryParams = reqUrl.query;
    

    switch(reqUrl.pathname) {
        case '/connection': {
            if (queryParams.set) {
                keepAliveTimeout = parseInt(queryParams.set);
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8',});
                res.end(`Установлено новое значение параметра KeepAliveTimeout: ${keepAliveTimeout}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8',});
                res.end(`Текущее значение параметра KeepAliveTimeout: ${keepAliveTimeout}`);
            }
            break;
        }
        case '/headers': {
            let h = (req) => {
                let rc = '';
                for (key in req.headers) {
                    rc += '<h3>' + key + ':'+ req.headers[key]+'</h3>';
                }
                return rc;
            }

            res.setHeader('Connection', 'keep-alive');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.writeHead(200);

            let resHeaders = res.getHeaders();

            let resultResHeaders = '';
            for (let key in resHeaders) {
                resultResHeaders += '<h3>' + key + ':'+ resHeaders[key]+'</h3>';
            }

            res.end(
                '<!DOCTYPE html> <html>' +
                '<head></head>' +
                '<body>' +
                '<h1>'+'Request Headers : '+'</h1>' + h(req) +
                '<h1>'+'Response Headers : '+'</h1>' + resultResHeaders +
                '</body>'+
                '</html>'
            )

            console.log('Response Headers:', res.getHeaders('Content-Type'));
            break;
        }
        case '/parameter': {
            const x = parseFloat(queryParams.x);
            const y = parseFloat(queryParams.y);

            res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8',});
            if (!isNaN(x) && !isNaN(y)) {
                const sum = x + y;
                const difference = x - y;
                const product = x * y;
                const quotient = x / y;

                res.end(`Сумма: ${sum}, Разность: ${difference}, Произведение: ${product}, Частное: ${quotient}`);
            } else {
                res.end('Ошибка: Параметры x и y должны быть числовыми.');
            }
            break;
        }
        case '/socket': {
            console.log(`IP клиента: ${req.connection.remoteAddress}, Порт клиента: ${req.connection.remotePort}, IP сервера: ${req.connection.localAddress}, Порт сервера: ${req.connection.localPort}`);
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8',});
            res.end(
                `IP клиента: ${req.connection.remoteAddress}, Порт клиента: ${req.connection.remotePort}, IP сервера: ${req.connection.localAddress}, Порт сервера: ${req.connection.localPort}`
            );
            break;
        }
        case '/resp-status': {
            const code = parseInt(queryParams.code);
            const mess = queryParams.mess;

            if (!isNaN(code) && mess) {
                res.writeHead(Number.parseInt(code), mess, { "Content-Type": "text/plain; charset=UTF-8" });
                res.end('Статус: ' + code + ' Пояснение: ' + mess);
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8',});
                res.end('Ошибка: Некорректные параметры запроса.');
            }
            break;
        }
        case '/formparameter': {
            if (req.method === 'GET') {
                // Отправка HTML-формы
                const formHTML = fs.readFileSync('file1.html', 'utf8');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                res.end(formHTML);
            } else if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });

                req.on('end', () => {
                    const formData = new URLSearchParams(body);
                    const values = {};
                    formData.forEach((value, key) => {
                        values[key] = value;
                    });

                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify(values));
                });
            }
            break;
        }
        case '/json': {
            if(req.method === 'POST') {
                let data = '';

                req.on('data', chunk => {
                    data += chunk;
                });

                req.on('end', () => {
                    try {
                        const reqData = JSON.parse(data);
                        const comment = reqData._comment;
                        const x = reqData.x;
                        const y = reqData.y;
                        const s = reqData.s;
                        const o = reqData.o;
                        const m = reqData.m;

                        const resBody = {
                            "__comment": "Ответ: " + comment,
                            "x: ": x,
                            "y:": y,
                            "x_plus_y": x + y,
                            "Concatination_s_o": s +": "+ o.name,
                            "Length_m": m.length
                        };

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(resBody));
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Bad req');
                    }

                // POSTMAN:
                /* {
                     "_comment": "Lab6",
                     "x": 1,
                     "y": 2,
                     "s": "message",
                     "m": ["a", "b", "c"],
                     "o": {"surname": "Dmitruk", "name": "Ilya"}
                 }
                 */
        
                });
            }
            break;
        }
        case '/xml': {
            if(req.method === 'POST') {
            let data = '';

            req.on('data', chunk => {
                data += chunk;
            });

            req.on('end', () => {
                xml2js.parseString(data, (err, result) => {
                    if (err) {
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Bad req');
                        return;
                    }

                    const req = result.req;
                    const id = req.$.id;
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
        }

            /*
            * POSTMAN:
            *  <req id="28">
                 <x value = "1"/>
                 <x value = "2"/>
                 <m value = "na"/>
                 <m value = "me"/>
               </req>
            * */
            break;
        }
        case '/files': {
            // Подсчет количества файлов в директории static
            const staticDir = path.join(__dirname, 'static');

            fs.readdir(staticDir, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Ошибка сервера');
            } else {
                const fileCount = files.length;

                // Отправка ответа с заголовком X-static-files-count
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8', 'X-static-files-count': fileCount});
                res.end(`Количество файлов в директории static: ${fileCount}`);
            }});
        }
        case '/upload': {
            if (req.method === 'GET') {
                // Чтение HTML-формы из файла
                const formPath = path.join(__dirname, 'file2.html');
            
                fs.readFile(formPath, 'utf8', (err, data) => {
                  if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                  } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                  }
                });
              } else if (req.method === 'POST') {
                let data = [];
            req.on('data', chunk => {
                data.push(chunk);
            });

            req.on('end', () => {
                const boundary = req.headers['content-type'].split('=')[1];
                const fileData = Buffer.concat(data).toString();
                const fileStart = fileData.indexOf('filename="') + 10;
                const fileEnd = fileData.indexOf('"', fileStart);
                const fileName = fileData.slice(fileStart, fileEnd);

                const filePath = path.join(__dirname, 'static', fileName);

                const fileContentStart = fileData.indexOf('\r\n\r\n') + 4;

                fs.writeFile(filePath, fileData.slice(fileContentStart), (err) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal Server Error');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end('File uploaded successfully!');
                    }
                });
            });
        }
            break;
        }
        default: {
            if(reqUrl.pathname.startsWith('/parameter')) {
                const x = parseFloat(reqUrl.pathname.split('/')[2]);
                const y = parseFloat(reqUrl.pathname.split('/')[3]);
    
                if (!isNaN(x) && !isNaN(y)) {
                    const sum = x + y;
                    const difference = x - y;
                    const product = x * y;
                    const quotient = x / y;
                    
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8',});
                    res.end(`Сумма: ${sum}, Разность: ${difference}, Произведение: ${product}, Частное: ${quotient}`);
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8',});
                    res.end(`URI: ${req.url}`);
                }
            }
            else if(reqUrl.pathname.startsWith('/files')) 
            {
                const filename = req.url.substring('/files/'.length);
                const filePath = path.join(__dirname, 'static', filename);

                fs.access(filePath, fs.constants.R_OK, (err) => {
                    if (!err) {
                        // Отправка файла в ответе
                        const fileStream = fs.createReadStream(filePath);
                        res.writeHead(200, { 'Content-Type': 'application/octet-stream; charset=UTF-8' });
                        fileStream.pipe(res);
                    } 
                });
            }
            else {
                res.writeHead(404);
                res.end('Not Found');
            }
            break;
        }
    }
});

server.listen(5000, "127.0.0.1", function(){
    console.log("Сервер начал прослушивание запросов на порту 5000");
});