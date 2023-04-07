const md = require('../../models/user.model');

exports.listUser = async (req, res, next) => {
    let dataReturn = {
        status: 1, 
        msg: 'ok'
    }
    // code xử lý lấy danh sách ở đây
    let list = [];
    try {
        list = await md.UserModel.find();
        dataReturn.data = list;
    } catch (error) {
        dataReturn.msg = error.message;
    }
    

    // trả về client
    res.json(dataReturn)

}


exports.addUser = (req, res, next) => {
    let data = {
        status: 1, 
        msg: 'ok'
    }
    // code xử lý  post  ở đây


    // trả về client
    res.json(data)
}


exports.updateUser = (req, res, next) => {
    let data = {
        status: 1, 
        msg: 'ok'
    }
    // code xử lý update ở đây


    // trả về client
    res.json(data)
}


exports.deleteUser = (req, res, next) => {
    let data = {
        status: 1, 
        msg: 'ok'
    }
    // code xử lý xóa ở đây


    // trả về client
    res.json(data)
}