import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      trim: true,
      unique: true,
    },
    // mobile : {
    //   type : Number,
    //   match : [/^[0-9]{10}$/ , "Please provide a valid phone number"],
    //   required : [true , "Phone number is required"],
    //   unique : true
    // },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Please provide a password greater than 6 letters"],
      select: false,
    },
    isForgetPassword : {
      type: Boolean,
      default : false
    }
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

userSchema.pre('save' , async function(next){

  // here this refers to the field of document which is in process

  // check if the password is modified
  if (!this.isModified('password')) {
    next()
  }

  // generate salt
  const salt =  await bcrypt.genSalt(8)

  this.password = await bcrypt.hash(this.password , salt)

  next()

})



userSchema.methods.comparePassword = async function(password) {

  //  the this here refers to the user document on which its called
  let user = this
  return await bcrypt.compare(password , user.password)

}

const User = mongoose.model("User", userSchema);

export default User;
