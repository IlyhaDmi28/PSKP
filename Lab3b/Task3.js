function thirdJob(data) {
    return new Promise((resolve, reject) => {
		if (typeof data !== 'number') {
        	reject(new Error('Ошибка'));
      	} else if (data % 2 !== 0) {
        	setTimeout(() => {
          		resolve('odd');
        	}, 1000);
      	} else {
        	setTimeout(() => {
          		reject(new Error('even'));
        	}, 2000);
      	}
    });
}
  
thirdJob('sdf').then((result) => {
    console.log("Метод 1: Promise разрешен:", result);
})
.catch((error) => {
    console.error("Метод 1:", error.message);
});
  
async function main() {
    try {
    	const result = await thirdJob(3);
      	console.log("Метод 2: Promise разрешен:", result);
    } catch (error) {
      	console.error("Метод 2:", error.message);
    }
}
  
main();