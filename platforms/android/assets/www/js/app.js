// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}
// Init App
var app = new Framework7({
  on: {
      pageInit: function() {

        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            var db = window.openDatabase("Database", "1.0", "PhoneGap svdb", 200000);
            db.transaction(successCB);
            //console.log(navigator.camera);
        }  
        function queryDB(tx) {
            tx.executeSql('SELECT * FROM contbl', [], querySuccess);
            tx.executeSql('SELECT * FROM tblUser', [], querySuccessUser);
        }
        function querySuccessUser(tx,results)
        {
            var len = results.rows.length;
            for (var i = 0; i < len.length; i++) {}
            $('.my-display-user').text(results.rows.item(i).username);
        }
        function querySuccess(tx, results) {
              var len = results.rows.length;
              for (var i=0; i<len; i++){
                  console.log("Row = " + i + " ID = " + results.rows.item(i).id + " ServerName =  " + results.rows.item(i).sname + " AppName = " + results.rows.item(i).appname + " DatabaseName = " + results.rows.item(i).dbname + " DBUser = " + results.rows.item(i).dbuname + " DBpwd = " + results.rows.item(i).dbpwd);
                  app.request.get('http://'+results.rows.item(i).appname+'/ServiceDigitalMenu/dynamicController', 
                  { sver: results.rows.item(i).sname, 
                    dbs: results.rows.item(i).dbname,
                    dus: results.rows.item(i).dbuname,
                    dpw: results.rows.item(i).dbpwd
                  }, 
                  function (data) {
                    //console.log(data);
                  });

                  var link = results.rows.item(i).appname;
                  
                  $('.server').val(results.rows.item(i).sname);
                  $('.appname').val(results.rows.item(i).appname);
                  $('.database').val(results.rows.item(i).dbname);
                  $('.dbuser').val(results.rows.item(i).dbuname);
                  $('.my-url-link').append(link);

                  $('.changepassword').attr("href","/profile/"+link);

                  getAllTable(link);  
              }

              // ================= login script ==================//

              $('.btnlogin').on('click',function(){
              
                  var formData = app.form.convertToData('#formlogin');
                  var uname = formData['username'];
                  var pwd   = formData['password'];
                  if(uname == "" && pwd == "")
                  {
                      app.dialog.alert('Username and Password is empty.');
                  }else if(pwd == "")
                  {
                      app.dialog.alert('The Password is empty.');
                  }else if(uname == "")
                  {
                      app.dialog.alert('The Usernam is empty.');
                  }else{

                      var link = $('.appname').val();
                      app.preloader.show();
                      app.request.post('http://'+link+'/ServiceDigitalMenu/dynamicController/login', 
                      { user:uname, pass:pwd }, 
                      function (data) {
                          if(data == "wrong")
                          {
                              app.dialog.alert("Username or Password is incorrect.");
                              $('#formlogin')[0].reset();
                              app.preloader.hide();
                          }else{
                              data = JSON.parse(data);
                              //for (var i = 0; i < data.length; i++) {
                              var name = data['IpadUser'];
                              var pwd  = data['IpadPassWord'];
                              var type = data['UserType'];
                              
                              function populateDB(tx) {
                                  tx.executeSql('DROP TABLE IF EXISTS tblUser');
                                  tx.executeSql('CREATE TABLE IF NOT EXISTS tblUser (id integer primary key autoincrement, username,pwd,type,link)');
                                  tx.executeSql('INSERT INTO tblUser (username,pwd,type,link) VALUES ("'+name+'","'+pwd+'","'+type+'","'+link+'")');
                              }
                              function errorCB(err) {
                                  console.log("Error processing SQL: "+err.code);
                              }
                              function successCB() {
                                  console.log("success!");
                              }
                              var db = window.openDatabase("Database", "1.0", "Cordova svdb", 200000);
                              db.transaction(populateDB, errorCB, successCB);
                              //CheckPermissions(data[i].UserRoleID,link,name);
                              app.popup.close('.login-screen',true);
                              app.preloader.hide();
                              //}
                          }
                          
                      });

                  }
                  
              });

              // ============================ end ==========================//

        }
        function successCB() {
          var db = window.openDatabase("Database", "1.0", "PhoneGap svdb", 200000);
          db.transaction(queryDB);
        }

        // ======================== get table ==========================//

        function getAllTable(link)
        {
            app.request.post('http://'+link+'/ServiceDigitalMenu/dynamicController/getTable', 
            {link: link},
            function (data) {
                data = JSON.parse(data);
                var html = ""; $('#rows').html("");
                for (var i = 0; i < data.length; i++) {
                    app.preloader.show();
                    var url = "";
                    if(data[i].Status == "Busy")
                    {
                        url += '/jointable/'+data[i].TableNo+'/'+link;
                    }else{
                        url += '/order/'+data[i].TableNo+'/'+link;
                    }
                    html +='<div class="col-25" style="padding: 5px;">'+ 
                              '<a href="'+url+'">'+
                                '<div class="circle-text" style="background:'+data[i].Color+'"><div>'+data[i].TableNo+'</div></div>'+
                              '</a>'+
                            '</div>';


                    app.preloader.hide();
                }
                $('#rows').append(html);
            });
        }

        // ================================== close config ====================//

        $('.config-popup-close').click(function(){
            app.popup.close('.config-screen',true);
        });

        //================================== logout ==========================//

        $('.logout-user').click(function(){
            app.preloader.show();
            setTimeout(function(){
              location.reload();
            },500);
        });

        

      }
  },
  routes: routes,
});
