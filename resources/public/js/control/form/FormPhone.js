function formPhone(obj, sm) {
	var form_phone_label=obj.find("#form_phone_label").text();
	var form_phone_area_code=obj.find("#form_phone_area_code").val();
	var form_phone_phone_number=obj.find("#form_phone_phone_number").val();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_phone">';
	control=control+'  <tr>';
	control=control+'    <th width="98" valign="top">'+form_phone_label+'</th>';
	control=control+'    <td width="136" align="left" valign="top"><input class="intxt" id="form_phone_area_code" value="'+form_phone_area_code+'" style="width:120px;" readonly /><br />';
	control=control+'<span class="fonti">Area Code</span></td>';
	control=control+'    <td width="10" align="center" valign="middle"><span class="fontc2">-</span><br />';
	control=control+'<span class="fonti">&nbsp;</span></td>';
	control=control+'    <td align="left" valign="top"><input class="intxt" id="form_phone_phone_number" value="'+form_phone_phone_number+'" style="width:160px;" readonly /><br />';
	control=control+'<span class="fonti">Phone Number</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}