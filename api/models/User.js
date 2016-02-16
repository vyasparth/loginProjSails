/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {

//	tableName : 'user',

  attributes: {

  		id: {
            type: 'INTEGER',
            primaryKey : true,
            autoincrement : true
         },
        username: {
            type: 'STRING',
            unique : true
         },
        password: {
            type: 'STRING'
     	},
     	fname: {
     		type: 'STRING'
     	},
     	lname: {
     		type: 'STRING'
     	}
   // },
  // beforeCreate: function (values, cb) {

  //   // Encrypt password
  //   bcrypt.hash(values.password, 10, function(err, hash) {
  //     if(err) return cb(err);
  //     values.password = hash;
  //     getSalt(hash);
  //     //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
  //     cb();
  //   });
  }  
};