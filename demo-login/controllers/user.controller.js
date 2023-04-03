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
exports.Login = async (req, res, next)=>{
    let msg = '';
    if(req.method =='POST'){
        // console.log(req.body);
        try {
            let objU = await myMD.UserModel.findOne({username: req.body.username});

            console.log(objU);

            if(objU != null){
                // lấy được thông tin tài khoản ==> kiểm tra pass
                if(objU.passwd == req.body.passwd){
                    // Đúng thông tin tài khoản ==> đăng nhập thành công 
                    // lưu thông tin vào session
                    req.session.userLogin = objU; 
                    // tự chuyển về trang chủ hoặc trang nào đó
                    return res.redirect('/users');
                }else{
                    msg = 'Sai password';
                }
            }else{
                msg = 'Không tồn tại tài khoản';
            }

        } catch (error) {
            msg = 'Lỗi ' + error.message;
        }

    }

    res.render('user/login', {msg: msg});
}
exports.Logout = (req, res, next)=>{
    
}