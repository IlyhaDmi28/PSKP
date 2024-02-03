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
    //обычный insert
    req.on('data', data => {
        let r = JSON.parse(data);
        if(r.BDay == -1){
            //подгрузка
            res.setHeader('Content-Type', 'application/json');
            let findElem = db.db_data.find(item => item.ID === r.ID)
            res.end(JSON.stringify(findElem));
        }
        else{
            //обычный insert
            db.insert(r);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(r));
        }
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
    if(url.parse(req.url).pathname === '/'){
        let html = fs.readFile('index.html', (err, html) => {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
        })
    }
    else if (url.parse(req.url).pathname ==='/api/db') {
        db.emit(req.method, req, res);
    }
     
}).listen(5000, "127.0.0.1", function(){
    console.log("Сервер начал прослушивание запросов на порту 5000");
});