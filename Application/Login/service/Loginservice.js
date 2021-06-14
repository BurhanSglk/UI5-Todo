sap.ui.define([], function () {
    "use strict";
    return {
        personControl : function(mail,pass){
            var personelList = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select * from personel where mail=? and password=?' , [mail,pass] ,
                        function(tx,result){ 
                            resolve(result.rows)
                        },
                        function(tx, error) {
                            resolve(false)
                            console.log("Listeleme Başarısız")
                        })
                  })
            });
            return personelList;
        }    
    }
});