        var app = new Framework7();
        var $   = Dom7;
        
        $('.btnapp').click(function(){
            var sv = $('.server').val();
            var ap = $('.appname').val();
            var db = $('.database').val();
            var du = $('.dbuser').val();
            var dp = $('.dbpwd').val();

          if(sv == "" || ap == "" || db == "" || du == "" || dp == "")
          {
            //alert("Please enter all field");
            app.dialog.alert('Please enter all field.');
          }else{
              app.preloader.show();
            // Wait for PhoneGap to load
              //
              //console.log(sv,ap,db,du,dp);
              document.addEventListener("deviceready", onDeviceReady, false);

              // Populate the database 
              //
              function populateDB(tx) {
                tx.executeSql('DROP TABLE IF EXISTS contbl');
                tx.executeSql('CREATE TABLE IF NOT EXISTS contbl (id integer primary key autoincrement, sname, appname, dbname, dbuname, dbpwd)');
                tx.executeSql('INSERT INTO contbl (sname,appname,dbname,dbuname,dbpwd) VALUES ("'+ sv +'", "'+ ap +'", "'+ db +'", "'+ du +'", "'+ dp +'")');
                
              }

              // Query the database
              //
              function queryDB(tx) {
                  tx.executeSql('SELECT * FROM contbl', [], querySuccess, errorCB);
              }

            // Query the success callback
            //
            function querySuccess(tx, results) {
                  var len = results.rows.length;
                  for (var i=0; i<len; i++){
                    
                      $('.server').val(results.rows.item(i).sname);
                      $('.appname').val(results.rows.item(i).appname);
                      $('.database').val(results.rows.item(i).dbname);
                      $('.dbuser').val(results.rows.item(i).dbuname);
                      console.log(results.rows.item(i).sname);
                  }
            }

            // Transaction error callback
            //
            function errorCB(err) {
                console.log("Error processing SQL: "+err.code);
            }

              // Transaction success callback
              //
              function successCB() {
                var db = window.openDatabase("Database", "1.0", "PhoneGap svdb", 200000);
                db.transaction(queryDB, errorCB);
                app.dialog.alert('Your server save success.');
                app.preloader.hide();
                app.popup.close('.config-screen',true);

                // setTimeout(function(){
                //     location.reload();
                // },500);
              }

              // PhoneGap is ready
              //
              function onDeviceReady() {
                var db = window.openDatabase("Database", "1.0", "PhoneGap svdb", 200000);
                db.transaction(populateDB, errorCB, successCB);
              }

          }

        });