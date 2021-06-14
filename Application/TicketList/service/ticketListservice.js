sap.ui.define([], function () {
    "use strict";
    return {
        list : function(){
            var projeList = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select ticketno, proje,subject,kimden,kime,baslangıc,bitis  FROM ticket' , [] ,
                        function(tx,result){  
                            resolve(result.rows)
                            console.log("Listeleme Başarılı")
                        },
                        function(tx, error) {
                            resolve(false)
                            console.log("Listeleme Başarısız")
                        })
                  }) 
            });
            return projeList;
        },
        selectStatu : function(){
            var statu = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select statüNo , statüName FROM statü' , [] ,
                        function(tx,result){  
                            resolve(result.rows)
                            resolve(true)
                            console.log("Listeleme Başarılı")
                        },
                        function(tx, error) {
                            resolve(false)
                            console.log("Listeleme Başarısız")
                        })
                  }) 
            });
            return statu;
        },
        deleteStatu: function (statüNo) {
            var delProje = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("DELETE FROM statü WHERE statüNo=? ", [statüNo],
                        function(tx, result) {
                            resolve(true)
                            console.log("Silme başarılı")
                        },
                        function(tx, error) {
                            resolve(false)
                            console.log(" Başarısız")
                        })
                })
            });
            return delProje;
        },  
    }
});