var express = require('express');
var router = express.Router();
var apiU = require('../controllers/api/api-user');
    
 // định nghĩa các route cho file api theo bảng excel 

//   GET: /api/users  
router.get('/users', apiU.listUser );  // lấy ds

router.post('/users', apiU.addUser ); // thêm mới

router.put('/users/:idu', apiU.updateUser); // sửa

router.delete('/users/:idu', apiU.deleteUser); // xóa 

module.exports = router;