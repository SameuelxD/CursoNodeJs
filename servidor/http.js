const http = require('node:http')
const { findAvailablePort } = require('../freePort.js')

const desiredPort=process.env.PORT ?? 3000 //Variables de Entorno
const server = http.createServer((req, res) => {
    console.log('request received');
    res.end('Hola Mundo')
})

findAvailablePort(desiredPort).then(port => {
    server.listen(port, () => {
        console.log(`server listening on port http://localhost:${port}`);
    })
})
/*
server.listen(0, () => {
    console.log(`server listening on port http://localhost:${server.address().port}`); localhost:server.address().port
})

*/