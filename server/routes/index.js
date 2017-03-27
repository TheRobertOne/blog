var express = require('express');
var router = express.Router();
const classModel = require('../module/myclass');



/* GET home page. */
router.get('/',(req,res) => {
  res.send("hello world");
})


// Query.sort('-price')  
// Query.sort({price : 'desc'}})   
// Query.sort({price : 'descending'}})   
// Query.sort({price : -1}})
// 查询结果按price数值降序排列 
// 1是生序 -1是降序

router.get('/find', (req, res, next) => {
  // $or: [ { name:req.query.name }, { id:req.query.id } ]
  if(req.query.id){
    classModel.find({
      id:req.query.id
    },(err,result) => {
      if(err) return console.log('错误了',err);
      res.send(result);
    });
  }else if(req.query.sort){
    classModel.find({})
    .sort({id:req.query.sort})
    .exec((err,result) => {
      if(err) return console.log('错误了',err);
      res.send(result);
    })
  }else{
    // 另外一种写法
    classModel.find({})
    .sort({id:1})
    .exec(
      (err,result) => {
        if(err) return console.log('错误了',err);
        res.send(result);
    })
  }
});

// 新增
router.post('/add', (req, res, next) => {
  const body = {
    name:req.body.name,
    id:req.body.id
  };
  classModel.create(body, (err,result) => {
    if(err) {
      return next(err);
    }
    res.send(result);
  });
});

// 删除
router.post('/del', (req, res, next) => {
  const body = {
    id:req.body.id
  };
  if(!body.id){
    res.send('{code: 200, message:"删除失败"}');
  } else if(body.id=='all'){
      classModel.remove({}, (err,result) => {
          if(err) {
            return next(err);
          }
          res.send(result);
        });
  } else {
      classModel.remove(body, (err,result) => {
            if(err) {
              return next(err);
            }
            res.send(result);
          });
    }
});

// 删除 全部
// router.post('/delall', (req, res, next) => {
//   classModel.remove({}, (err,result) => {
//     if(err) {
//       return next(err);
//     }
//     res.send(result);
//   });
// });

// 修改 condition 控制条件 update要修改的地方
router.post('/update', (req, res, next) => {
  var condition = {id: req.body.id}, 
      update = {$set: {name: req.body.name}},
		  options = {multi: true};
  classModel.update(condition,update, options, (err,result) => {
    if(err) {
      return next(err);
    }
    res.send(result);
  });
});

module.exports = router;
