function formPayment(obj, sm) {
	var form_email_label=obj.find("#form_email_label").text();
	var form_payment_cost=obj.find("#form_payment_cost").val();	
	var form_payment_tax=obj.find("#form_payment_tax").val();
	var form_payment_shipping=obj.find("#form_payment_shipping").val();	
	var form_payment_extra=obj.find("#form_payment_extra").val();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_payment">';
	control=control+'  <tr>';
	control=control+'    <td width="118" valign="top" id="form_email_label" >'+form_email_label+'</td>';
	control=control+'    <td width="98" align="left" valign="top"><input class="intxt" id="form_payment_cost" value="'+form_payment_cost+'"  style="width:80px;" readonly="true"  /><br /><span class="fonti">Cost</span></td>';
	control=control+'    <td width="98" align="left" valign="top"><input class="intxt" id="form_payment_tax" value="'+form_payment_tax+'"  style="width:80px;" readonly="true" /><br /><span class="fonti">Tax(%)</span></td>';
	control=control+'    <td width="98" align="left" valign="top"><input class="intxt" id="form_payment_shipping" value="'+form_payment_shipping+'"  style="width:80px;" readonly="true" /><br /> <span class="fonti">Shipping</span></td>';
	control=control+'    <td align="left" valign="top"><input class="intxt" id="form_payment_extra" value="'+form_payment_extra+'"  style="width:200px;" readonly="true" />';
	control=control+'    <br />';
	control=control+'    <span class="fonti">Extra field</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}
