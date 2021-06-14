sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'SapUI5Tutorial/Application/Login/Service/Loginservice'
], function(Controller,MessageToast,Loginservice) {
    "use strict";
    var pageController = Controller.extend("SapUI5Tutorial.Application.Login.controller.Login", {
        onInit: function(){
            this.getView().setModel(oModel);
            this.clear();
            oModel.setProperty("/login" ,[])
        },
        logIn:function(){
            var loginData = oModel.getProperty("/log")
            Loginservice.personControl(loginData.email.trim(),loginData.sifre).then(res =>{
                if(res && res.length){
                    localStorage.setItem('lastuser' , res[0].rol)
                    localStorage.setItem('ad' , res[0].ad)
                    localStorage.setItem('soyad' , res[0].soyad)
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("PersonelList");
                    this.clear();
                }else MessageToast.show("Hatalı Bilgi")
            })
        },
        clear:function(){
            oModel.setProperty("/log" ,{
                email:"",
                sifre:""
            })
        }
    })
    return pageController;
})    