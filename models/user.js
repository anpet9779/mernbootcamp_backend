const mangoose = require("mangoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
var Schema = mangoose.Schema;

var userSchema = new Schema({
  name: {
    type: "string",
    required: true,
    maxLength: 32,
    trim: true,
  },
  lastname: {
    type: "string",
    maxLength: 32,
    trim: true,
  },
  email: {
    type: "string",
    maxLength: 32,
    trim: true,
    required: true,
    unique: true,
  },

  userinfo: {
    type: "string",
    trim: true,
  },
  encry_password: {
    type: "string",
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },

  purchases: {
    type: Array,
    default: [],
  },
},{timestamps: true});


/* Virtual Schema is used for password here and Getter / Setter is used to convert plain password */
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();   // uuid used for random string as SALT
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.method = {
  authenticate: function (plainpassword) {  // Method checking if password is encrypted
    return this.securePassword(plainpassword) === this.encry_password;  
  },

  securePassword: function (plainpassword) {
    if (!password) return "";
    try {
      return createHmac("sha256", this.salt)    //  SHA256 used for encryption
        .update(plainpassword)
        .digest("hex");
    } catch (e) {
      return "";
    }
  },
};
module.exports = mangoose.model("User", userSchema);
