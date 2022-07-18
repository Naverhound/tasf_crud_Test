const mysql = require('mysql2/promise');
const dbConfig = require('./db_conf.json');

const { host, port, user, password, database } = dbConfig.development;

const initialization = async ()=>{
  let db_created=false;   
  try {
    // create db if it doesn't already exist
    //se llenan los elementos del objeto basados la estructura JSon de dbConfig
    const temp_connection = await mysql.createConnection({ host, port, user, password });
    
    await temp_connection.query(`show databases like '${database}';`)
    .then(([result]) => {
      if(!result.length) {
         temp_connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
         db_created= true;
         console.log('<<--Database '+database+' successfully created at Master Database, or ALREA.-->>');
      }
    })
    .catch((err) => {
      throw err;
    });
    temp_connection.close();// Past code was only to create the database that the system will need
    
    return db_created; 

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
}

const db_structure = async ()=>{
  console.log('*In structure creation*');
  try {
  const connection = await mysql.createConnection({multipleStatements: true, host, user, password, database });
    connection.query(
        `
        CREATE TABLE IF NOT EXISTS users (
          id int AUTO_INCREMENT NOT NULL UNIQUE,
          username varchar(255) NOT NULL,
          password varchar(255) NOT NULL,
          PRIMARY KEY (id)
        );
        
        CREATE TABLE IF NOT EXISTS products (
          id int AUTO_INCREMENT NOT NULL UNIQUE,
          prod_name varchar(255) NOT NULL,
          unit_cost decimal(6,2) NOT NULL,
          PRIMARY KEY (id)
        );

        CREATE TABLE IF NOT EXISTS sales (
          id int AUTO_INCREMENT NOT NULL UNIQUE,
          user_id int NOT NULL,
          PRIMARY KEY (id),
          INDEX ind_user (user_id),
          FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS sales_descript (
          id int AUTO_INCREMENT NOT NULL UNIQUE,
          sale_id int NOT NULL,
          product_id int NOT NULL,
          amount int NOT NULL,
          PRIMARY KEY (id),
          INDEX ind_saleid (sale_id),
          INDEX ind_productid (product_id),
          FOREIGN KEY (sale_id)
            REFERENCES sales(id)
            ON DELETE CASCADE,
          FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
        );

        `
      )
      .then(([result])=>{
        console.log("<<--Tables created successfully.-->>")
      })
      .catch((err) => {
        console.log(err);
      })
  
    connection.close();
  } catch (error) {
    console.log(err);
  }
}

const fill_database = async () => {
  try {
    
  } catch (err) {
    console.log(err)
  }
}

const db_open_connection =  async()=>{
  console.log('** Attempting to connect with Database **');
  try {
    const db_connection = await mysql.createConnection({ host, user, password, database });
    console.log('<<--Connection with '+database+' database successfully established.-->>');
    return db_connection;
  }catch (error){
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {initialization,db_open_connection, db_structure}
