/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	find_user : function(req, res) {

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

          			data.useraddress = useradd;
          			console.log(data);

          			if(data.userCount.length == 1) {
        	  		
        	  		//	console.log(req.session);
        	  			res.view('welcome', {'data' : data});
        	  		}
        	  		else {
        	  			res.send("Please enter a valid email/password!");
        	  		}

				});
			});
	},

	create_user : function(req, res) {

		var param = req.allParams();
		var username = param.username;
		var password = param.password;
		var fName = param.fname;
		var lName = param.lname;
		var add1 = param.add1;
		var add2 = param.add2;

		 User.find({username: username}, {select: ['username']})      //find() to check if username exists or not
        .exec(function(err, user) {
        if(err) {
            console.log("kkk");
        }
        var data = {                        // Obtain value inside the JSON object
                      user_data : user
                   };
        var len = data.user_data.length;
      
        if(len == 1)                                  // if the username exists -- > enter unique id
        {
           res.send("Username already taken!");
        }
        else
        {
          if(username != "" && password != ""){
           	User.create({                                // if name is unique,enter the records into the database
                           username: username,
                           password : password,
                           fname : fName,
                           lname : lName 
                       }).exec(function (err, user) {

                       		if(err) console.log("fff");
                       //    console.log("---------------------------");
           
 			User.find({username: username}, {select: ['id']})      //find() to check if username exists or not
        		.exec(function(err, user) {
        
        			if(err) {
           				console.log("kkk");
        			}
        			var data = {                        // Obtain value inside the JSON object
                      	user_data : user
                   	};
        			var len = data.user_data.length;


                    function getValueByKey(key, data) {
    	
   					 	for (var i = 0; i < len; i++) {
        							
        					if (data[i] && data[i].hasOwnProperty(key)) {
            		
            			return data[i][key];
        					}
    					}
    
    					return ;
						}
		
						var uid = getValueByKey('id', data.user_data);
       					console.log(uid);          
            
            useraddress.create({
            						address1 : add1,
            						address2 : add2,
            						user_id : uid
            					}).exec(function (err, useradd) {

            						//res.json(user);
            						res.send("You have been registered");
            						// data.useradd_data = useradd;
            						// res.view('user_info', {'data' : data});
            					});
           	});
                       });
          } else {

            res.send("please fill up all the fields");
          }
        }         
        });    
	}
};

