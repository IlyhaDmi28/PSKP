const emailModule = require('m05_dii2');

async function main() {
    let from = 'mondaxfeall1@gmail.com';
    let to = 'mondaxfeall1@gmail.com';
    let pass = 'sahsezmsrvyzuctm'; 
    let message = 'Hello from 05-04!';
  
    try {
      await emailModule.send(from, to, pass, message);
      console.log('Функция send успешно выполнена');
    } catch (error) {
      console.error('Произошла ошибка при выполнении функции send:', error);
    }
}
  
main();