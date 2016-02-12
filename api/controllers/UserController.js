/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	findone : function(req, res) {

		var params = req.allParams();
		var username = params.username;
		var password = params.password;

			console.log(username + " " + password);
			User.find({username : username, password : password}, {select : ['id','username','password'
						,'fname','lname']})
			.exec(function(err, user) {
				if (err) return res.badRequest('reason');
				//res.json(user);

				var data = {

                	userCount : user
        		};
      
      			function getValueByKey(key, data) {
    				
    				var i, len = data.length;
    				console.log(len);
    
   					 for (i = 0; i < len; i++) {
        				if (data[i] && data[i].hasOwnProperty(key)) {
            		
            				return data[i][key];
        				}
    				}
    
    				return -1;
				}

				var user_id = getValueByKey('id', data.userCount);

				useraddress.find({user_id : user_id},{select: ['address1','address2']})
							.exec(function(err,useradd){
         			 if(err) {
         				 return res.send(err);
          			}
         				// console.log(u);
          				

					// var json1 = { value1: '1', value2: '2' };
					// var json2 = { value2: '4', value3: '3' };
					//var result = {};
					function jsonConcat(o1, o2) {
 
 						for (var key in o2) {
  						
  							o1[key] = o2[key];
 						}
 
 						return o1;
					}

					var output = {};
					output = jsonConcat(output, user);
					output = jsonConcat(output, useradd);
					res.json(output);
				});

	});

	}

};

