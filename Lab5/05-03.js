const {send} = require('./m05_DII')

async function main() {
    let from = 'artuxila@gmail.com';
    let to = 'artuxila@gmail.com';
    let pass = 'vhpb fuzz jcol aemp'; 
    let message = 'Hello from 05-03!';
  
    try {
      await send(from, to, pass, message);
      console.log('Функция send успешно выполнена');
    } catch (error) {
      console.error('Произошла ошибка при выполнении функции send:', error);
    }
}
  
main();