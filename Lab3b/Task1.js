function firstJob() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
    		resolve("Hello World");
      	}, 2000);
    });
}
  
firstJob().then((result) => {
    console.log("Функция 1: Promise разрешен:", result);
})
.catch((error) => {
    console.error("Функция 1: Ошибка Promise:", error);
});
  
async function main() {
    try {
    	const result = await firstJob();
      	console.log("Функция 2: Promise разрешен:", result);
    } catch (error) {
      	console.error("Функция 2: Ошибка Promise:", error);
    }
}
  
main();