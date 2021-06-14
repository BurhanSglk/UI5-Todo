sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'SapUI5Tutorial/Application/PersonelList/Service/PersonellistService'
], function(  Controller,MessageToast,PersonellistService) {
    "use strict";
    var img = []
    var pageController = Controller.extend("SapUI5Tutorial.Application.PersonelList.controller.PersonelList", {
        onInit: function() {
            this.getView().setModel(oModel);
            oModel.setProperty("/personellist" ,[])
            this.clear();
            PersonellistService.list().then(function(res){
                var items= oModel.getProperty("/personellist")
                for(var i =0; i<res.length;i++){
                    items.push(res[i])
                }    
                oModel.setProperty("/personellist" , items)
            })
            PersonellistService.creatPersonTable();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("PersonelList").attachPatternMatched(this.openScreen, this);
        },
        openScreen: function(){
            // var rol =localStorage.getItem("lastuser")
            // if(rol == "0"){
            //     this.getView().byId("detail").setVisible(false)
            //     MessageToast.show("Kullanıcı Giriş Yaptı")
            // }
            // else if(rol =="1") MessageToast.show("Admin Giriş Yaptı")
            // else {
            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     oRouter.navTo("Login");
            // }
        },
        onChange : function(oEvent){
            var aFiles = oEvent.getParameters().files;
            var currentFile = aFiles[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                img = e.target.result;
            };
            reader.readAsDataURL(currentFile);
        },
        add : function(){
            var item = oModel.getProperty("/personel");
            if(item.ad && item.soyad && item.telno) {
                var kntrl = oModel.oData.personellist.filter(x => x.mail ==item.mail)
                if(kntrl.length > 0){
                    alert("Mail Kullanımda")
                    return
                }
                this.clear();
                item.password="123456"
                var items = oModel.getProperty("/personellist")
                item.foto = img
                PersonellistService.addPerson(item.ad,item.soyad,item.mail,item.foto,item.telno).then(function(res){
                    if(res){
                        items.push(item)
                        oModel.setProperty("/personellist" , items)
                        MessageToast.show("Kayıt Başarılı");                                                                                                    
                    }else{
                        MessageToast.show("Kayıt Başarısız");
                    }
                })
            }   
            else {
                MessageToast.show("Gereki Alanları Doldur");
            }
            img = []
        },
        // ekleme işlemi yapıldıktan sonra ekranı temizlemek için 
        clear: function(){
            oModel.setProperty("/personel", {
                ad:"",
                soyad:"",
                mail:"",
                telno:"",
                foto:"",
                password:"",
            })
        },
        // listeden seçtiğim verinin inputlara dolması
        itemselect:function(oEvent){
            var item = JSON.parse(JSON.stringify(oModel.getProperty(oEvent.getSource().getBindingContextPath()))) 
            oModel.setProperty("/personel",item)
            this.getView().byId("add").setVisible(false)
            this.getView().byId("update").setVisible(true)
            this.getView().byId("deleteUserButton").setVisible(true)
        },
        // güncelleme işlemi
        update:function(){
            debugger
            var item = oModel.getProperty("/personel");
            if(item.ad && item.soyad && item.telno) {
                var items = oModel.getProperty("/personellist")
                    items.forEach(element => {
                        if(element.personelno == item.personelno){
                            element.ad =item.ad
                            element.soyad = item.soyad
                            element.password = item.password
                            element.mail = item.mail
                            element.telno = item.telno
                            if(img.length >5){
                                element.foto = img
                                PersonellistService.updatePerson(item.ad,item.soyad,item.password,item.mail,item.telno,img,item.personelno).then(function(res){
                                })
                                console.log("img çalıştı")
                            }
                            else{
                                element.foto = item.foto
                                PersonellistService.updatePerson(item.ad,item.soyad,item.password,item.mail,item.telno,item.foto,item.personelno).then(function(res){
                                })
                            }
                        }
                    });
                    oModel.setProperty("/personellist" , items)
                    MessageToast.show("Güncelleme Başarılı");
                    this.getView().byId("update").setVisible(false)
                    this.getView().byId("deleteUserButton").setVisible(false)
                    this.getView().byId("add").setVisible(true)
                    this.clear();
                    img = []
            }
            else {
                MessageToast.show("Eksik Alan");
            }
        },
        // yönlendirmeler
        out:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Login");
            localStorage.clear()
        },
        newProject:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("ProjeList");
        },
        ticketList:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("TicketList");
        },
        addTicket:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("addTicket");
        },
        onDelete:function(){
            var person = oModel.getProperty("/personellist")
            var snc =this.getView().byId("email_Input").getValue()
            var asd =this.getView().byId("nameInput").getValue()
            var person = person.filter(x => x.mail !=snc)
            oModel.setProperty("/personellist" , person)
            PersonellistService.deletePerson(snc).then(function(res){
            })
            PersonellistService.deleteTicket(asd).then(function(res){
            })
            this.clear();
            this.getView().byId("add").setVisible(true)
            this.getView().byId("update").setVisible(false)
            this.getView().byId("deleteUserButton").setVisible(false)
        }
    })
    return pageController;
})
