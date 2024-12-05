const twilio = require('twilio')
const { objectConfig } = require('../config')

const { twilioAcountSid, twilioAuthToken, twilioPhone } = objectConfig

const client = twilio(twilioAcountSid, twilioAuthToken)

const sendSms = (body, user) => client.messages.create({
    body,
    from: twilioPhone,
    to: user.phone
}) 

module.exports = {
    sendSms
}

