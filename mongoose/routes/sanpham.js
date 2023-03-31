var express = require('express');
var router = express.Router();
var spCtrl = require("../controllers/sanpham.controller");

// list sp
router.get('/', spCtrl.list );

router.get('/add', spCtrl.add);

// upload file:
var multer = require('multer'); // dùng upload file
var uploader =  multer({dest: './tmp'});

router.post('/add', uploader.single('anh'),  spCtrl.add);

router.get('/add-sp', spCtrl.addSP);
router.post('/add-sp', spCtrl.addSP);

// chức năng sửa <a href="/sp/edit/xxxxxxxx">  <%= row._id %>    </a>

router.get('/edit/:idsp', spCtrl.editSP);
router.post('/edit/:idsp', spCtrl.editSP);

module.exports = router;
