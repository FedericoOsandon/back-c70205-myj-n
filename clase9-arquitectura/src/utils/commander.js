const { Command } = require('commander')


const program = new Command()

program
    .option('--mode <mode>', 'Modo de trabajo del aplicativo', 'production')
    .parse()

    module.exports = {
        program
    }