import { readFile } from 'node:fs/promises';
//Aplicando y ejecutando promesas en paralelo, paralelisamos la asincronia
Promise.all([
    readFile('./archivo.txt','utf-8'),
    readFile('./archivo2.txt','utf-8')
]).then(([text,secondText])=>{
    console.log('Primer Texto: ',text);
    console.log('Segundo Texto: ',secondText);
})