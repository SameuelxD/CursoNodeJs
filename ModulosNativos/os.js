const os=require('node:os')
console.log('Informacion del Sistema Operativo: ');
console.log('---------------------------------------');

console.log('Nombre Sistema Operativo', os.platform());
console.log('Version Sistema Operativo', os.release());
console.log('Arquitectura Sistema Operativo', os.arch());
console.log('CPUs', os.cpus()); // <=== vamos a poder escalar procesos en node
console.log('Memoria Libre', os.freemem() /1024 /1024);
console.log('Memoria Total', os.totalmem() /1024 /1024);
console.log('Uptime', os.uptime() /60 /60);