module.exports = {

	tableName : 'useraddress',

  attributes: {

  		address_id: {
            type: 'INTEGER',
            primaryKey : true,
            autoincrement : true
         },
        address1: {
            type: 'STRING',
            unique : true
         },
        address2: {
            type: 'STRING'
     	},
     	user_id: {
     		type: 'INTEGER'
     	}
  }
};