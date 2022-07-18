const express = require ('express');
const router = express.Router();
const {db_open_connection} = require ('../database/db_connection');
const index_controller = require('../controllers/index_controller')
const login_controller = require('../controllers/login_controller')

router.route('/') // Force to get into login
  .all((req,res) => {
    res.redirect('/login')
  });

router.route('/login')
  .get(login_controller.get)
  .post(login_controller.post);

router.route('/index')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    //we can run all login authentications
    next();
  })
  .get(index_controller.get)
  .post((req,res) => {// Create a new sale and sale_descript

  });

module.exports = router;