const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const addressSchema = require("../../schemas/address.schema");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    address:[addressSchema],
    
    isVerified: {
        type: Boolean,
        default: false
    },
      // security controls
     failedLoginAttempts: {
    type: Number,
    default: 0
     },

     lockUntil: {
    type: Date
    },

    passwordChangedAt: {
    type: Date
    },

    lastLogin: {
    type: Date
    }
  },{
    timestamps: true
  
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

// Compare Password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

//Account Lock Check
userSchema.methods.isAccountLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};

//Handle failed Login
userSchema.methods.incrementLoginAttempts = async function () {
  this.failedLoginAttempts += 1;

  if (this.failedLoginAttempts >= 5) {
    this.lockUntil = Date.now() + 15 * 60 * 1000; // lock 15 mins
  }

  await this.save();
};

//Rest attempt on success
userSchema.methods.resetLoginAttempts = async function () {
  this.failedLoginAttempts = 0;
  this.lockUntil = undefined;
  this.lastLogin = new Date();

  await this.save();
};
//Token invalid after password change
userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    return jwtTimestamp * 1000 < this.passwordChangedAt.getTime();
  }
  return false;
};
module.exports = mongoose.model("User", userSchema);