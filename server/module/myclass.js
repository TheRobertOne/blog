const conf = require("../config");
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require("../plugins/timestamps");

// 连接mongodb
mongoose.connect(conf.mongo_db)
// 实例化连接对象
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})
// 创建schema
const classSchema = new mongoose.Schema({
    name: { type:String, required:true,unique:true},
    id: { type:Number, required:true,unique:true},
    date: { type: Date, default:Date.now },
});
// 使用插件
classSchema.plugin(timestamps);
classSchema.plugin(uniqueValidator);
// 创建model
const classModel = mongoose.model(conf.mongo_model, classSchema) // newClass为创建或选中的集合

module.exports = classModel; //.plugin(timestamps) ;
