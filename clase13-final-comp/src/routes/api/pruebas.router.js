const { Router } = require('express')
const { fork } = require('child_process')
const { sendEmail } = require('../../utils/sendEmail')
const { sendSms } = require('../../utils/sendSms')


const router = Router()

function operacionCompleja() {
    let result = 0
    for (let i = 0; i < 10e10; i++) {
        result += i

    }
    return result
}

router.get('/sms', (req, res) => {
    sendSms('esto es un sms de prueba del server de c70205', {phone: '+34613652154'})
    res.send(`El sms se ha enviado`)
})
router.get('/sendmail', async (req, res) => {
    await sendEmail({
        emailUser: 'projectodigitalgen@gmail.com',
        subject: 'Esto es un email de example',
        html: '<h1>Email dinámico de prueba</h1>'
       
    })
    res.send(`El email se ha enviado`)
})


router.get('/block', (req, res) => {
    const result = operacionCompleja()
    res.send(`El resultado de la operación es: ${result}`)
})

router.get('/noblock', (req, res) => {
    let response
    const child = fork('./src/routes/api/operacion.js')
    child.send('inicie el cálculo por favor')

    

    child.on('message', async result => {
        
        console.log('result proceso padre: ', result)
        response = result 
        res.send({message: `El resultado de la operación es: ${response}`})
    })

})


router.param('word', async (req, res, next, word)=>{
    // buscar en la base de datos
    req.search = word
    next()
})

router.get('/:word([a-zA-z]+)', (req, res)=>{
    const { word } = req.params
    console.log(req.search)
    res.send({payload: word})
})

module.exports = router