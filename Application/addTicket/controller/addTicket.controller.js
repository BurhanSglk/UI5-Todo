sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/Token',
    'SapUI5Tutorial/Application/addTicket/service/addTicketservice',
    'sap/m/MessageToast',
    
], function( Controller,Token,addTicketservice,MessageToast) {
    "use strict";
    var that = this
    var pageController = Controller.extend("SapUI5Tutorial.Application.addTicket.controller.addTicket", {
        onInit: function(){
            this.getView().setModel(oModel)
            oModel.setProperty("/projeList" ,[])
            oModel.setProperty("/personelList" ,[])
            oModel.setProperty("/status",[{
                stats:"Yeni",
            },
            {
                stats:"Orta"
            },
            {
                stats:"Acil"
            }
            ])
            addTicketservice.list().then(function(res){
                var items= oModel.getProperty("/projeList")
                for(var i =0; i<res.length ;i++){
                    items.push(res[i])
                }
                oModel.setProperty("/projeList" , items)       
            })
            this.clear();
            addTicketservice.person().then(function(res){  
            })
            addTicketservice.getStatu().then(function(res){
                console.log(res[0].statüNo)
            })
            this.getView().byId("comboBox1").setValue("Yeni")
            addTicketservice.creatTicketTable();
            addTicketservice.creatStatüTable();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("addTicket").attachPatternMatched(this.openScreen, this);
        },
        openScreen: function(){
            var name =localStorage.getItem("ad")
            var lname = localStorage.getItem("soyad")
            this.getView().byId("multiInputy").setEnabled(false)
            this.getView().byId("multiInputy").setValue(name +" " + lname)
        }, 
        clear: function(){
            oModel.setProperty("/ticket", { 
            })
        },
        sil:function(){
            var ticket =oModel.getProperty("/ticket")
            ticket.proje=""
            ticket.subject = ""
            ticket.to =""
            ticket.start=""
            ticket.finish=""
            oModel.setProperty("/ticket", ticket)
        },
        // ticket tablo verileri
        addTicket : function (){
            debugger
            var kntrl =oModel.getProperty("/lastTicket")
            if(kntrl>0){
                var ticket = oModel.getProperty("/ticket")
                var aTokens=this.getView().byId("multiInputx").getTokens();
                addTicketservice.updateTickets(ticket.proje,ticket.subject,aTokens[0].mProperties.text,ticket.start,ticket.finish,kntrl).then(function(res){
                })
                MessageToast.show("Güncelleme Başarılı")
                oModel.setProperty("/lastTicket",0)
                return
            }
            var aTokens=this.getView().byId("multiInputx").getTokens();
            if(aTokens.length==1){
                oModel.setProperty("/ticket/to" ,aTokens[0].mProperties.text)
            }
            else {
                oModel.setProperty("/ticket/to" ,aTokens[0].mProperties.text +","+ aTokens[1].mProperties.text)
            }
            var info = oModel.getProperty("/ticket")
            addTicketservice.addTicket(info.proje,info.subject,info.from,info.to,info.start,info.finish).then(function(res){ 
            })
            addTicketservice.addStatu(info.statu).then(function(res){
            })
            this.getView().byId("multiInputx").destroyTokens();
            this.getView().byId("comboBox").setValue();
            this.getView().byId("subjectInput").setValue();
            this.getView().byId("DTI1").setValue();
            this.getView().byId("DTI2").setValue();
            this.getView().byId("multiInputx").setValue(); 
        },
        // yönlendirmeler
        out:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Login");
            localStorage.clear()
        },
        personelList:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("PersonelList");
        },
        ticketList:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("TicketList");
            var orientation = sap.ui.controller("SapUI5Tutorial/Application/TicketList/controller/TicketList");
            orientation.openScreen();
        },
        newProject:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("ProjeList");  
        },
        //
        editTicket: function(ticketno,y){
            addTicketservice.deleteTicket(ticketno).then(function(res){
            })
        },
        updateTicket:function(ticketno,y){
            oModel.setProperty("/lastTicket",ticketno)
            addTicketservice.getTicket(ticketno).then(function(res){
                var ticket =oModel.getProperty("/ticket")
                ticket.proje=res[0].proje
                ticket.subject =res[0].subject
                ticket.from =res[0].kimden
                ticket.to =res[0].kime
                ticket.start=res[0].baslangıc
                ticket.finish=res[0].bitis
                oModel.setProperty("/ticket",ticket)
            })
        },
        datePickerChange:function(oEvent){
            debugger
            var date1 = parseInt(this.getView().byId("DTI2").getValue().slice(0,2))
            var date2 = parseInt(this.getView().byId("DTI1").getValue().slice(0,2))
            if(date2 > date1){
                MessageToast.show("Başlangıç Tarihi Hatalı")
                this.getView().byId("DTI1").setValue("")
                this.getView().byId("DTI2").setValue("")
            }  
        }
    })
    return pageController;
})    