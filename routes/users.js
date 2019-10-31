var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married
  });
  try {
    const result = await user.save(); //객체 안에 들어가는 내용 저장
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
