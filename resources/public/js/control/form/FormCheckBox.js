function rebindActionFormCheckBox(obj){	
	
}

function formCheckBox(obj, sm) {
	var form_check_box_text=obj.find("#form_check_box_text").text();
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_check_box">';
	control=control+'  <tr>';
	if(''!=form_check_box_text){
	control=control+'    <td width="70" id="form_check_box_text" style="Vertical-align:Top;">'+form_check_box_text+'</td>';	
	}
	control=control+'    <td style="Vertical-align:Top;">';		
	control=control+'      <table width="100%" border="0" cellspacing="0" cellpadding="0">';
	obj.find("td#form_check_box_item").each(function(){
		control=control+'<tr>';
		control=control+'  <td id="form_check_box_item" >';
		if($(this).find("#form_check_box_value").attr("checked")==undefined){
			control=control+'    <input id="form_check_box_value" name="" type="checkbox" value="" disabled="disabled" />';		
		}else{
			control=control+'    <input id="form_check_box_value" name="" type="checkbox" value="" disabled="disabled" checked="checked" />';		
		}
		control=control+'    <label id="form_check_box_label">'+$(this).find("#form_check_box_label").text()+'</label>';
		control=control+'  </td>';
		control=control+'</tr>';
	});
	control=control+'      </table>';
	control=control+'    </td>';			
	control=control+'  </tr>';
	control=control+'</table>';
	return control;
}
