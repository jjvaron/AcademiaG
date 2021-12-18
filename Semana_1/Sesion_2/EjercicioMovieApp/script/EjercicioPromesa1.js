let x =10;

const promesa = new Promise((resolve, reject)=>{
    if(x==10){
        resolve ('La vaiable es igual a 10')
    }else{
        reject ('Lavariable no es igual a 10')
    }
})

console.log(promesa)

promesa.then(res =>{
    console.log('success', res)
}).catch(error =>{
    console.log('Error', error)
})