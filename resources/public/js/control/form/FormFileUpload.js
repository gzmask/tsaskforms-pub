function formFileUpload(obj, sm) {
    var form_file_upload_label=obj.find("#form_file_upload_label").text();
    var form_file_upload_text=obj.find("#real_input").val();
    console.log(form_file_upload_text);
    if(form_file_upload_text != '')
      form_file_upload_text = 'File has been uploaded to the server, to view the file go to www.tsaskforms.ca/files/Invoice-{order-id}, replace the order-id with the real order id and without the brackets. For example: www.tsaskforms.ca/files/Invoice-1';
    else
      form_file_upload_text = 'There is no file been uploaded';
    var control='';
    control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_file_upload">';
    control=control+'  <tr>';
    control=control+'    <th id="form_file_upload_label">'+form_file_upload_label+'</th>';
    control=control+'    <td colspan="3">'+form_file_upload_text+'</td>';
    control=control+'  </tr>';
    control=control+'</table>';
    return control;
}
