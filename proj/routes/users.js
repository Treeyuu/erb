var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with '+req.query.a);
}).post('/login',function(req,res,next){
  console.log(req.body.id,req.body.pwd);
  res.send("You id id" + req.body.id +"and you pws is" +req.body.pwd);
}).get('/std/:nm',function(req,res,next){
  res.send('response from /std '+req.params.nm);
}).get('/std/:nm/:name',function(req,res,next){
  res.send('response from /std '+req.params.nm+'and '+req.params.name);


});
module.exports = router;
