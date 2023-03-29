const fs = require('fs');

exports.list = (req,res, next)=>{
    // hiển thị danh sách sản phẩm

    res.render('sanpham/list');
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

 