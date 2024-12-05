const { Command } = require('commander')


const program = new Command()

program
    .option('--mode <mode>', 'Modo de trabajo del aplicativo', 'production')
    .option('--persistence <persistence>', 'Modo de persistencia del aplicativo', 'mongo')
    .parse()

    module.exports = {
        program
    }