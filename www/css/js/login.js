
$('.btnlogin').on('click',function(){

    ConfigServer();
    
    var formData = app.form.convertToData('#formlogin');
    //alert(JSON.stringify(formData));
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
        goLogin(uname, pwd);
    }
    
});

function goLogin(uname, pwd)
{
    var link = $('.appname').val();
    app.preloader.show();
    app.request.post('http://'+link+'/Hospital/dynamicController/login', 
    { user:uname, pass:pwd }, 
    function (data) {
        if(data == "wrong")
        {
            app.dialog.alert("Username or Password is incorrect.");
            $('#formlogin')[0].reset();
        }else{
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                var name = data[i].UserName;
                var pwd  = data[i].UserPassword;
                var role = data[i].UserRoleID;
                function populateDB(tx) {
                    tx.executeSql('DROP TABLE IF EXISTS tblUser');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS tblUser (id integer primary key autoincrement, username,pwd,roleid,link)');
                    tx.executeSql('INSERT INTO tblUser (username,pwd,roleid,link) VALUES ("'+name+'","'+pwd+'","'+role+'","'+link+'")');
                }
                function errorCB(err) {
                    console.log("Error processing SQL: "+err.code);
                }
                function successCB() {
                    console.log("success!");
                }
                var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
                db.transaction(populateDB, errorCB, successCB);

                checkPermission(data[i].UserRoleID,link);
                
            }
        }
        app.preloader.hide();
    });
}

// ==================== check permission ====================//

function checkPermission(roleid,link)
{
    app.request.post('http://'+link+'/Hospital/dynamicController/checkPermission',
    {userroleid: roleid},
    function (data){
        data = JSON.parse(data);
        app.preloader.show();
        var html = '';
        var htmlmenu = '<li>'+
                          '<a class="item-link item-content panel-close">'+
                            '<div class="item-media"><i class="fas fa-th"></i></div>'+
                            '<div class="item-inner">'+
                              '<div class="item-title">Dashboard</div>'+
                            '</div>'+
                          '</a>'+
                        '</li>';

        $('.dashboard-area div.row').html('');
        $('.mainmenu div ul').html('');
        for (var i = 0; i < data.length; i++) {
            
            if(data[i].ObjectID == 2)
            {
                html += '<div class="col-33" style="width: calc((100% - 5px*2) / 3);">'+
                            '<a class="listitem">'+
                                '<div class="offer-box" data-fullText="2">'+
                                    '<ul>'+
                                        '<li>'+
                                            '<i class="far fa-file-alt"></i>'+
                                        '</li>'+
                                        '<li>Items List</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</a>'+
                        '</div>';
                // =====================main menu=================//
                htmlmenu +='<li>'+
                              '<a class="item-link item-content panel-close listitem">'+
                                '<div class="item-media"><i class="far fa-file-alt"></i></div>'+
                                '<div class="item-inner">'+
                                  '<div class="item-title">Items List</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';
            }
            if(data[i].ObjectID == 99)
            {
                html+='<div class="col-66" style="width: calc((100% - 5px*2) / 3);">'+
                                        '<a class="patientHistory">'+
                                            '<div class="offer-box" data-fullText="99">'+
                                                    '<ul>'+
                                                        '<li>'+
                                                            '<i class="fas fa-history"></i>'+
                                                        '</li>'+
                                                        '<li style="color: white;">Patient History</li>'+
                                                    '</ul>'+
                                            '</div>'+
                                        '</a>'+
                                    '</div>';
                // =====================main menu=================//
                htmlmenu +='<li>'+
                              '<a class="item-link item-content panel-close patientHistory">'+
                                '<div class="item-media"><i class="fas fa-history"></i></div>'+
                                '<div class="item-inner">'+
                                  '<div class="item-title">Patient History</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';
            }
            if(data[i].ObjectID == 26)
            {
                html+='<div class="col-33" style="width: calc((100% - 5px*2) / 3);">'+
                            '<a class="summary">'+
                                '<div class="offer-box" data-fullText="26">'+
                                    '<ul>'+
                                        '<li>'+
                                            '<i class="far fa-calendar-alt"></i>'+
                                        '</li>'+
                                        '<li>Sale Summary</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</a>'+
                        '</div>';
                // =====================main menu=================//
                htmlmenu +='<li>'+
                              '<a class="item-link item-content panel-close summary">'+
                                '<div class="item-media"><i class="far fa-calendar-alt"></i></div>'+
                                '<div class="item-inner">'+
                                  '<div class="item-title">Sale Summary</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';
            }
            if(data[i].ObjectID == 101)
            {
                html +='<div class="col-33" style="width: calc((100% - 5px*2) / 3);">'+
                            '<a class="vsign">'+
                                '<div class="offer-box" data-fullText="101">'+
                                    '<ul>'+
                                        '<li>'+
                                            '<i class="far fa-list-alt"></i>'+
                                        '</li>'+
                                        '<li style="color: white;">VITAL SIGN</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</a>'+
                        '</div>';

                  html +='<div class="col-33" style="width: calc((100% - 5px*2) / 3);">'+
                            '<a class="listvsign">'+
                                '<div class="offer-box" data-fullText="101">'+
                                    '<ul>'+
                                        '<li>'+
                                            '<i class="far fa-folder-open"></i>'+
                                        '</li>'+
                                        '<li style="color: white;">VitalSign History</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</a>'+
                        '</div>';

                // =====================main menu=================//

                htmlmenu +='<li>'+
                              '<a class="item-link item-content panel-close vsign">'+
                                '<div class="item-media"><i class="far fa-list-alt"></i></div>'+
                                '<div class="item-inner">'+
                                  '<div class="item-title">Vital Sign</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';
                            
                htmlmenu +='<li>'+
                              '<a class="item-link item-content panel-close listvsign">'+
                                '<div class="item-media"><i class="far fa-folder-open"></i></div>'+
                                '<div class="item-inner">'+
                                  '<div class="item-title">VitalSign History</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';

            }
            if(data[i].ObjectID == 89)
            {
                html +='<div class="col-33" style="width: calc((100% - 5px*2) / 3);">'+
                            '<a class="visit">'+
                                '<div class="offer-box" data-fullText="101">'+
                                    '<ul>'+
                                        '<li>'+
                                            '<i class="far fa-address-card"></i>'+
                                        '</li>'+
                                        '<li style="color: white;">Visit</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</a>'+
                        '</div>';
                // =====================main menu=================//
                htmlmenu +='<li>'+
                              '<a class="item-link item-content panel-close visit">'+
                                '<div class="item-media"><i class="far fa-address-card"></i></div>'+
                                '<div class="item-inner">'+
                                  '<div class="item-title">Visit</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';
            }
            if(data[i].ObjectID == 109)
            {
                html +='<div class="col-33" style="width: calc((100% - 5px*2) / 3);">'+
                            '<a class="inventory">'+
                                '<div class="offer-box" data-fullText="101">'+
                                    '<ul>'+
                                        '<li>'+
                                            '<i class="fas fa-database"></i>'+
                                        '</li>'+
                                        '<li style="color: white;">Inventory</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</a>'+
                        '</div>';

                htmlmenu +='<li>'+
                              '<a class="item-link item-content panel-close inventory">'+
                                '<div class="item-media"><i class="fas fa-database"></i></div>'+
                                '<div class="item-inner">'+
                                  '<div class="item-title">Inventory</div>'+
                                '</div>'+
                              '</a>'+
                            '</li>';
            }
            
        }

        app.popup.close('.login-screen',true);
        $('.dashboard-area div.permission').append(html);
        $('.mainmenu div ul').append(htmlmenu);
        app.preloader.hide();

        ConfigServer();
    });
}

// ============================= ConfigServer============================//

function ConfigServer()
{

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "PhoneGap svdb", 200000);
        db.transaction(successCB);

        
    }  
    function queryDB(tx) {
          tx.executeSql('SELECT * FROM contbl', [], querySuccess);
          tx.executeSql('SELECT * FROM tblUser', [], querySuccessUser);
    }
    function querySuccess(tx, results) {
          var len = results.rows.length;
          app.preloader.show();
          for (var i=0; i<len; i++){

              var link = results.rows.item(i).appname;
              
              $('.server').val(results.rows.item(i).sname);
              $('.appname').val(results.rows.item(i).appname);
              $('.database').val(results.rows.item(i).dbname);
              $('.dbuser').val(results.rows.item(i).dbuname);
              $('.my-url-link').append(link);

              $('.vsign').attr("href","/vsign/"+link);
              $('.listvsign').attr("href","/listvsign/"+link);
              $('.mvsign').attr("href","/vsign/"+link);
              $('.listitem').attr("href","/listitem/"+link);
              $('.visit').attr("href","/visit/"+link);
              $('.changepassword').attr("href","/profile/"+link);
              $('.patientHistory').attr("href","/patienthistory/"+link);
              $('.summary').attr("href","/summary/"+link);
              $('.inventory').attr("href","/inventory/"+link);
          }
          app.preloader.hide();
          
    }
    function querySuccessUser(tx,results)
    {
        var len = results.rows.length;
        for (var i = 0; i < len.length; i++) {}
        $('.my-display-user').text(results.rows.item(i).username);
    }
    function successCB() {
      var db = window.openDatabase("Database", "1.0", "PhoneGap svdb", 200000);
      db.transaction(queryDB);
    }

}

    

  