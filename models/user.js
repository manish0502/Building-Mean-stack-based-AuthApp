const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/db");

// User Schema

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Modelling

const User = (module.exports = mongoose.model("User", UserSchema));

// some of the functions which we will use

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};



module.exports.getUserByUsername = function(username, callback) 
{
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = (newUser , callback) =>{

    const saltRounds =10 ;
    const myPlaintextPassword = newUser.password;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {

            // Store hash in your password DB.
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.comparePassword = function(candidatePassword, hash, callback)
 {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}




