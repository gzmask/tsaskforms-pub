function formFullName(obj, sm) {
	var form_full_name_label=obj.find("#form_full_name_label").text();
	var form_full_name_first_name=obj.find("#form_full_name_first_name").val();
	var form_full_name_last_name=obj.find("#form_full_name_last_name").val();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_full_name">';
	control=control+'  <tr>';
	control=control+'  <th width="80" valign="top" id="form_full_name_label">'+form_full_name_label+'</th>';
	control=control+'    <td width="251" align="left" valign="top"><input class="intxt" id="form_full_name_first_name" value="'+form_full_name_first_name+'" style="width:235px;" readonly/>';
	control=control+'      <br />';
	control=control+'      <span class="fonti">First Name</span></td>';
	control=control+'    <td align="left" valign="top"><input class="intxt" id="form_full_name_last_name" value="'+form_full_name_last_name+'" style="width:238px;" readonly/>';
	control=control+'     <br />';
	control=control+'      <span class="fonti">Last Name</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}