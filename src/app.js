// Documentacion:
// https://www.youtube.com/watch?v=VxRXlUrV6y0&ab_channel=FaztCode

// Bibliotecas
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

// Importar rutas
const customerRoutes = require("./routes/customer");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

// middlewares
app.use(morgan("dev"));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'toor',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));

app.use(express.urlencoded({extended: false}));

// routes
app.use("/", customerRoutes);

// Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Inicio del servidor en el puerto PORT
app.listen(app.set("port"), function(){
    console.log('Servidor CRUD iniciado, puerto: ' + app.get("port"));
});