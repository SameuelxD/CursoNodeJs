//Sistem Sincronico
const fs = require('node:fs');

//File System Stat
const stats=fs.statSync('./archivo.txt');

console.log(
    stats.isFile(), //si es fichero
    stats.isDirectory(), //si es directorio 
    stats.isSymbolicLink(), //si es un enlace simbolico
    stats.size //tamaño en bytes
);

