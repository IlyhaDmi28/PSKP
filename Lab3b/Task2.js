function secondJob() {
	return new Promise((resolve, reject) => {
    	setTimeout(() => {
        	reject(new Error("Произошла ошибка"));
      	}, 3000);
    });
}
  
secondJob().then((result) => {
    console.log("Метод 1: Promise разрешен:", result);
})
.catch((error) => {
    console.error("Метод 1:", error.message);
});
  
async function main() {
    try {
      	const result = await secondJob();
      	console.log("Метод 2: Promise разрешен:", result);
    } catch (error) {
    	console.error("Метод 2:", error.message);
    }
}
  
main();