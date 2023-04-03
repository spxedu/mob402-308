var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');

// dùng middlware cho toàn bộ các router ở trong file thì viết ở trên đầu file
router.use( (req,res,next)=>{
      console.log("=======> Đã gọi middlware ===> " , Date.now() );
      next();// thực hiện các việc tiếp theo
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  // danh sách user
  console.log('Hiển thị danh sách user');
  res.send('respond with a resource');
});

router.get('/add',  (req,res,next)=>{
    console.log("add user ");
    res.send('Chức năng add');
})


router.get('/reg', userCtrl.Reg);
router.post('/reg', userCtrl.Reg);

router.get('/login', userCtrl.Login);
router.post('/login', userCtrl.Login);

router.get('/logout', userCtrl.Logout);




module.exports = router;
