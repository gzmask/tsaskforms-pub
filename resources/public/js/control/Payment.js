function controlPayment(str_payment_name,str_payment_text, str_form_payment_cost, str_form_payment_tax,str_form_payment_shipping, str_form_payment_extra) {
	if (typeof str_payment_name == 'undefined')str_payment_name='';
	if (typeof str_payment_text == 'undefined')str_payment_text='Click to edit this text...';	
	if (typeof str_form_payment_cost == 'undefined')str_form_payment_cost='';
	if (typeof str_form_payment_tax == 'undefined')str_form_payment_tax='';
	if (typeof str_form_payment_shipping == 'undefined')str_form_payment_shipping='';	
	if (typeof str_form_payment_extra == 'undefined')str_form_payment_extra='';	

	var control_payment='    <li class="control control_payment">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Payment</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab">'+
	
	'  <tr>'+
	'    <td width="118">control name:</td>'+
	'    <td colspan="4" align="left"><input class="intxt" id="payment_name" value="'+str_payment_name+'" style="width:235px;"/></td>'+
	'  </tr>'+	
	
	'  <tr>'+
	'    <td width="118" valign="top"><input class="intxt" id="payment_text" value="'+str_payment_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}" style="width:100px;"/></td>'+
	'    <td width="98" align="left" valign="top"><input class="intxt" id="form_payment_cost" value="'+str_form_payment_cost+'"  style="width:80px;"/><br /><span class="fonti">Cost</span></td>'+
	'    <td width="98" align="left" valign="top"><input class="intxt" id="form_payment_tax" value="'+str_form_payment_tax+'"  style="width:80px;"/><br /><span class="fonti">Tax(%)</span></td>'+
	'    <td width="98" align="left" valign="top"><input class="intxt" id="form_payment_shipping" value="'+str_form_payment_shipping+'"  style="width:80px;"/><br /> <span class="fonti">Shipping</span></td>'+
	'    <td align="left" valign="top"><input class="intxt" id="form_payment_extra" value="'+str_form_payment_extra+'"  style="width:200px;"/>'+
	'    <br />'+
	'    <span class="fonti">Extra field</span></td>'+
	'  </tr>'+
	'</table>'+
	'    </div>'+
	'    </li>';
	return control_payment;
}
function addPayment(obj, sm) {
	var c=$('.fbc_list').append(controlPayment()).find("li.control:last");
	bindAction(c);
};

function savePayment(obj, sm) {
	var payment_name=obj.find("#payment_name").val();
	var payment_text=obj.find("#payment_text").val();
	var form_payment_cost=obj.find("#form_payment_cost").val();	
	var form_payment_tax=obj.find("#form_payment_tax").val();
	var form_payment_shipping=obj.find("#form_payment_shipping").val();	
	var form_payment_extra=obj.find("#form_payment_extra").val();	
	var control='';
	control=controlPayment(payment_name,payment_text,form_payment_cost,form_payment_tax,form_payment_shipping,form_payment_extra);
	return control;
}

function makePayment(obj, sm) {
	var payment_name=obj.find("#payment_name").val();
	var payment_text=obj.find("#payment_text").val();
	var form_payment_cost=obj.find("#form_payment_cost").val();	
	var form_payment_tax=obj.find("#form_payment_tax").val();
	var form_payment_shipping=obj.find("#form_payment_shipping").val();	
	var form_payment_extra=obj.find("#form_payment_extra").val();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_payment">';
	control=control+'  <tr>';
	control=control+'    <td width="118" valign="top" id="form_email_label" >'+payment_text+'</td>';
	control=control+'    <td width="98" align="left" valign="top"><input name="'+payment_name+'_cost" class="intxt" id="form_payment_cost" value="'+form_payment_cost+'"  style="width:80px;" readonly="true" /><br /><span class="fonti">Cost</span></td>';
	control=control+'    <td width="98" align="left" valign="top"><input name="'+payment_name+'_tax" class="intxt" id="form_payment_tax" value="'+form_payment_tax+'"  style="width:80px;" readonly="true" /><br /><span class="fonti">Tax(%)</span></td>';
	control=control+'    <td width="98" align="left" valign="top"><input name="'+payment_name+'_shipping" class="intxt" id="form_payment_shipping" value="'+form_payment_shipping+'"  style="width:80px;" readonly="true" /><br /> <span class="fonti">Shipping</span></td>';
	control=control+'    <td align="left" valign="top"><input name="'+payment_name+'_extra" class="intxt" id="form_payment_extra" value="'+form_payment_extra+'"  style="width:200px;" readonly="true" />';
	control=control+'    <br />';
	control=control+'    <span class="fonti">Extra field</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}
