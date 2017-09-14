/*
* pc端开发票js
*
*/

$(function(){
	// 普通发票(纸质)与增值税专用发票切换开始
	$(".message-con p.invoice-select a").click(function(){
		var index = $(this).index();
		$(this).addClass("active").siblings("a").removeClass("active");
		if(index == 0){
			/*console.log("左边");*/
			$(".common-voice-part").show();
			$(".special-Vat-Invoice-part").hide();
			$(".common-invoic-page").css({"border":"none"});
			$(".vat-invoice").css({"border":"1px solid #DCDCDC"});

		}else{
			/*console.log("右边");*/
			$(".common-invoic-page").css({"border":"1px solid #DCDCDC"});
			$(".vat-invoice").css({"border":"none"});
			$(".common-voice-part").hide();
			$(".special-Vat-Invoice-part").show();
		}
	})
    // 普通发票(纸质)与增值税专用发票切换结束
    /*不开发票按钮点击开始*/
     $(".common-voice-part .common-voice-p a").click(function(){
     	 var index = $(this).index();
     	 $(this).addClass("active-invoice").siblings("a").removeClass("active-invoice");
     	 if(index == 1){
     	 	/*console.log("左边");*/
     	 	$(".no-open-voice").css({"border":"none"})
     	 	$(".detail").css({"border":"1px solid #DCDCDC"});
     	 }else{
     	 	/*console.log("右边");*/
     	 	$(".no-open-voice").css({"border":"1px solid #DCDCDC"});
     	 	$(this).css({"border":"none"});
     	 }
     })
    /*不开发票按钮点击结束*/
    /*增值税专用发票内容不开发票按钮开始*/
    $(".special-Vat-Invoice-part form p.voice-con a").click(function(){
    	var index = $(this).index();
    	$(this).addClass("voice-con-active").siblings("a").removeClass("voice-con-active");
    	if(index == 1){
     	 	/*console.log("左边");*/
     	 	$(".no-open-voice").css({"border":"none"});
     	 	$(".detail").css({"border":"1px solid #DCDCDC"})
     	 }else{
     	 	/*console.log("右边");*/
     	 	$(".no-open-voice").css({"border":"1px solid #DCDCDC"});
     	 	$(".detail").css({"border":"none"});
     	 }
    })
    /*增值税专用发票内容不开发票按钮结束*/

	// 点击新增单位发票
	$(".add-invoice").click(function(){
		$(".newList-voice").show();
		$(".tax-number-p").show();
		var oNextVoiceP = $("<p />",{
			class:"nextVoiceP"
		}).appendTo(".newList-voice");
		var oInputTxt = $("<input />",{
			class:"newList-txt newList-txt-active",
			name:"",
			type:"text",
			placeholder:"请输入发票单位",
			disabled:false,
			focus:function(){
				$(this).removeClass("newList-txt-active");
				return false;
			}
		})
		oInputTxt.appendTo(oNextVoiceP);
		if($(".newList-voice").find("input").hasClass("newList-txt-active")){
			$(this).removeClass("newList-txt-active").siblings().addClass("newList-txt-active");
		}
		//去除输入框的背景边框
		$(oInputTxt).removeClass("newList-txt-active");
		var oSaveBtn = $("<span />",{
			class:"saveBtn",
			text:"保存",
			click:function(){
				 var oInputTxtVal = oInputTxt.val();
				 if(oInputTxtVal == ""){
				 	   $(oInputTxt).removeClass("newList-txt-active");
				 	   $(oErrorTip).show();
				 	   $(oInputTxt).css({"border":"1px solid #D7000F"});
				 }else{
				 	    //console.log("我不为空");
				        $(oInputTxt).attr("disabled",true);
				        $(this).hide();
				        $(oNextVoiceP).hover(function(){
				    	    $(oEdit).show();
				    	    $(oDelete).show();
			    	    // 点击输入框添加背景边框
			    	    $(".newList-voice p").click(function(){
			    	   		 $(this).find("input").addClass("newList-txt-active").parent().siblings().find("input").removeClass("newList-txt-active");
			    	    	 return false;
			    	    });
			     },function(){
			    	    $(oEdit).hide();
			    	    $(oDelete).hide();
			     });
				 return false;
			 }
			}
		})
		oSaveBtn.appendTo(oNextVoiceP);
		var oErrorTip = $("<span />",{
			class:"newVoiceInput-error",
			text:"*发票内容不能为空"
		});
		oErrorTip.appendTo(oNextVoiceP);
		/*鼠标碰到表单时,保存按钮显示*/
		$(oInputTxt).focus(function(){
			$(oSaveBtn).show();
		});
		/*编辑和删除按钮创建开始*/
		var oEdit = $("<span />",{
			class:"EditBtn",
			text:"编辑",
			click:function(){
				$(oInputTxt).attr("disabled",false);
				$(oNextVoiceP).unbind('mouseenter').unbind('mouseleave');
				$(this).hide();
				$(oDelete).hide();

				$(oInputTxt).focus(function(){
					$(oInputTxt).bind('input propertychange',function(){
						$(oInputTxt).removeClass("newList-txt-active");
					});
					return false;
				});
				return false;
			}
		})
		oEdit.appendTo(oNextVoiceP);
		var oDelete = $("<span />",{
			class:"deleteBtn",
			text:"删除",
			click:function(){
				if(confirm("确定要删除该条发票信息?")){
					$(oNextVoiceP).remove();
				}
			}
		});
		oDelete.appendTo(oNextVoiceP);
		/*if(oInputTxt.hasClass("newList-txt")){
			$(".newList-voice p").find("input.newList-txt").addClass("newList-txt-active").siblings().removeClass("newList-txt-active");
		}*/
		
		/*编辑和删除按钮创建结束*/
		// 监听新增表单开始
		$(oInputTxt).bind('input propertychange',function(){
				$(oErrorTip).hide();  // 红色提示文字隐藏
				$(oInputTxt).css({"border":"1px solid #DCDCDC","border-radius":"1px;"})
				
				return false;
		})
		// 监听新增表单结束
	});
	/*增值税专用表单前后字体变化*/
	fontColor($("#special-Vat-form p input.txt"));
	function fontColor(objInputTxt){
		objInputTxt.focus(function(){
			$(this).css("color","#333");
		})
	}
	/*点击普通发票(纸质),新增单位发票下纳税人识别号校验开始*/
	 $(".common-voice-part p a.sure").click(function(){
	 	 var oNewTaxInputTax = $("#new-unit-voice p input.tax-txt");
	 	 if(oNewTaxInputTax.val() == ""){
	 	 	$(".message-con .common-voice-part p span.taxpayNum").show();
	 	 }else{
	 	 	$(".message-con .common-voice-part p span.taxpayNum").hide();
	 	 }
	 	 oNewTaxInputTax.bind('input propertychange',function(){
	 	 	$(".message-con .common-voice-part p span.taxpayNum").hide();
	 	 })
	 });
	/*击普通发票(纸质),新增单位发票下纳税人识别号校验结束*/
    /*增值税专用表单验证开始*/
    $("#special-Vat-form .sure").click(function(){
    	/*获取表单*/
    	 var oCompanyName = $("#special-Vat-form p input.txtUnit"),
    	     oTaxIdentNumber = $("#special-Vat-form p input.txtIndent"),
    	     oTxtAddress     = $("#special-Vat-form p input.txtAddress"),
    	     oTxtNumber      = $("#special-Vat-form p input.txtNumber"),
    	     oTxtBack        = $("#special-Vat-form p input.txtBack"),
    	     oTxtAccount     = $("#special-Vat-form p input.txtAccount"),
    	     oErrorUnitName  = $("#special-Vat-form  p span.error-unit-name"),
    	     oErrorTaxindentNumber = $("#special-Vat-form  p span.error-taxindent-number"),
    	     oErrorRegisterAddress = $("#special-Vat-form  p span.error-register-address"),
    	     oErrorRegisterNum = $("#special-Vat-form  p span.error-register-num");
    	     oErrorOpenBack = $("#special-Vat-form  p span.error-open-back"),
    	     oErrorBackAccount = $("#special-Vat-form p span.error-back-account");

    	 inVoiceInputError(oCompanyName,oErrorUnitName,oErrorUnitName);
    	 inVoiceInputError(oTaxIdentNumber,oErrorTaxindentNumber,oErrorTaxindentNumber);
    	 inVoiceInputError(oTxtAddress,oErrorRegisterAddress,oErrorRegisterAddress);
    	 inVoiceInputError(oTxtNumber,oErrorRegisterNum,oErrorRegisterNum);
    	 inVoiceInputError(oTxtBack,oErrorOpenBack,oErrorOpenBack);
    	 inVoiceInputError(oTxtAccount,oErrorBackAccount,oErrorBackAccount);
    	 function inVoiceInputError(oInput,objTxtError,oErrorHide){
    	 	if(oInput.val() == ""){
    	 		objTxtError.show();
    	 	}else{
    	 		objTxtError.hide();
    	 	}
    	 	// 当表单焦点触发,输入内容不为空时,红色提示错误消失
    	 	oInput.bind('input propertychange',function(){
    	 		 $(oErrorHide).hide();
    	 	});
    	 }
    	 /*验证纳税人15位或者18位数字开始*/
		 var str = /^\d{15}$|^\d{18}$/;
		 if(str.test(oTaxIdentNumber).length){
		     oErrorTaxindentNumber.hide();
		 }else{
		     oErrorTaxindentNumber.show();
		 }
		 /*验证纳税人15位或者18位数字结束*/
    })
    /*增值税专用表单验证结束*/

    /*点击关闭按钮关闭弹窗开始*/
    $(".close").click(function(){
    	$(".mask").fadeOut();
    	$(".pop-window").fadeOut();
    });
    /*点击关闭按钮弹窗结束*/
})