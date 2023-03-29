const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ql_banhang')
        .catch( (err)=>{
                console.log("Loi ket noi CSDL: ");
                console.log(err);
        });

module.exports = { mongoose }; 

// Mở notepad (run với quyền Admin)
//==> file ==> Open ==> thư mục: C:\Windows\System32\Driver\etc\
// trên cửa sổ phần chọn file Type: chọn all 
// chọn file :  hosts    ==> nhìn thấy dòng 127.0.0.1 bị dấu # ở đầu , xóa dấu #
// sau đó lưu lại
// Trường hợp sửa file hosts không được: thay đổi code trực tiếp
// mongoose.connect('mongodb://localhost:27017/ql_banhang')
//               ==> thay chữ: localhost = 127.0.0.1
