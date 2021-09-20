const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema;

var productSchema = new mongoose.Schema({

    name : {
        type : 'string',
        required : true,
        trim: true,
        maxLength: 32,
    },
    description : {
        type : 'string',
        trim: true,
        maxLength: 500,
    },
    price : {
        type : Number,
        trim: true,
        required : true,
        maxLength: 32,
    },
    category : {
        type : ObjectId,
        ref: "Category",
        required : true,
    },
    stock : {
        type : Number,
    },
    sold : {
        type : Number,
        default : 0
    },
    photo:{
        data : Buffer,
        contentType : String
    }
},{timestamps: true})

module.export = mongoose.model('Product', productSchema);