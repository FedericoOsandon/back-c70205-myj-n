process.on('message', message => {
    console.log(message) // aquí se esta mostrando

    let result = 0 

    for (let i = 0; i < 10e9; i++) {
        result += i

    }
    console.log('resultado suma', result)
    process.send(result)
})