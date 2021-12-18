const doTask = (iteracion) => new Promise((resolve, reject)=>{
	const numbers = []
	for (let i = 0; i < iteracion; i++) {

		const number = 1 + Math.floor(Math.random() * 6);
		numbers.push(number)

		if(number === 6){
			reject({
				error:true,
				message: 'Se ha sacado un 6'
			})
		}
	}
	resolve({
		error:false,
		value: numbers
	})
})

doTask(6).then(res => {
	console.log('todo está bien', res.value);	
}).catch(err => {
	console.log('Hubo un error', err.message);
})