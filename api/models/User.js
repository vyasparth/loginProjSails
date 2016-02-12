/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	tableName : 'user',

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
  }
};