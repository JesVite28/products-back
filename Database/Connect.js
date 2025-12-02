//1- Requerir mongoose
const mongoose = require("mongoose");
//2- Crear una conexión a la base de datos
const conection = async ()=>{
    console.log("Conectando a la base de datos...");
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/DB-Productos-API");
        console.log("::: Conexión a la base de datos establecida :::");
    }catch(error){
        console.log('Error',error);
        throw new Error("::: ERROR No se pudo conectar a la base de datos :::");
    }
}
//3- exportar la conexión (modulo) para utilizarla en otros archivos
module.exports = conection;