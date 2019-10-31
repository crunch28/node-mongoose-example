var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

//조회 라우터
router.get('/:id', function (req, res, next) {
  Comment.find({ commenter: req.params.id }).populate('commenter')
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

//등록 라우터
router.post('/', function (req, res, next) {
  const comment = new Comment({
    commenter: req.body.id,
    comment: req.body.comment,
  });
  comment.save()
    .then((result) => {
      return Comment.populate(result, { path: 'commenter' });
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

//수정 라우터
router.patch('/:id', function (req, res, next) {
  Comment.update({ _id: req.params.id }, { comment: req.body.comment })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

//삭제 라우터 
router.delete('/:id', function (req, res, next) {
  Comment.remove({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;