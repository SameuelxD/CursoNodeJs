const { readFile } = require("node:fs/promises");

//IIFE - Inmediatly Invoked Function Expression
(async () => {
  console.log("Leyendo el Primer Archivo... ");
  const text = await readFile("./archivo.txt", "utf-8");
  console.log("Primer Texto:", text);
  console.log("==> Hacer cosas mientras lee el archivo... ");

  console.log("Leyendo el Segundo Archivo... ");
  const secondText = await readFile("./archivo2.txt", "utf-8");
  console.log("Segundo Texto", secondText);
})();
