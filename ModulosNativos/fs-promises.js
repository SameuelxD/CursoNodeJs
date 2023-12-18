//Promises,Las promesas tambien son asincronas
const fs=require('node:fs/promises');

console.log('Leyendo el Primer Archivo... ');
fs.readFile('./archivo.txt','utf-8')
    .then(text => {
        console.log('Primer Texto:',text);
    })
console.log('==> Hacer cosas mientras lee el archivo... ');

console.log('Leyendo el Segundo Archivo... ');
fs.readFile('./archivo2.txt','utf-8')
    .then(text => {
        console.log('Segundo Texto: ',text);
    })
