var express = require('express');
var router = express.Router();

var dbb = 'mongodb+srv://tupmph16281:04112002@cluster0.r1dk8.mongodb.net/test'
const mongoose = require('mongoose');
const e = require("express");
const {log} = require("debug");
mongoose.connect(dbb).catch(error => {
  console.log("co loi xay ra" + error)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/images', function(req, res, next) {
//   res.render('images');
// });


router.get('/images', function (req, res) {
  Image.find({}, function (err, data) {
    res.render('images', {duLieu : data})
  })

})
// buoc 1 : khoi tao khung - Schema
var imageSchema = new mongoose.Schema({
  tenanh: 'string',
  noidung: 'string',
  date: 'string',
  myimg: 'string'
});
// buoc 2 : lien ket Schema vs mongoDB qua mongoose
var Image = mongoose.model('images', imageSchema);


router.post('/addImage', async function (req, res) {
  var tenanh = req.body.tenanh
  var noidung = req.body.noidung
  var date = req.body.date
  var myimg = req.body.myimg
  // b3 : khởi tạo Car vs giá trị lấy được
  const image = new Image({
    tenanh: tenanh,
    noidung: noidung,
    date: date,
    myimg: myimg
  })
  image.save(function (error) {
    var mess;
    if (error == null) {
      mess = 'Them thanh cong'
    } else {
      mess = error
    }
    console.log(tenanh + noidung + date + myimg )
    res.render('images')
  })


})
router.get('/data', async function (req, res) {
  Image.find({}, function (err, data) {
    res.render('data', {duLieu : data})
  })

})

router.get('/show/:id', async function (req, res) {
  Image.findById(req.params.id, function (err, data) {
    if (err){
      console.log(err);
    }else {
      console.log(data);
      res.render('show', {duLieu : data});
    }
  })

})


router.get('/delete/:id', function (req, res) {
  Image.findByIdAndDelete(req.params.id, function (err) {
    res.redirect('/data');
  })

  // res.send(req.params.id);

});

router.get('/edit/:id', function (req, res) {
  Image.findById(req.params.id, function (err, data){
    if (err){
      console.log(err);

    }else {
      console.log(data);
      res.render('edit', {duLieu : data});
    }
  })



});

router.post('/edit/:id', function (req, res) {
  const mybodydata = {
    tenanh : req.body.tenanh,
    noidung : req.body.noidung,
    date : req.body.date,
    myimg : req.body.myimg
  }
  Image.findByIdAndUpdate(req.params.id, mybodydata,function (err){
    if (err){
      res.redirect('edit/' + req.params.id);
    }else {
      res.redirect('../data');
    }
  })
});

module.exports = router;
