/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');
var dialog = require('sails-hook-flash');

module.exports = {

  reset_password : function(req, res) {

    var userid = req.session.userid;
    var param = req.allParams();
    var old_password = param.old_pass;
    var new_password = param.new_pass;

    User.find({id: userid}, {select: ['password']})
       .exec(function(err, user) {
       if(err) {
          return res.send(err);
       }
       // console.log("--------STORED PASSWORD-----------");
       // console.log(user1[0].password);
       // console.log("----------------------------------");
       bcrypt.compare(old_password, user[0].password, function(err, valid) {
               if(err || !valid) {

                  req.addFlash('failed', 'Wrong password');
                  res.redirect('/views/reset_pass');
                  // return res.send('Old password not correct!', 500)
               } else
                  bcrypt.hash(new_password, 10, function(err, hash) {
                  if(err) return cb(err);
                  new_password = hash
                  
                 // console.log("--------STORING NEW PASSWORD-----------");
                 // console.log(npass);
                 // console.log("----------------------------------");

                 User.update({id : userid}, {password :new_password})
                 .exec(function(err,data)
                 {        
                     if (err) {
                        return res.send(err);
                     }
                     req.addFlash('pass_updated', 'Your password has been updated!');
                     res.view('welcome');
                     
                 });
               });
              });

       //console.log(user););
             });    
  },

  findAll : function(req, res) {

     User.find({select: ['id','username', 'password','fname', 'lname', 'user_type', 'c_number']})
      .exec(function(err, user) {
        if(err) {
            res.badRequest('reason');
        }
        var data = {
                 user_data : user,
        };

       var a = 0;
            console.log(a + " above call");
        function call () {

            console.log(a + " inside call");

            if(a == user.length) {
                //res.json(user);
                res.view('all_users',{'user' : user})              
            }
            else {
            useraddress.find({user_id : user[a].id},{select: ['address1','address2']}).exec(function(err,useradd){
              if(err) {
                return res.send(err);
              }

              console.log(user.length);

                if(a <= user.length - 1) {

                  console.log(useradd);
                  user[a].user_add = useradd;
                  console.log(user);
                  console.log(a);

                  a++;
                  call();
                }
            });
          }
          }
        call();
       //     console.log("--------STARTING VALUE----------");
      //  }

       // res.send(data);
      });
  },

  user_info : function(req, res) {

    var userid = req.session.userid;
       User.find({id : userid }, {select: ['username','password','id','fname','lname']})
       .exec(function(err, user) {
       if(err) {
          return res.send(err);
       }
       var data = {
                 user_data : user
       };

       useraddress.find({user_id: userid},{select: ['address1','address2']}).exec(function(err,useradd){
          if(err) {
          return res.send(err);
          }
       
        //  console.log(useradd);
          data.useradd_data = useradd; 

          res.view('user_info', {'data' : data});

       });
      });
  },

 //  user_info_update : function(req,res)
 // {
 //    var param = req.allParams();
 //    var fname = param.fname;
 //    var lname = param.lname;
 //    var add1 = param.address1;
 //    var add2 = param.address2;
 //    var uid = req.session.userid;
    
 //    User.update({id : uid}, {fname:fname,lname :lname}).exec(function(err,data) { 
 //    if (err) {
 //          return res.send(err);
 //    }
 //    useraddress.update({user_id : uid}, {address1:add1,address2 :add2}).exec(function(err,data) { 
 //    if (err) {
 //          return res.send(err);
 //    }
 //    return res.send("Updated");
 //    });
 //  });
 // },

  user_logout : function(req,res)
 {
   // var sid = "";
   // var sname = "";
   req.session.destroy();
   console.log(req.session);
   res.redirect('index.html');
 },

	find_user : function(req, res) {

		var params = req.allParams();
		var username = params.username;
		var password = params.password;
    //var encrypted_password = "";
			//console.log(username + " " + password);
    
     User.find({username: username}, {select: ['username','id','password']})
       .exec(function(err, user) {
       if(err) {
          return res.send(err);
       }
       
       var data = {
                 userCount : user
       };

       var len = data.userCount.length;
       if(len == 1) 
       {
         function getValueByKey(key, data) {
  
         for (var i = 0; i < len; i++) {
            if (data[i] && data[i].hasOwnProperty(key)) {
                return data[i][key];
            }
           }
         return -1;
         }
         var id = getValueByKey('id', data.userCount);
         var p = getValueByKey('password', data.userCount);
         var username = getValueByKey('username', data.userCount);

         req.session.authenticated = true;
         req.session.userid = id;
         req.session.username = username;

      //   console.log(data);
         bcrypt.compare(password, p, function(err, valid) {
               if(err || !valid) {

                  req.addFlash('login_failed', 'wrong username/password');
                  return res.redirect('/');
                  // return res.send('Invalid username and password combination!', 500)
               } else
                 res.view('welcome',{'data' : data});
         });
       } else {

          req.addFlash('login_failed', 'wrong username/password');
          return res.redirect('/');
       }
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
    var picker = param.typePicker;
    var c_number = param.c_number

    console.log(picker);
    bcrypt.hash(password, 10, function(err, hash) {
      if(err) return cb(err);
      password = hash;
      console.log(bcrypt.getSalt(hash));
      console.log(hash);
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
    //});

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

          req.addFlash('signup_failed', 'username already taken');
          return res.redirect('/views/signup');
           //res.send("Username already taken!");
        }
        else
        {
          if(username != "" && password != ""){
           	User.create({                                // if name is unique,enter the records into the database
                           username: username,
                           password : password,
                           fname : fName,
                           lname : lName,
                           user_type : picker,
                           c_number : c_number
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
                        req.addFlash('signup_success', 'Succesfully signed up, please sign in!');
            						res.redirect('/');
            						// data.useradd_data = useradd;
            						// res.view('user_info', {'data' : data});
            					});
           	});
                       });
          } else {

            // dialog.warn('aaaa!!!', function(err){
            //   if (!err) console.log('User clicked OK');
            // });
           // res.send("please fill up all the fields");
          }
        }         
        });    
});
	}
};

