sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Button",
    'SapUI5Tutorial/Application/ProjeList/service/Projelistservice'
], function(Controller,MessageToast,Fragment,Dialog,Input,Button,Projelistservice) {
    "use strict";
    var pageController = Controller.extend("SapUI5Tutorial.Application.ProjeList.controller.ProjeList", {
        onInit: function(){
            this.getView().setModel(oModel);
            this.clear();
            oModel.setProperty("/projeList" ,[])
            oModel.setProperty("/project" , {
                projeNo:"",
            })
            Projelistservice.creatProjeTable();
            Projelistservice.list().then(function(res){
                var items= oModel.getProperty("/projeList")
                for(var i =0; i<res.length ;i++){
                    items.push(res[i]) 
                }
                oModel.setProperty("/projeList" , items)    
            })
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("ProjeList").attachPatternMatched(this.openScreen, this);
        },
        // yönlendirmeler
        openScreen : function(){
            var user = localStorage.getItem("lastuser")
            if(user ==null){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Login");
            }
        },
        ticketlist : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("TicketList");
        },
        personellist : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("PersonelList");
        },
        out : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Login");
            localStorage.clear()
        },
        addTicket:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("addTicket");
        },
        //
        //  fragment ile dialog oluşturma
        // newproject: function () {
        //     if (!this.addProjeDialog) {
        //         this.addProjeDialog = sap.ui.xmlfragment("SapUI5Tutorial.Application.ProjeList.fragment.ProjeList", this);
        //      }
        //      this.addProjeDialog.open();
        // },
        // proje ekleme ve ayarları
        clear:function(){
            oModel.setProperty("/proje",{
                name:"",
            })
        },
        editProject:function(oEvent){
            this.newproject();
            var selectProje = oEvent.getSource().getBindingContextPath();
            var selectProject = JSON.parse(JSON.stringify(oModel.getProperty(selectProje)));
            oModel.setProperty("/project" , selectProject.projeno)
            sap.ui.getCore().byId("projeInput").setValue(selectProject.projeName)
            sap.ui.getCore().byId("rejcetButton").setVisible(true)
            sap.ui.getCore().byId("updateButton").setVisible(true)
            sap.ui.getCore().byId("saveButton").setVisible(false)
        },
        editProje:function(){
            var items = oModel.getProperty("/projeList")
            var snc =items.filter(x => x.projeName == op)
            var asd =snc[0].projeno
            oModel.setProperty("/projeList", items)
            var kntrl = sap.ui.getCore().byId("projeInput").getValue()
            Projelistservice.updateProje(kntrl , asd).then(function(res){
            })
        },
        newproject: function(){
            if(!this.oDialog){
             var oDialog = new Dialog({
                 title: "Proje Ekle",
                 content: [
                    new Input({
                        value:"{/proje/name}",
                        id:"projeInput",    
                        placeholder:"Proje adı"
                    })
                ],
                buttons: [
                    new Button({
                        text: "Close",
                         press: function(){
                             oDialog.destroy();
                                oModel.setProperty("/proje",{
                                name:"",
                            })
                        }
                    }),
                    new Button({
                        text: "Save",
                        id:"saveButton",
                        type:"Accept",
                        press : function(){
                            var user =sap.ui.getCore().byId("projeInput").getValue()
                            var projeName = oModel.getProperty("/proje")
                            var projeList = oModel.getProperty("/projeList")
                            if(user.length < 1){
                                MessageToast.show("Proje Alanı Boş Bırakılamaz")
                                return
                            }
                            if(user){
                                for(var i=0; i<projeList.length;i++){
                                if(projeList[i].projeName == user){
                                MessageToast.show("Proje Kullanımda")
                            return
                                }
                            }
                            }
                            if(user){
                                projeList.push({projeName:oModel.oData.proje.name})
                                oModel.setProperty("/projeList" , projeList)
                            }
                            Projelistservice.addProje(oModel.oData.proje.name).then(function(res){
                            if(res){
                            console.log("Proje EKLENDİ")
                            }
                            })
                            oDialog.destroy();
                            oModel.setProperty("/proje",{
                                name:"",
                            })
                        }
                    }),
                    new Button({
                        text: "Reject",
                        id:"rejcetButton",
                        visible:false,
                        type:"Reject",
                        press :function(){
                            var kntrl = sap.ui.getCore().byId("projeInput").getValue()
                            var projes = oModel.getProperty("/projeList")
                            var projes = projes.filter(x => x.projeName !=kntrl)
                            oModel.setProperty("/projeList", projes)
                            MessageToast.show("Silme işlemi başarılı")
                            Projelistservice.deleteProject(kntrl).then(function(res){
                            })
                            oDialog.destroy();
                            oModel.setProperty("/proje",{
                                name:"",
                            })
                            Projelistservice.deleteTicket(kntrl).then(function(res){
                            })
                        }
                    }),
                    new Button({
                        text: "Update",
                        id:"updateButton",
                        visible:false,
                        type:"Accept",
                        press :function(oEvent){
                            var proje = sap.ui.getCore().byId("projeInput").getValue()
                            var projes = oModel.getProperty("/projeList")
                            var projeNo = oModel.oData.project
                            projes.forEach(element => {
                                if(element.projeno == projeNo){
                                    element.projeName = proje
                                }  
                            });
                            MessageToast.show("Düzenleme Başarılı")
                            oModel.setProperty("/projeList", projes)      
                            Projelistservice.updateProje(proje , projeNo).then(function(res){
                            })
                            oDialog.destroy();
                            oModel.setProperty("/proje",{
                                name:"",
                            })
                        }
                    }).addStyleClass("asd"),
                ]
            });
            oDialog.open();
            } 
        }


    })
    return pageController;
})  