sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,JSONModel,Filter, FilterOperator) {
	"use strict";

	return Controller.extend("BOND_TEST3.controller.View1", {
		
		onInit: function () {
			
    	var sUrl = "/sap/opu/odata/sap/ZPJ_BDTRAN_TEST_SRV/";
    	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
    	this.getView().setModel(oModel);
    
		},
		
		// 종목조회
		onReadBdClass: function () {
			// 4000000001928
            var securityId = this.byId("securityId").getValue();
            if (securityId == ""){
            	alert("null");
            }
            else{
            	
            	// alert(securityId);
				var oModelDetail = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZPJ_BOND_TEST_SRV/");
				var sPath = "/Z_BDCLASSSet(SecurityId='" + securityId + "')";
				var that = this;
				
				oModelDetail.read(sPath, {

				success: function(oData,oResponse){
					// alert("ok!!");
					
					var data = oData;
					console.log(data);
					// console.log(">>>>"+this);
					that.byId("xsecClass").setValue(data.XsecClass); //유가증권분류
					that.byId("xbondClass").setValue(data.XbondClass); //채권분류
					that.byId("szbmeth").setValue(data.Szbmeth); //일수계산방법
					that.byId("itcd").setValue(data.Itcd); //이자지급방법
					that.byId("ittm").setValue(data.Ittm); //이자지급계산주기
					that.byId("issueDate").setValue(data.IssueDate); //발 행 일
					that.byId("eddt").setValue(that.dateFormat(data.Eddt)); //만 기 일
					that.byId("cupr").setValue(data.Cupr); //표면이자율
					that.byId("ipyohal01").setValue(data.Ipyohal01); //할 인 율
					that.byId("hidt").setValue(that.dateFormat(data.Hidt)); //최초이자지급일
					that.byId("isin").setValue(data.Isin); //표준코드
					that.byId("xrfmd").setValue(data.Xrfmd); //상환방법
					
					
				},

				error: function(oError){
					var lvErrTxt = oError.message;
					alert(lvErrTxt);
				}

				});   
            	
            }
            
            
		},
		
		// //상품유형 다이얼로그
		// onValueHelpRequest: function (oEvent) {
  //  	var oView = this.getView();
  //  	var oDialog = oView.byId("valueHelpDialog");

  //  	// 다이얼로그를 열어줍니다.
  //  	oDialog.open();
  //  },
    
    // // dialog ok button
    // onValueHelpOk: function (oEvent) {
    //   var oSelectedItem = this.getView().byId("valueHelpList").getSelectedItem();
    //   if (oSelectedItem) {
    //     var sCustomerId = oSelectedItem.getDescription();
    //     this.getView().byId("productType").setValue(sCustomerId);
    //   }
    //   this.getView().byId("valueHelpDialog").close();
    // },
	
	// // dialog cancel button
 //   onValueHelpCancel: function (oEvent) {
 //     this.getView().byId("valueHelpDialog").close();
 //   },
    
  //  // dialog search button
  //  onSearch: function (oEvent) {
		// // build filter array
		// var aFilter = [];
		// var sQuery = oEvent.getParameter("query");
		
		// console.log(sQuery);
		// if (sQuery) {
		// 	aFilter.push(new Filter("Gsart", FilterOperator.Contains, sQuery));
		// 	aFilter.push(new Filter("Ltx", FilterOperator.Contains, sQuery));
		// }
		// else{
		// 	aFilter.push(new Filter("Gsart", FilterOperator.Contains, sQuery));
		// }
			
		// var oFilter = new Filter({
  //             filters: aFilter,
  //             and: false // 'false'는 OR 조건을 의미
  //          });
			
  //      // filter binding
  //      var oTable = this.byId("valueHelpList");
		// var oBinding = oTable.getBinding("items");
  //      oBinding.filter(oFilter);
      
  //  },
    
    // 조회 button
    onSelect : function(){
    		
			var dealNumber = this.byId("dealNumber").getValue();
			var oFilter = new Filter([new Filter("DealNumber", FilterOperator.EQ,dealNumber)],false);
			var oModelDetail = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZPJ_BDTRAN_TEST_SRV/");
			
			// function dateFormat(oDate){
				
			// var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
   //                 // pattern: "dd/MM/yyyy"
   //                 pattern: "yyyy.MM.dd."
   //             });
   //             var pDate = new Date(oDate);
   //             var sFormattedDate = oDateFormat.format(pDate);
			
			// return sFormattedDate;
			// }
			
			var that = this;
		
		oModelDetail.read("/Z_BDTRANSet", {
			filters: [oFilter],
			// success: function(oRetrievedResult) { 
			success:function(oData, response){
		// 		// // 1000000016439
				var data = oData.results;
				
				console.log(data[0]);

				that.getView().byId("companyCode").setValue(data[0].CompanyCode); // 회사 코드
				that.getView().byId("securityId").setValue(data[0].SecurityId); // 종목ID
				that.getView().byId("productType").setValue(data[0].ProductType); // 상품유형
				that.getView().byId("sfhaart").setValue(data[0].Sfhaart); // 거래유형
				that.getView().byId("status").setValue(data[0].Status); // 상태
				that.getView().byId("zdataSrc").setValue(data[0].Zdatasrc); // 데이터구분
				that.getView().byId("expId").setValue(data[0].ExpId); // 구,포지션ID
				
				// that.getView().byId("curr").setValue(data[0].PaymentDate); // 통화
				
				that.getView().byId("tradingDate").setValue(that.dateFormat(data[0].TradingDate)); // 거래일
				that.getView().byId("payMentDate").setValue(that.dateFormat(data[0].PaymentDate)); // 결제일
				
				that.getView().byId("nominalAmt").setValue(data[0].NominalAmt); // 액 면
				that.getView().byId("rrate").setValue(data[0].Rrate); // 수 익 률
				that.getView().byId("zprice1").setValue(data[0].Zprice1); // 계산단가
				that.getView().byId("zprice4").setValue(data[0].Zprice4); // 단가조정
				that.getView().byId("zprice2").setValue(data[0].Zprice2); // 적용단가
		// 		// // document.getElementById("xebert").value = data[0].Xebetr; // 시가 >> 
				that.getView().byId("tradeAmt").setValue(data[0].TradeAmt); // 매매금액
				that.getView().byId("settleAmt").setValue(data[0].SettleAmt); // 정산금액
				that.getView().byId("settleKAmt").setValue(data[0].SettleKamt); // 정산금액
				
				that.getView().byId("ininAmt").setValue(data[0].IntAmt); // 경과이자
				that.getView().byId("ininKAmt").setValue(data[0].IntKamt); // 경과이자
				
				that.getView().byId("kontrh").setValue(data[0].Kontrh); // 거 래 처
				that.getView().byId("hbkid").setValue(data[0].Hktid); // 당사계좌
				that.getView().byId("hktid").setValue(data[0].Hbkid); // 당사계좌
				
				that.getView().byId("sglzb").setValue(data[0].Sglzb); // 예 탁 처
				that.getView().byId("accNo").setValue(data[0].AccNo); // 결제계좌
				
				// 관리정보
				that.getView().byId("portfolio").setValue(data[0].Portfolio); // 계정구분
				that.getView().byId("accountGroup").setValue(data[0].AccountGroup); // 운용펀드
				that.getView().byId("manager").setValue(data[0].Manager); // 운용역
				that.getView().byId("operPart").setValue(data[0].OperPart); // 운용부서
				that.getView().byId("crnam").setValue(data[0].Crnam); // 사용자
				that.getView().byId("securityAccount").setValue(data[0].SecurityAccount); // 유가증권계정
				that.getView().byId("buyDate").setValue(data[0].BuyDate); // 매입결제일
				
				// 금융상품분류
				that.getView().byId("stBdGbn").setValue(data[0].StBdGbn); // 지분채무구분
				that.getView().byId("fvociYn").setValue(data[0].FvociYn); // FVOCI 지정여부
				that.getView().byId("fvociRsn").setValue(data[0].FvociRsn); // FVOCI 지정사유
				that.getView().byId("arsnText").setValue(data[0].ArsnText); // 기타사유
				that.getView().byId("comValClass").setValue(data[0].ComValClass); // 보유목적
				
				// 종목정보
				that.onReadBdClass( );
				that.getView().byId("zfrate1").setValue(data[0].Zfrate1); //FRN RATE1
				that.getView().byId("zfrate2").setValue(data[0].Zfrate2); //FRN RATE2
				alert('조회 성공');
			},
			error: function(oError) {
				var lvErrTxt = oError.message;
				alert(lvErrTxt);
				
			},
			async: true
			
		});
		},
		
		dateFormat: function(oDate){
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                    // pattern: "dd/MM/yyyy"
            pattern: "yyyy.MM.dd."
            });
            
            var pDate = new Date(oDate);
            var sFormattedDate = oDateFormat.format(pDate);
			
			return sFormattedDate;
		},
		
		// SEARCH HELP
		
    //////////////////////////////////////////////////////////////////회사코드 Value Help - S
    onCocdHelp: function(oEvent){
    	var oView = this.getView();
    	var oDialog = oView.byId("HelpCompanyCode");
    	
    	oDialog.open();
    },
    
    onCocdOk: function(oEvent){
    	var oSelectedItem = this.getView().byId("CoCdTable").getSelectedItem();
    	var oContext = oSelectedItem.getBindingContext();
    	var oSelectedData = oContext.getObject();
    	var oData = oSelectedData.Bukrs;
     if (oData) {
        this.getView().byId("companyCode").setValue(oData);
      } 

      this.getView().byId("HelpCompanyCode").close();
    },
    
    onCocdCancel: function (oEvent) {
      this.getView().byId("HelpCompanyCode").close();
    },
	//////////////////////////////////////////////////////////////////회사코드 Value Help - E    
	
//////////////////////////////////////////////////////////////////종목ID Value Help - S   
   
	onSecurityHelp: function(oEvent){
      var oView = this.getView();
      var oDialog = oView.byId("HelpSecurity");

      
      oDialog.open();    		
	},   
   
//////////////////////////////////////////////////////////////////종목ID Value Help - E	
    
//////////////////////////////////////////////////////////////////상품유형 Value Help - S		
	onValueHelpRequest: function (oEvent) {
      var oView = this.getView();
      var oDialog = oView.byId("valueHelpDialog");

      // 다이얼로그를 열어줍니다.
      oDialog.open();
    },
    
    onValueHelpOk: function (oEvent) {
      var oSelectedItem = this.getView().byId("valueHelpList").getSelectedItem();
    	var oContext = oSelectedItem.getBindingContext();
    	var oSelectedData = oContext.getObject();
    	var oData = oSelectedData.Gsart;
     if (oData) {
        this.getView().byId("productType").setValue(oData);
      } 
      this.getView().byId("valueHelpDialog").close();
    },

    onValueHelpCancel: function (oEvent) {
      this.getView().byId("valueHelpDialog").close();
    },
    
    onSearch: function (oEvent) {
	// build filter array
      var aFilter = [];
      var sQuery = oEvent.getParameter("query");
      if (sQuery) {
         aFilter.push(new Filter("Gsart", FilterOperator.Contains, sQuery));
         aFilter.push(new Filter("Ltx", FilterOperator.Contains, sQuery));
      } else {
      	 aFilter.push(new Filter("Gsart", FilterOperator.Contains, sQuery));
      }
         
      var oFilter = new Filter({
               filters: aFilter,
               and: false // 'false'는 OR 조건을 의미
            });
         
        // filter binding
      var oTable = this.byId("valueHelpList");
      var oBinding = oTable.getBinding("items");
        oBinding.filter(oFilter);
    },
    //////////////////////////////////////////////////////////////////상품유형 Value Help - E    
    
    
//////////////////////////////////////////////////////////////////당사계좌1 Value Help - S    
    onValueHelpRequest2: function (oEvent){
      var oView = this.getView();
      var oDialog = oView.byId("valueHelpDialog2");

      
      oDialog.open();    	
    },
    
     onValueHelpOk2: function (oEvent) {
    	var oSelectedItem = this.getView().byId("accountTable").getSelectedItem();
    	var oContext = oSelectedItem.getBindingContext();
    	var oSelectedData = oContext.getObject();
    	var oData = oSelectedData.Hbkid;
     if (oData) {
        this.getView().byId("hbkid").setValue(oData);
      } 

      this.getView().byId("valueHelpDialog2").close();
    },
    
    onValueHelpCancel2: function (oEvent) {
      this.getView().byId("valueHelpDialog2").close();
    },
    
    onSearch2: function (oEvent) {
	// build filter array

			var aFilter = [];
			var sQuery = oEvent.getParameter("query");

			if (sQuery) {
				aFilter.push(new Filter("Hbkid", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.getView().byId("accountTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);

    },
    //////////////////////////////////////////////////////////////////당사계좌1 Value Help - E    
    
 //////////////////////////////////////////////////////////////////당사계좌2 Value Help - S
    onValueHelpRequest3: function (oEvent){
      var oView = this.getView();
      var oDialog = oView.byId("valueHelpDialog3");

      
      oDialog.open();    	
    },
    
     onValueHelpOk3: function (oEvent) {
      var oSelectedItem = this.getView().byId("valueHelpList3").getSelectedItem();
      if (oSelectedItem) {
        var sCustomerId = oSelectedItem.getTitle();
        this.getView().byId("hktid").setValue(sCustomerId);
      }
      this.getView().byId("valueHelpDialog3").close();
    },
    
    onValueHelpCancel3: function (oEvent) {
      this.getView().byId("valueHelpDialog3").close();
    },
    
    onSearch3: function (oEvent) {
	// build filter array
            var sQuery = oEvent.getSource().getValue();  
            var oFilter = new sap.ui.model.Filter({
                filters: [
                    new sap.ui.model.Filter("Hktid", sap.ui.model.FilterOperator.Contains, sQuery)
                ],
                and: false
            });

            var oBinding = sap.ui.getCore().byId("valueHelpList3").getBinding("items");     
            oBinding.filter(oFilter, sap.ui.model.FilterType.Application);   
    }
    //////////////////////////////////////////////////////////////////당사계좌2 Value Help - E    

	});
});