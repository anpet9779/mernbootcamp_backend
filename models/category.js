const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema(
    {
        name:{
            type : "string",
            required: true,
            trim: true,
            maxLength: 32,
            unique: true
        }
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema);