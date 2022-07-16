const express = require ('express');
const router = express.Router();

router.route('/')
.all(function (req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  //we can run all login authentications
  next();
})
.get( (req,res,next)=>{
    res.send("<h1>Holiii lo lograste n.n eres increible</h1>")
});

module.exports = router;