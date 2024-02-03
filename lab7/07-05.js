let http = require('http');

let xmlbuilder = require('xmlbuilder');

/* <req id="28">
    <x value = "1"/>
    <x value = "2"/>
    <m value = "na"/>
    <m value = "me"/>
</req> */

let xmldoc = xmlbuilder.create('req').att('id', 28);
xmldoc.ele('x').att('value', 3);
xmldoc.ele('x').att('value', 1);
xmldoc.ele('x').att('value', 2);
xmldoc.ele('m').att('value', 'a');
xmldoc.ele('m').att('value', 'b');
xmldoc.ele('m').att('value', 'c');

let options = {
    host: 'localhost',
    path: `/5`,
    port: 5000,
    method: 'POST',
    headers: {'content-type': 'application/xml', 'accept': 'application/xml'}
}

const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk.toString('utf-8');
    });

    res.on('end', () => {
        console.log(`Статус ответа: ${res.statusCode}`);
        console.log(`Тело ответа: ${data}`);
    });
});

req.write(xmldoc.toString({pretty: true}));
req.end();