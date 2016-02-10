function formUniqueId(obj, sm) {
	var form_unique_id_value=obj.val();
	var control='<input type=hidden id="unique_id" class="form_control form_unique_id" value="'+form_unique_id_value+'" />';	
	return control;
}