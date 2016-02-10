function controlClientEmail(str_clinet_email_name,str_client_email_text) {
	if (typeof str_clinet_email_name == 'undefined')str_clinet_email_name='';
	if (typeof str_client_email_text == 'undefined')str_client_email_text='Client E-mail:';	

	var control_client_email='   <li class="control control_client_email">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Client E-mail</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab">'+
	'  <tr>'+
	'    <td width="98">control name:</td>'+
	'    <td align="left"><input class="intxt" id="clinet_email_name" name="clinet_email_name" value="'+str_clinet_email_name+'" style="width:235px;"/></td>'+
	'  </tr>'+	
	'  <tr>'+
	'    <td width="98"><input class="intxt" id="client_email_text" name="client_email_text" value="'+str_client_email_text+'" style="width:80px;"/></td>'+
	'    <td align="left"><input class="intxt" id="client_email" name="client_email" value="" style="width:500px;"/></td>'+
	'  </tr>'+
	'</table>'+
	'    </div>'+
	'    </li>';
	return control_client_email;
}

function addClientEmail(obj, sm) {
	var c=$('.fbc_list').append(controlClientEmail()).find("li.control:last");
	bindAction(c);
};

function saveClientEmail(obj, sm) {
	var clinet_email_name=obj.find("#clinet_email_name").val();	
	var title_text=obj.find("#client_email_text").val();
	var control='';
	control=controlClientEmail(clinet_email_name,title_text);	
	return control;
}

function makeClientEmail(obj, sm) {
	var clinet_email_name=obj.find("#clinet_email_name").val();	
	var title_text=obj.find("#client_email_text").val();
	if('Click to edit this text...'==title_text){
		title_text='';
	}
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_email">';
	control=control+'  <tr>';
	control=control+'    <th width="80" valign="top" id="form_client_email_label" >'+title_text+'</th>';
	control=control+'    <td colspan="2" align="left" valign="top"><input name="form_client_email_value" class="intxt" id="form_client_email_value"  value="" style="width:500px;"/> </td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}