/*
* 移动端适配,rem做适配
* app开发票按钮切换js
* 
*
*/
window.onload = function(){
	// 普通发票与增值发票切换开始,获取元素
	var oSelectTab = document.getElementById("select-tab"),
	    oVoiceBtns = oSelectTab.getElementsByTagName("span"),
	    oTips = document.getElementById("tips"),
	    oVatSpeInvoice  = document.getElementById("vat-special-invoice"),
	    oInvoiceTaitou = document.getElementById("invoice-taitou"),
	    oVatInvoice = document.querySelector(".vat-Invoice"),
	    oCommonActive = document.querySelector(".common-active"),
	    oCommonInvoicePage = document.getElementById("common-invoice-page"),
	    oIco = document.getElementById("ico-com"),
	    oIcoBtns = oIco.getElementsByTagName("i"),
	    oUnitInputCon = document.getElementById("unit-input-con"),
	    oIcoVoicon = document.getElementById("ico-voicon"),
	    oIcoConBtns = oIcoVoicon.getElementsByTagName("i"),
	    oVatSpecIcon = document.getElementById("vat-spec-icon"),
	    oVatIconBtns = oVatSpecIcon.getElementsByTagName("i");

	// 普通发票与增值发票切换结束
	comVatIncoiceTab();
	// 普通发票与增值发票按钮切换函数
	function comVatIncoiceTab(){
			for(var i = 0;i<oVoiceBtns.length;i++){
			oVoiceBtns[i].index = i;
			oVoiceBtns[i].addEventListener('touchstart',function(){
				for(var j = 0;j<oVoiceBtns.length;j++){
					oVoiceBtns[j].className = "";
				}
				this.className = "common-invoice-active";
				if(this.index == 1){
					oTips.style.display = "block";
					oVatSpeInvoice.style.display = "block";
					oInvoiceTaitou.style.display = "none";
					oVatInvoice.className = "vat-active";
					oCommonInvoicePage.className = "w264";

				}else{
					oTips.style.display = "none";
					oVatSpeInvoice.style.display = "none";
					oInvoiceTaitou.style.display = "block";
					oCommonInvoicePage.className = "common-invoice-active w264";
					oVatInvoice.className = "w228";
				}
			}) 
		}
	}
    // 普通发票与增值发票切换结束
    //发票抬头按钮结束
    var icoLength = oIcoBtns.length = oIcoConBtns.length = oVatIconBtns.length;
    // 发票抬头按钮开始
	for(var i = 0;i<icoLength;i++){
		oIcoBtns[i].index = i;
		oIcoBtns[i].addEventListener('touchstart',function(){
			for(var j = 0;j<icoLength;j++){
				oIcoBtns[j].className = "";
				oIcoBtns[j].className = "second-icon";
			}
			this.className = "icon-active";
			if(this.index == 1){
				oUnitInputCon.style.display = "block";
			}else{
				oUnitInputCon.style.display = "none";
			}
		})
	}
	// 发票抬头按钮结束
    iconTab(oIcoConBtns); // 普通发票下,发票内容按钮切换
    iconTab(oVatIconBtns); // 增值发票下,发票内容按钮切换
    function iconTab(oIcoBtn){               
	    	for(var i = 0;i<icoLength;i++){
				oIcoBtn[i].index = i;
				oIcoBtn[i].addEventListener('touchstart',function(){
				for(var j = 0;j<icoLength;j++){
					oIcoBtn[j].className = "";
					oIcoBtn[j].className = "second-icon";
				}
				this.className = "icon-active";
			  })
			}
    }
   // 手指触发时改变输入框内的字体颜色开始
   inputFontColor($("#unit-input-con input.txt"));
   inputFontColor($(".form-box p.flex-right input.txt"));
   function inputFontColor(objFontColor){
   		objFontColor.focus(function(){
   			this.style.color = "#333";
   		})
   }
  // 手指触发时改变输入框内的字体颜色结束
    
}

