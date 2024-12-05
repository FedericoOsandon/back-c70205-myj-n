const RouterClass = require("../router.js");

class UserRouter extends RouterClass {
    init(){
        this.get('/', ['ADMIN'],(req, res) => {
            res.sendSuccess('esto es data get users')
        })
        this.post('/', (req, res) => {
            res.send('post user')
        })
        
    }
}

module.exports = UserRouter
