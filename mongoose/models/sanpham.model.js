var db = require('./db');
const spSchema = new db.mongoose.Schema(
    {
        // đối tượng này định nghĩa cấu trúc của model 
        name: { type: String , required: true }, // yêu cầu bắt buộc phải nhập và chỉ nhập chuối
        price: { type: Number, required: true},
        description: {type: String, required: false}, // không bắt buộc nhập
        id_theloai :{type: db.mongoose.Schema.Types.ObjectId, ref: 'theLoaiModel'}
    },
    {
        collection: 'san_pham'  // xác định tên collection trong CSDL 
    }
);

// sau này định nghĩa thêm schema về thể loại ở trong này, nếu với user thì định nghĩa file mới
const theLoaiSchema = db.mongoose.Schema(
    {
        name:{ type: String, required: true}
    },
    { collection: 'the_loai'}
);

let spModel = db.mongoose.model('spModel', spSchema );
let theLoaiModel = db.mongoose.model('theLoaiModel', theLoaiSchema);

module.exports = {
    spModel, theLoaiModel
}