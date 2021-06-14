
sap.ui.define([], function () {
    "use strict";
    return {
        creatPersonTable: function(){
            db.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS personel(personelno INTEGER PRIMARY KEY,ad VARCHAR (50),soyad VARCHAR(50),foto VARCHAR(50),password VARCHAR(50),mail VARCHAR(50),telno VARCHAR(50),rol BYTE)"),
                    function(tx, result) {

                        alert(result);
                    },
                    function(tx, error) {
                        alert(error.message);
                    }   
            })
        }, 
        addPerson: function (ad, soyad, mail, foto , telno) {
            var person = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("INSERT INTO personel(ad,soyad,foto,password,mail,telno,rol) VALUES(?,?,?,'123456',?,?,0)", [ad, soyad, foto, mail,telno],
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
            return person;
        },     
        list : function(){
            var personelList = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select personelno ,ad , soyad , foto , mail , telno ,password from personel' , [] ,
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
        },
        deletePerson: function (mail) {
            var delPerson = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("DELETE FROM personel WHERE mail=? ", [mail],
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
            return delPerson;
        },     
        updatePerson: function (ad,soyad,password,mail,telno,foto,personelno) {
            var delPerson = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("UPDATE personel SET ad=? , soyad=? ,password=?,mail=? , telno=? , foto=? WHERE personelno =? ", [ad,soyad,password,mail,telno,foto,personelno],
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
        deleteTicket: function (param) {
            var delTicket = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("DELETE FROM ticket WHERE kime=? ", [param],
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

