const app = require('./app');

//Iniciar el servidor 
app.listen(app.get('PORT'), () =>{
    console.log(`Servidor corriendo en http://localhost:${app.get("PORT")}`);
});