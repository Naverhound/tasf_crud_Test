const express = require('express');
const mysql = require('mysql2/promise');
const dbConfig = require('./database/db_conf.json');
const routes = require('./routes/index'); 
const app = express();
const port = process.env.PORT||3000;//process will obtain the  port enviromental variable in hosting

app.set('port', port);
app.set('view engine', 'ejs');
app.use(express.json({limit: "50mb"}));
app.use('/',routes);

app.use(function(err, req, res, next) {//middleware status 500 error handler
    console.error(err.stack);
    res.status(500).send("Something is wrong with the server! We're so sorry :C");
});

app.use(function(req, res, next) {//middleware 404
    res.status(404).send('No parece haber nada por aqui humm!');
});

//DB configuration
async function setupDB(){
  try {    
    // create db if it doesn't already exist
    //se llenan los elementos del objeto basados la estructura JSon de dbConfig
    const { host, port, user, password, database } = dbConfig.development;
    const temp_connection = await mysql.createConnection({ host, port, user, password });
    await temp_connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    temp_connection.close();// Past code was only to create the database that the system will need
    //now we connect to the recent database
    const connection = await mysql.createConnection({ host, user, password, database });
    console.log('<<Connection with DB has been established successfully on '+database+'.>>');
    console.log(connection);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.listen(port, (err) => {

    if (err) {
        console.log(err);
        return;
        }
    console.log(`<--<--TASF CRUD application running at http://localhost:${port}-->-->`);
// setupDB();
});
  
  //exportación para uso como api y ser llamado a otra parte enviando el objeto app (todo lo actual)
  module.exports=app;
