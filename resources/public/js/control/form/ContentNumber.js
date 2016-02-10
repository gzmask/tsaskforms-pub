function formNumber(obj, sm) {
	var form_number_label=obj.find("#form_number_label").text();
	var form_number_value=obj.find("#form_number_value").text();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_number">';
	control=control+'  <tr>';
	control=control+'    <th width="120" id="form_number_label" >'+form_number_label+'</th>';
	control=control+'    <td colspan="3" id="form_number_value" >'+form_number_value+'</td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}