sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'SapUI5Tutorial/Application/TicketList/service/ticketListservice'
], function( Controller,MessageToast,ticketListservice) {
    "use strict";
    var that = this
    var pageController = Controller.extend("SapUI5Tutorial.Application.TicketList.controller.TicketList", {
        onInit: function(){
            var person =localStorage.getItem("ad")
            oModel.setProperty("/ticket",[])
            oModel.setProperty("/statü",[])
            oModel.setProperty("/selectStatu",[])
            ticketListservice.selectStatu().then(function(res){  
                var items= oModel.getProperty("/statü")
                for(var i =0; i<res.length ;i++){
                    items.push(res[i]) 
                }            
                oModel.setProperty("/statü" , items)
                if(res){
                    ticketListservice.list().then(function(result){
                        if(result){ 
                            var data = oModel.getProperty("/ticket")
                            for(var i =0; i<result.length ;i++){
                                data.push(result[i]) 
                            }
                            for(var i = 0; i<res.length;i++){
                                data[i].statu = res[i].statüName
                            }
                            var newData =data.filter(x=> x.kime.indexOf(person) ==0)
                            oModel.setProperty("/ticket",newData)
                        }
                    })
                }
            })
        },
        openScreen(){
            this.onInit();
            this.getView().byId("comboBox1").setValue("Yeni")  
        },
        personelList : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("PersonelList");
        },
        projeList : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("ProjeList");
        },
        addTicket:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("addTicket");
        },
        statu : function(){

        },
        contextMenu : function(oEvent){
            if(oEvent.mParameters.item.mProperties.text == "Add"){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("addTicket");
            }
            if(oEvent.mParameters.item.mProperties.text == "Update"){
                var data = oModel.getProperty(oEvent.getSource().getBindingContext().sPath);
                var orientation = sap.ui.controller("SapUI5Tutorial/Application/addTicket/controller/addTicket");
                orientation.updateTicket(data.ticketno, "Update");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("addTicket");
                
            }
            if(oEvent.mParameters.item.mProperties.text == "Delete"){
                var data = oModel.getProperty(oEvent.getSource().getBindingContext().sPath);
                var asd = oModel.getProperty("/ticket")
                var orientation = sap.ui.controller("SapUI5Tutorial/Application/addTicket/controller/addTicket");
                orientation.editTicket(data.ticketno, "Delete");
                ticketListservice.deleteStatu(data.ticketno ).then(function(){
                }) 
                var ticket = asd.filter(x => x.ticketno !=data.ticketno)
                oModel.setProperty("/ticket" , ticket)
                  
            }
        }
    })
    return pageController;
})    