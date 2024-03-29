sap.ui.define([
    "loky/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "loky/model/models",
    "sap/m/MessageToast"
], function(Controller, JSONModel, myModel, MessageToast) {
    //'use strict';
    return Controller.extend("loky.controller.MyXML",{
        //Once my Controller object is created then only initialization should happen
        //onInit - like constructor of the class, which gets called once the object is created
        onInit: function(){
            //another way of initializing class level variables
            //base class method which is of same name
            Controller.prototype.onInit.apply(this);
            console.log("Child Class Constructor");
            //a global variable @ class level which can be used by other methods
            this.oView = this.getView();

            var oModel = myModel.createJSONModel("model/mockdata/data.json");

            var oModelGOT = myModel.createJSONModel("model/mockdata/sample.json");
            //Step 3: Make model aware to the app
            sap.ui.getCore().setModel(oModel);
            sap.ui.getCore().setModel(oModelGOT,"got");
            
            // var oSalary = this.getView().byId("idEmpSal");
            // oSalary.bindValue("/empStr/salary"); //here we alredy telling UI5 for binding, it is expected from us to pass PATH
            // var oCurrency = this.getView().byId("idEmpCurr");
            // oCurrency.bindProperty("value", "/empStr/currency");
            
            //  var oTab = this.getView().byId("myTable");
            //oTab.bindAggregation("rows", "/empTab");
            
            // oTab.bindRows("/empTab/row");
            // var oTab = this.getView().byId("myTable");
            //oTab.bindAggregation("rows", "/empTab");
            // oTab.bindRows("/empTab");
        },
        //TODO: Anubhav to show how to access controller variable value inside view
        anubhav: 9000,
        //step no 1.
        onRowSelect: function(oEvent){
            //alert("Dude now you just clicked on a row!");
            // debugger;
            //first using event object we get the address of the row
            this.elementAddress = oEvent.getParameter("rowContext").getPath();
            this.index = oEvent.getParameter("rowIndex");
            //using the address we get the data on that row
            // oRowData = sap.ui.getCore().getModel().getProperty(elementAddress);
            //this data we set to the empStr so that the twoway show data on screen
            //sap.ui.getCore().getModel().setProperty("/empStr", oRowData);
            //Which row was selected
            //What is the address of the row /empTab/index
            
            //NEW Approach - Element Binding
            //Get The object of Simple Form
            var oSimple = this.getView().byId("myForm");
            //Bind Element directly to the Simple form - For Simplefrom, its a Absolute Path now
            oSimple.bindElement(this.elementAddress);

        },
        onDelete: function(){debugger;
            if(this.index === undefined) {
                MessageToast.show("Please Select a Row");
                return;
            }
            var oModel = sap.ui.getCore().getModel();
            var aData = oModel.getProperty("/empTab");
            aData.splice(this.index, 1);
            oModel.setProperty("/empTab", aData);
            this.index = undefined;
        },
        onFlip: function(){

            var oModel = sap.ui.getCore().getModel(oModel);
            var oModelGOT = sap.ui.getCore().getModel("got");

            sap.ui.getCore().setModel(oModelGOT);
            sap.ui.getCore().setModel(oModel, "got");

        },
        onBeforeRendering: function(){
            //if(checkings....)
            this.oView.byId("MyButton").setEnabled(false);
            
        },
        onAfterRendering: function(){
            //$("#myView--myForm").hide().fadeIn(5000);
        },
        //oView : this.getView(),
        clickMe: function(params) {
            //sap.ui.getCore()
            //var oView = this.getView();
            var oControl = this.oView.byId("MyButton");

            //var oControl = sap.ui.getCore().byId("__xmlview0--MyButton");

            oControl.setVisible(false);
        },
        onMagic: function () {
            //gray out all fields
            var oModel = sap.ui.getCore().getModel();
            //access of data using model
            var myJsonData = oModel.setProperty("/empStr/mario", false);
        },
        onShow: function(){
            //get the view object
            //var oView = this.getView();
            //get the control object using the view
            //if the id changes in the view, this code also needs change, if we have 500 fields, 500 line sof code
            // var oEmpId = this.oView.byId("idEmpID");
            // console.log("Employee ID is : ", oEmpId.getValue());

            // var oEmpName = this.oView.byId("idEmpName");
            // console.log("Employee Name is : ", oEmpName.getValue());

            // var oSal = this.oView.byId("idEmpSal");
            // console.log("Employee Salary is : ", this.calculateSal(oSal.getValue()));

            // //using chaning w/o creating extra variable
            // console.log("Employee Currency is : ", this.oView.byId("idEmpCurr").getValue());

            //get model object
            var oModel = sap.ui.getCore().getModel();
            //access of data using model
            var myJsonData = oModel.getProperty("/empStr");
            console.log(myJsonData);

        }
    });
});