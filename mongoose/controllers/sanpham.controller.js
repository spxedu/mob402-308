const fs = require('fs');
const myModel = require('../models/sanpham.model');  // nhúng thư viện Model

exports.list = async (req,res, next)=>{
    // hiển thị danh sách sản phẩm

    var list = await myModel.spModel.find().sort( { name: 1 });// tìm sp

    res.render('sanpham/list', { listSp: list }); // truyền DS ra view
}

exports.add = async (req, res, next)=>{
    var url_image =  "" ;

    console.log(req.method);
     if(req.method == 'POST'){
        // xử lý upload 
        console.log(req.file, req.body);
        // sử dụng hàm fs.rename để di chuyển file
        await fs.promises.rename(req.file.path, 
                  './public/uploads/'+req.file.originalname,
                       (err)=>{
                        console.log(err);
                        if(err != null){
                            console.log(err);
                        }else{
                            url_image = '11111';
                            //không có lỗi ==> upload thành công
                             url_image =  '/uploads/'+ req.file.originalname ;
                             console.log("upload thanh cong" + url_image);
                        }
                    })

    }

    
    console.log("send client ");

    res.render('sanpham/add', {url_image: url_image})
}

 