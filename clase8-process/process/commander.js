const { Command } = require('commander')


const program = new Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo del aplicativo', 'production')
    .requiredOption('-u <user>', 'Usuario trabajando el aplicativo', 'No se ha declarado el usuario')
    .option('-l, --letters [letters...]', 'specify letter')
    .parse()

console.log('Options: ', program.opts())
console.log('Remaning arguments: ', program.args)

// node commander.js -d -p 3000 --mode development -u root --letters a b c

// node commander.js -p 3000 -u root 2 a 4 --letters a b c