const http = require('http');
const data = require('./DB.js')
const fs = require('fs');
const url = require('url');

let db = new data.DB();

db.on('GET', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.select()
    .then(elem =>{
        res.end(JSON.stringify(elem));
    })
})

db.on('POST', (req, res) =>{
    req.on('data', data => {
        let r = JSON.parse(data);
        db.insert(r);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(r));
    })
})

db.on('PUT', (req, res)=>{

    req.on('data', data => {
        let r = JSON.parse(data);
        db.update(r);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(r));
    })
})

db.on('DELETE', (req, res)=>{
    
    req.on('data', data => {
        let r = JSON.parse(data);
        db.delete(r.ID);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(r));
    })
})

http.createServer(function(req, res) {
    if (url.parse(req.url).pathname ==='/api/db') {
        db.emit(req.method, req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Ничего не найдено(');
    }
     
}).listen(5000, "127.0.0.1", function(){
    console.log("Сервер начал прослушивание запросов на порту 5000");
});