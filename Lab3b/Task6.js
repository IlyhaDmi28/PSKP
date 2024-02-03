function calculateSquare(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject(new Error('Число введено неверно!'));
        } else {
            setTimeout(() => {
                resolve(number * number);
            }, 1000);
        }
    });
}
  
function calculateCube(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject(new Error('Число введено неверно!'));
        } 
        else {
            setTimeout(() => {
                resolve(number * number * number);
            }, 2000); 
        }
    });
}
  
function calculateFourthPower(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject(new Error('Число введено неверно!'));
        } 
        else {
            setTimeout(() => {
                resolve(number * number * number * number);
            }, 3000); 
        }
    });
}
  
const functions = [calculateSquare(3), calculateCube('fd'), calculateFourthPower(2)];
  
Promise.race(functions).then((result) => {
    console.log(`Первый разрешенный Promise: ${result}`);
})
.catch((error) => {
    console.error(error.message);
});
  
Promise.any(functions).then((result) => {
    console.log(`Первый разрешенный Promise с Promise.any(): ${result}`);
})
.catch((error) => {
    console.error(error.message);
});