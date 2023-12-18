const path=require('node:path');
//barra separadora de capertas segun SO
console.log(path.sep);

//Crear rutas
const filePath=path.join('content','subfolder','test.txt');
console.log(filePath);

//Nombre fichero de una ruta
const base=path.basename('/tmp/midu-secret-files/password.txt');
console.log(base); 

const fileName=path.basename('/tmp/midu-secret-files/password.txt','.txt');
console.log(fileName);

//Extension archivos
const extension=path.extname('image.jpg');
console.log(extension);