sap.ui.define([], function (){
    "use strict";
    return {
        creatTicketTable : function(){
            db.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS ticket(ticketno INTEGER PRIMARY KEY,proje,subject,kimden,kime,baslangıc,bitis)"),
                    function(tx, result) {
                        alert(result);
                    },
                    function(tx, error) {
                        alert(error.message);
                    }
            })
        },
        creatStatüTable: function(){
            db.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS statü(statüNo INTEGER PRIMARY KEY, statüName VARCHAR(50))"),
                    function(tx, result) {
                        alert(result);
                    },
                    function(tx, error) {
                        alert(error.message);
                    }      
            })    
        },
        list : function(){
            var projeList = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select   projeName from proje' , [] ,
                        function(tx,result){  
                            resolve(result.rows)
                            // var items= oModel.getProperty("/projeList")
                            // for(var i =0; i<result.rows.length ;i++){
                            //     items.push(result.rows[i])     
                            // oModel.setProperty("/projeList" , items)
                            resolve(true)
                        },
                        function(tx, error) {
                            resolve(false)
                            console.log("Listeleme Başarısız")
                        })
                  }) 
            });
            return projeList;
        },
        person : function(){
            var personelList = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select   ad from personel' , [] ,
                        function(tx,result){  
                            var items= oModel.getProperty("/personelList")
                            for(var i =0; i<result.rows.length ;i++){
                                items.push(result.rows[i]) 
                            }            
                            oModel.setProperty("/personelList" , items)
                            resolve(true)
                        },
                        function(tx, error) {
                            resolve(false)
                            console.log("Listeleme Başarısız")
                        })
                  }) 
            });
            return personelList;
        },
        addTicket: function (proje,konu,kimden,kime,baslangıc,bitis) {
            var ticket = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("INSERT INTO ticket(proje,subject,kimden,kime,baslangıc,bitis) VALUES(?,?,?,?,?,?)", [proje,konu,kimden,kime,baslangıc,bitis],
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
            return ticket;
        },   
        addStatu: function (statu) {
            var projes = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("INSERT INTO statü(statüName) VALUES(?)", [statu],
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
        getTicket : function(ticketno){
            var personelList = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select * from ticket where ticketno=?' , [ticketno] ,
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
        getStatu : function(){
            var personelList = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql('select  statüNo, statüName from statü' , [] ,
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
        deleteTicket: function (ticketno) {
            var delProje = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("DELETE FROM ticket WHERE ticketno=? ", [ticketno],
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
        updateTickets: function (proje,konu,kime,baslangıc,bitis,ticketno) {
            var delPerson = new Promise(function (resolve) {
                db.transaction(function(tx){
                    tx.executeSql("UPDATE ticket SET proje=? ,subject=? , kime=? , baslangıc=?, bitis=? WHERE ticketno =? ", [proje,konu,kime,baslangıc,bitis,ticketno],
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
    }
});