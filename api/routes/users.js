var express = require('express');
var router = express.Router();
var connect = require('../db/connection').connect_db;
const queries = require('../utils/queries');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth', async (req, res, next) => {
  var login = req.body.login || "";
  var password = req.body.password || "";

  if (login != null && password != null) {
    var db = await connect();
    queries.setDatabase(db);
    var users = await queries.read({}, { login: login, password: password }, {}, 'users')
    res.json({
      status: 200,
      users: users
    })
  } else {
    res.json({
      status: 201,
      message: 'login and password must be provided'
    })
  }
})

module.exports = router;
