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

    // var list = await myModel.spModel.find(  dieu_kien   ).sort( { name: 1 });// tìm sp
    // cải tiến lệnh lấy ds: lấy thêm thể loại
    var list = await myModel.spModel.find(  dieu_kien   )
                    .populate('id_theloai') // tên cột tham chiếu
                    ;// tìm sp
    console.log(list);

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

 

exports.addSP = async (req, res, next)=>{
    let msg = ''; // ghi câu thông báo

    // lấy danh sách thể loại đưa lên form
    let listTheloai = await myModel.theLoaiModel.find();

    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        let objSP = new myModel.spModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.id_theloai = req.body.theloai;// thêm dòng này để có thể loại
        
        try{
            let new_sp = await objSP.save();
            
            console.log(new_sp);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;

        }
 
    }

    res.render('sanpham/add-sp', {msg:msg,  listTheloai:listTheloai});
}


exports.editSP = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objSP = await myModel.spModel.findById(  req.params.idsp  );
    console.log( objSP);

    // lấy danh sách thể loại đưa lên form
    let listTheloai = await myModel.theLoaiModel.find();
    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        let objSP = new myModel.spModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.id_theloai = req.body.theloai;// thêm dòng này để có thể loại
        objSP._id = req.params.idsp;
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await myModel.spModel.findByIdAndUpdate({_id:  req.params.idsp},objSP);

            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('sanpham/edit', 
            {msg:msg, objSP: objSP, listTheloai:listTheloai})

}