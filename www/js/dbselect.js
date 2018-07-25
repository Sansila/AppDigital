document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var db = window.openDatabase("Database", "1.0", "PhoneGap svdb", 200000);
    db.transaction(successCB);
}  
function queryDB(tx) {
      tx.executeSql('SELECT * FROM contbl', [], querySuccess);
}
function querySuccess(tx, results) {
      var len = results.rows.length;
      console.log("contbl table: " + len + " rows found.");
      for (var i=0; i<len; i++){
          console.log("Row = " + i + " ID = " + results.rows.item(i).id + " ServerName =  " + results.rows.item(i).sname + " AppName = " + results.rows.item(i).appname + " DatabaseName = " + results.rows.item(i).dbname + " DBUser = " + results.rows.item(i).dbuname + " DBpwd = " + results.rows.item(i).dbpwd);

          app.request.get('http://'+results.rows.item(i).appname+'/Hospital/dynamicController', 
          { sver: results.rows.item(i).sname, 
            dbs: results.rows.item(i).dbname,
            dus: results.rows.item(i).dbuname,
            dpw: results.rows.item(i).dbpwd
          }, 
          function (data) {
            console.log(data);
          });

          var link = results.rows.item(i).appname;
          
          $('.server').val(results.rows.item(i).sname);
          $('.appname').val(results.rows.item(i).appname);
          $('.database').val(results.rows.item(i).dbname);
          $('.dbuser').val(results.rows.item(i).dbuname);

          $('.vsign').attr("href","/vsign/"+link);
          $('.listvsign').attr("href","/listvsign/"+link);
          $('.mvsign').attr("href","/vsign/"+link);
      }
      
}
function successCB() {
  var db = window.openDatabase("Database", "1.0", "PhoneGap svdb", 200000);
  db.transaction(queryDB);
}