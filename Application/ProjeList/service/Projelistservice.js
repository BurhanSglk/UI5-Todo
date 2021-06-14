sap.ui.define([], function () {
    "use strict";
    return {
        creatProjeTable : function(){
            db.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS proje(projeno INTEGER PRIMARY KEY, projeName VARCHAR(50))"),
                    function(tx, result) {
                        alert(result);
                    },
                    function(tx, error) {
                        alert(error.message);
                    }      
            })    
        },
        addProje: function (proje) {
            var projes = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("INSERT INTO proje(projeName) VALUES(?)", [proje],
                        function(tx, result) {
                            resolve(true)
                            console.log("Kayıt Başarılı")
                        },
                        function(tx, error) {
                            resolve(false)
                            console.log("Kayıt Başarısız")
                        })
                })
            });
            return projes;
        },     
        list : function(){
            var projeList = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select projeno , projeName FROM proje' , [] ,
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
        deleteProject: function (proje) {
            var delProje = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("DELETE FROM proje WHERE projeName=? ", [proje],
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
        updateProje: function (proje,projeNo) {
            var delPerson = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("UPDATE proje SET projeName =? WHERE projeno=?", [proje,projeNo],
                        function(tx, result) {
                            resolve(true)
                            console.log("Güncelleme başarılı")
                        },
                        function(tx, error) {
                            resolve(false)
                            console.log("Güncelleme Başarısız")
                        })
                })
            });
            return delPerson;
        },
        deleteTicket: function (proje) {
            var delTicket = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("DELETE FROM ticket WHERE proje=? ", [proje],
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
            return delTicket;
        },        
    }
});