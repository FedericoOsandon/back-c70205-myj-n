const bcrypt = require('bcrypt')

exports.createHash      = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
exports.isValidPAssword = (password, userPasswordDb) => bcrypt.compareSync(password, userPasswordDb) 