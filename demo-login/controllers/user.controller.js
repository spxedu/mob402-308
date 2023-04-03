const myMD = require('../models/user.model');
exports.Reg = async (req, res, next)=>{
let msg = '';
    if(req.method =='POST'){
        console.log(req.body);
        if(req.body.passwd != req.body.passwd2){
            msg = 'Xác nhận password không đúng';
            return res.render('user/reg', {msg: msg});
        }
        // kiểm tra hợp lệ các phần khác nếu có...

        // xử lý lưu csdl
        let objU  = new myMD.UserModel();
        objU.username = req.body.username;
        objU.passwd = req.body.passwd;
        objU.email = req.body.email;
        try {
            await objU.save();
            console.log("Đăng ký thành công");
            msg = 'Đăng ký thành công';
        } catch (error) {
            msg = 'Lỗi '+ error.message;
        }

    }

res.render('user/reg',{msg: msg});

}
exports.Login = (req, res, next)=>{
    
}
exports.Logout = (req, res, next)=>{
    
}