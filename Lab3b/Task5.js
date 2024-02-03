function calculateSquare(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject(new Error('Число введено неверно!'));
        } else {
            resolve(number * number);
        }
    });
}
  
function calculateCube(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject(new Error('Число введено неверно!'));
        } else {
            resolve(number * number * number);
        }
    });
}
  
function calculateFourthPower(number) {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject(new Error('Число введено неверно!'));
        } else {
            resolve(number * number * number * number);
        }
    });
}
  
const Number = 5; 
  
Promise.all([
    calculateSquare('fd'),
    calculateCube(Number),
    calculateFourthPower(Number)
])
.then(([squareResult, cubeResult, fourthPowerResult]) => {
    console.log(`Квадрат числа: ${squareResult}`);
    console.log(`Куб числа: ${cubeResult}`);
    console.log(`Четвёрта степень: ${fourthPowerResult}`);
})
.catch((error) => {
    console.error(`Ошибка: ${error.message}`);
});