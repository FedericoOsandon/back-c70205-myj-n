// console.log(process.cwd())
// console.log(process.pid)
// console.log(process.memoryUsage())
// console.log(process.version)
// console.log(process.argv)


// argumentos node .\process.js 1 2 3 install --watch
// console.log(process.argv.slice(2))

// eventos de process
process.on('exit', code => {
    console.log(`Este cód se ejecutará justo antes de salir del proceso`, code )
})
process.on('uncaughtException', exeption => {
    console.log(`Este cód atrapa todas las excepciones no contolados, como llamar una función que no existe`, exeption)
})

console.log('Inicio del programa')

console() /// termino la ejecución del archivo
console.log('Fin del programa')
