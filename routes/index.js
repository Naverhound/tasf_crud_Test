const express = require ('express');
const router = express.Router();
const {db_open_connection} = require ('../database/db_connection');
const controller = require('../controllers/index_controller')

router.route('/') // Force to get into login
  .all((req,res) => {
    res.redirect('/login')
  });

router.route('/login')
  .get(async (req,res) => { // Get Login page
    
    
    res.send("<h1>Aqui sera el login bato</h1>")
  })
  .post((req,res) => { // Create new user

  });

router.route('/index')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    //we can run all login authentications
    next();
  })
  .get(controller.get)
  .post((req,res) => {// Create a new sale and sale_descript

  });

module.exports = router;