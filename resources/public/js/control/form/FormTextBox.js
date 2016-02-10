function formTextBox(obj, sm) {
	var form_text_box_label=obj.find("#form_text_box_label").text();
	var form_text_box_text=obj.find("#form_text_box_text").val();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_text_box">';
	control=control+'  <tr>';
	control=control+'    <th id="form_text_box_label" >'+form_text_box_label+'</th>';
	control=control+'    <td colspan="3"><input id="form_text_box_text" class="intxt" value="'+form_text_box_text+'" style="width:500px;" readonly /></td>';
	control=control+'  </tr>';
	control=control+'</table>';
	return control;	
}

function validateFormInvoice(obj) {
        if ($('input[name=InvoiceNumber]').val().length < 1) {
              alert("You need to enter the invoice number.");
              return false;
        }
        else {
            return true;
        }
}
