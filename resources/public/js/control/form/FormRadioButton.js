function rebindActionFormRadioButton(obj){	
}

function formRadioButton(obj, sm) {
	var form_radio_buton_label=obj.find("#form_radio_buton_label").text();
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_radio_button">';
	control=control+'  <tr>';
	if(''!=form_radio_buton_label){
	control=control+'    <td width="70" id="form_radio_buton_label" style="Vertical-align:Top;">'+form_radio_buton_label+'</td>';	
	}	
	control=control+'    <td style="Vertical-align:Top;">';		
	control=control+'      <table width="100%" border="0" cellspacing="0" cellpadding="0">';	
	obj.find("#form_radio_button_item").each(function(){
		control=control+'  <tr class="item_radio_button" >';
		control=control+'    <td id="form_radio_button_item">';
		alert($(this).find("#RadioGroup").val());
		if($(this).find("#RadioGroup").is(":checked")){
			control=control+'          <input type="radio" name="'+$(this).find("#RadioGroup").attr("name")+'" value="" id="RadioGroup" disabled="disabled" checked />';
		}else{
			control=control+'          <input type="radio" name="'+$(this).find("#RadioGroup").attr("name")+'" value="" id="RadioGroup" disabled="disabled" />';
		}		
		control=control+'    <label id="form_check_box_label">'+$(this).find("#form_check_box_label").text()+'</label>';
		control=control+'   </td>';
		control=control+'  </tr>';
	});	
	control=control+'      </table>';
	control=control+'    </td>';			
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}