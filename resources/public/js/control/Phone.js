function controlPhone(str_phone_name,str_phone_text) {
	if (typeof str_phone_name == 'undefined')str_phone_name='';
	if (typeof str_phone_text == 'undefined')str_phone_text='Phone:';

	var control_phone='    <li class="control control_phone">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Phone</div>'+
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
	'    <td align="left"><input class="intxt" id="phone_name" value="'+str_phone_name+'" style="width:235px;"/></td>'+
	'  </tr>'+	
	'  <tr>'+
	'    <td width="98" valign="top"><input id="phone_text" class="intxt" value="'+str_phone_text+'" style="width:80px;"/></td>'+
	'    <td width="136" align="left" valign="top"><input class="intxt" value="" style="width:120px;"/><br />'+
	'<span class="fonti">Area Code</span></td>'+
	'    <td width="10" align="center" valign="middle"><span class="fontc2">-</span><br />'+
	'<span class="fonti">&nbsp;</span></td>'+
	'    <td align="left" valign="top"><input class="intxt" value="" style="width:160px;"/><br />'+
	'<span class="fonti">Phone Number</span></td>'+
	'  </tr>'+
	'</table>'+
	'    </div>'+
	'    </li>';
	return control_phone;
}

function addPhone(obj, sm) {
	var c=$('.fbc_list').append(controlPhone()).find("li.control:last");
	bindAction(c);
};

function savePhone(obj, sm) {
	var phone_name=obj.find("#phone_name").val();	
	var title_text=obj.find("#phone_text").val();
	var control='';
	control=controlPhone(phone_name,title_text);	
	return control;
}

function makePhone(obj, sm) {
	var phone_name=obj.find("#phone_name").val();
	var title_text=obj.find("#phone_text").val();
	if('Click to edit this text...'==title_text){
		title_text='';
	}
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_phone" >';
	control=control+'  <tr>';
	control=control+'    <th width="98" valign="top" id="form_phone_label" >'+title_text+'</th>';
	control=control+'    <td width="136" align="left" valign="top"><input name="'+phone_name+'_area_code" class="intxt" id="form_phone_area_code" value="" style="width:120px;"/><br />';
	control=control+'<span class="fonti">Area Code</span></td>';
	control=control+'    <td width="10" align="center" valign="middle"><span class="fontc2">-</span><br />';
	control=control+'<span class="fonti">&nbsp;</span></td>';
	control=control+'    <td align="left" valign="top"><input name="'+phone_name+'_phone_number" class="intxt" id="form_phone_phone_number" value="" style="width:160px;"/><br />';
	control=control+'<span class="fonti">Phone Number</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}