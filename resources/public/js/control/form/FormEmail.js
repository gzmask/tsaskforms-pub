function formEmail(obj, sm) {
	var form_email_label=obj.find("#form_email_label").text();
	var form_email_value=obj.find("#form_email_value").val();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_email">';
	control=control+'  <tr>';
	control=control+'    <th width="80" valign="top" id="form_email_label" >'+form_email_label+'</th>';
	control=control+'    <td colspan="2" align="left" valign="top"><input class="intxt" id="form_email_value"  value="'+form_email_value+'" style="width:500px;" readonly /></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}