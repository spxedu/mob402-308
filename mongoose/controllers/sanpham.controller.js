const fs = require('fs');
const myModel = require('../models/sanpham.model');  // nhúng thư viện Model

exports.list = async (req,res, next)=>{
    // hiển thị danh sách sản phẩm

    // chức năng lọc: 
    // kiểm tra tồn tại tham số
    let dieu_kien = null;

    if(typeof( req.query.price) != 'undefined' )
    {
        let price = req.query.price; 
        dieu_kien = { price: price };
    }

    var list = await myModel.spModel.find(  dieu_kien   ).sort( { name: 1 });// tìm sp

    res.render('sanpham/list', { listSp: list }); // truyền DS ra view
}

exports.add = async (req, res, next)=>{
    var url_image =  "" ;

    console.log(req.method);
     if(req.method == 'POST'){
        // xử lý upload 
        console.log(req.file, req.body);
        // sử dụng hàm fs.rename để di chuyển file
        try {
            await fs.rename(req.file.path,  './public/uploads/'+req.file.originalname )
                  // đến dưới này là thành công
                  
                  //không có lỗi ==> upload thành công
                   url_image =  '/uploads/'+ req.file.originalname ;
                   console.log("upload thanh cong" + url_image);
                     
        } catch (error) {
            // nếu có lỗi thì xảy ra lỗi ở đây

        }
         
    }

    
    console.log("send client ");

    res.render('sanpham/add', {url_image: url_image})
}

 