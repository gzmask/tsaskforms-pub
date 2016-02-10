function controlEmail(str_email_name,str_email_text) {
	if (typeof str_email_name == 'undefined')str_email_name='';
	if (typeof str_email_text == 'undefined')str_email_text='E-mail:';	

	var control_email='   <li class="control control_email">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">E-mail</div>'+
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
	'    <td align="left"><input class="intxt" id="email_name" value="'+str_email_name+'" style="width:235px;"/></td>'+
	'  </tr>'+	
	'  <tr>'+
	'    <td width="98"><input class="intxt" id="email_text" value="'+str_email_text+'" style="width:80px;"/></td>'+
	'    <td align="left"><input class="intxt" value="" style="width:500px;"/></td>'+
	'  </tr>'+
	'</table>'+
	'    </div>'+
	'    </li>';
	return control_email;
}

function addEmail(obj, sm) {
	var c=$('.fbc_list').append(controlEmail()).find("li.control:last");
	bindAction(c);
};

function saveEmail(obj, sm) {
	var email_name=obj.find("#email_name").val();	
	var title_text=obj.find("#email_text").val();
	var control='';
	control=controlEmail(email_name,title_text);	
	return control;
}

function makeEmail(obj, sm) {
	var email_name=obj.find("#email_name").val();	
	var title_text=obj.find("#email_text").val();
	if('Click to edit this text...'==title_text){
		title_text='';
	}
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_email">';
	control=control+'  <tr>';
	control=control+'    <th width="80" valign="top" id="form_email_label" >'+title_text+'</th>';
	control=control+'    <td colspan="2" align="left" valign="top"><input name="'+email_name+'" class="intxt" id="form_email_value"  value="" style="width:500px;"/> </td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}