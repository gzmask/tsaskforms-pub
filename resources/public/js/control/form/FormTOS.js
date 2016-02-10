function rebindActionFormTOS(obj){	
	
}

function validateFormTOS(obj){
    if ($('input:radio[name=tos_response]:checked').val() != "yes") {
          alert("You need to accept our terms to use this form.");
          return false;
    } else {
          return true;
    }
}
//WTF is this stil in use?
function formTOS(obj, sm) {
	var form_tos_text=obj.find("#form_tos_text").text();
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_tos">';
	control=control+'  <tr>';
	if(''!=form_tos_text){
	control=control+'    <td width="70" id="form_tos_text" style="Vertical-align:Top;">'+form_tos_text+'</td>';	
	}
	control=control+'    <td style="Vertical-align:Top;">';		
	control=control+'      <table width="100%" border="0" cellspacing="0" cellpadding="0">';
	obj.find("#form_tos_item").each(function(){
		control=control+'<tr>';
		control=control+'  <td id="form_tos_item" >';
		if($(this).find("#form_tos_value").attr("checked")==undefined){
			control=control+'    <input id="form_tos_value" name="" type="checkbox" value="" disabled="disabled" />';		
		}else{
			control=control+'    <input id="form_tos_value" name="" type="checkbox" value="" disabled="disabled" checked="checked" />';		
		}
		control=control+'    <label id="form_tos_label">'+$(this).find("#form_tos_label").text()+'</label>';
		control=control+'  </td>';
		control=control+'</tr>';
	});
	control=control+'      </table>';
	control=control+'    </td>';			
	control=control+'  </tr>';
	control=control+'</table>';
	return control;
}
