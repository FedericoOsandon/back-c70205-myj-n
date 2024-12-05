const { createTransport } = require('nodemailer')
const { objectConfig } = require('../config')

const { gmailUser, gmailPass } = objectConfig
console.log(gmailPass, gmailUser)
const transport = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: gmailUser,
        pass: gmailPass
    }
}) // gmail

const sendEmail = async ({emailUser, subject, html}) => { // 255
    return await transport.sendMail({
        from: 'Este email es enviado por <projectdigitalgen@gmail.com>',
        to: emailUser, // email del user,
        subject,
        html,
        attachments: [{
            filename: 'nodejs.png',
            path: __dirname + '/nodejs.png',
            cid: 'nodejs'
        }]
    })
}
 
module.exports = {
    sendEmail
}