const http = require('http');

const jsonObject = JSON.stringify({
    "__comment": "Запрос. Лабораторная работа 8/10",
    "x": 1,
    "y": 2,
    "s": "Сообщение",
    "m": ["a", "b", "c", "d"],
    "o": {
        "surname": "Дмитрук",
        "name": "Илья"
    }
});


const options = {
    host: 'localhost',
    path: `/4`,
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

const req = http.request(options, res => {
    let data = '';
    
    res.on('data', chunk => {
        data += chunk.toString('utf8');
    })
    
    res.on('end', () => {
        console.log(`Статус ответа: ${res.statusCode}`);
        console.log(`Тело ответа: ${data}`);
    });
});

req.on('error', e => {
    console.log(e.message);
})

// Отправка данных
req.write(jsonObject);
req.end();
