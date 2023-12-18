//Sistema Asincrono NODEJS

const fs=require('node:fs');

console.log('Leyendo el Primer Archivo... ');
fs.readFile('./archivo.txt','utf-8',(err,text) => {  //Callback, funciones que se ejecutan cuando una tarea ha terminado
    console.log('primer texto: ', text);
});
console.log('==> Hacer cosas mientras lee el archivo... ');

console.log('Leyendo el Segundo Archivo... ');
fs.readFile('./archivo2.txt','utf-8',(err,text) => {
    console.log('segundo texto: ',text);
});

console.log('----------------------------------------');
//Transforma Callbacks
const {promisify} = require('node:util'); 
const readFilePromise=promisify(fs.readFile); //Version de Promesas

console.log('Leyendo el Primer Archivo... ');
readFilePromise('./archivo.txt','utf-8')
    .then(text => {
        console.log('primer texto:', text);
    })
console.log('==> Hacer cosas mientras lee el archivo... ');

console.log('Leyendo el Segundo Archivo... ');
readFilePromise('./archivo2.txt','utf-8')
    .then(text => {
        console.log('segundo texto:', text);
    })