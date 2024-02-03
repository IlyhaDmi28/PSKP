const { v4: uuidv4 } = require('uuid');;

function validateCard(cardNumber) {
    console.log(`Номер карты: ${cardNumber}`);
    return Math.random() < 0.5;
}

function createOrder(cardNumber) {
    return new Promise((resolve, reject) => {
        if (!validateCard(cardNumber)) {
            reject(new Error('Card is not valid'));
        } 
        else {
            const orderId = uuidv4();

            setTimeout(() => {
                resolve(orderId);
            }, 5000);
        }
    });
}


function proceedToPayment(orderId) {
    return new Promise((resolve, reject) => {
        console.log(`ID заказа: ${orderId}`);
        const isSuccess = Math.random() < 0.5;

        setTimeout(() => {
            if (isSuccess) {
                resolve('Оплата прошла успешно');
            } else {
                reject(new Error('Ошибка оплаты'));
            }
        }, 3000);
    });
}

// createOrder('1234-5678-9876-5432').then((orderId) => {
//     return proceedToPayment(orderId);
// })
// .then((paymentResult) => {console.log(`${paymentResult}`);})
// .catch((error) => {
//     console.error(`${error.message}`);
// });

async function main() {
    const cardNumber = '1234-5678-9876-5432';

    try {
        const orderId = await createOrder(cardNumber);

        const paymentResult = await proceedToPayment(orderId);
        console.log(`${paymentResult}`);
    } catch (error) {
        console.error(error.message);
    }
}

main();