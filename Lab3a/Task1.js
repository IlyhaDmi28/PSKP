const http = require('http');

let state = 'norm';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.end(`<h1>${state}</h1>`)
    process.stdin.setEncoding('utf8');

    process.stdin.on("readable", () => {
      	let str;
      	while ((str = process.stdin.read()) != null) {
        	let data = str.toString().trim();

        	switch (data) {
            	case "idle":
                	console.log(`Состояние сменилось с ${state} на idle`);
                	state = "idle";

                	break;
            	case "norm":
                	console.log(`Состояние сменилось с ${state} на norm`);
                	state = "norm";

                	break;
            	case "stop":
                	console.log(`Состояние сменилось с ${state} на stop`);
                	state = "stop";

                	break;
            	case "test":
                	console.log(`Состояние сменилось с ${state} на test`);
                	state = "test";

                	break;
            	default:
                	console.log();
                	break;
        	}
      	}
    })
});

server.listen(5000, () => {
  console.log("Сервер начал прослушивание запросов на порту 5000");
});





