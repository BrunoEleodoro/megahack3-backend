var express = require('express');
var router = express.Router();
var connect = require('../db/connection').connect_db;
const queries = require('../utils/queries');
const token = require('../utils/token');
const { protectedRoute, basicAuthRoute } = require('../middlewares/auth');

/* GET activities listing. */
router.get('/', protectedRoute, function (req, res, next) {
  var db = await connect();
  queries.setDatabase(db);
  var result = await queries.read({}, {}, {}, 'activities')
  res.json({
    status: 200,
    books: result
  })
});

router.post('/', basicAuthRoute, async (req, res, next) => {
  var title = req.body.title;
  var img = req.body.img;
  var alternatives = req.body.alternatives;
  var correctPosition = req.body.correctPosition;
  if (title && img && alternatives && correctPosition) {
    var db = await connect();
    queries.setDatabase(db);
    var result = await queries.create({
      title: title,
      img: img,
      alternatives: alternatives,
      correctPosition: correctPosition
    }, 'Activities', 'activities')

    console.log('result', result)
    res.json({
      status: 200,
      message: 'success'
    })
  } else {
    res.json({
      status: 201,
      message: 'missing parameters'
    })
  }


})

module.exports = router;
