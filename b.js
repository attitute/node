
module.exports = 1


const fs = require('fs')


const os = require('os')
const net = os.networkInterfaces()

console.log(net['以太网'][1].address)