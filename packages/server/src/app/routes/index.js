const fs = require('fs');//carregar arquivos
const path = require('path');//endereços de pastas


module.exports =(app) =>{
    fs
    .readdirSync(__dirname)
    .filter(file =>((file.indexOf('.')) !== 0 && (file !== "index.js")))
    .forEach(file =>require(path.resolve(__dirname,file))(app));
};