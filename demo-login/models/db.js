const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/demo_login_08')
        .catch ( (err)=>{
                console.log('Lỗi kết nối csdl: ' );
                console.log(err);
        });
module.exports = {mongoose}