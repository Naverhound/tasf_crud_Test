const express = require('express');
const routes = require('./routes/index');
const {initialization, db_open_connection,db_structure} = require('./database/db_connection'); 
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT||3000;//process will obtain the  port enviromental variable in hosting

app.set('port', port);
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
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
  await initialization().then(async (had_to_be_created)=>{
    
    if(had_to_be_created) {
      /*means the database was created for first time,
      lets insert tables*/
      await db_structure();
    }
    });
  
}

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`<--<--TASF CRUD application running at http://localhost:${port}-->-->`);
    console.log('** Verifying essential data existence **')
    setupDB();
});
  
  //exportación para uso como api y ser llamado a otra parte enviando el objeto app (todo lo actual)
  module.exports=app;
