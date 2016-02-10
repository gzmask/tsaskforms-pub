function controlFullName(str_full_name_name,str_full_name_text) {
	if (typeof str_full_name_name == 'undefined')str_full_name_name='';
	if (typeof str_full_name_text == 'undefined')str_full_name_text='Full Name:';	

	var control_full_name='    <li class="control control_full_name">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Full Name</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab">'+
	
	'  <tr>'+
	'    <td width="98">control name:</td>'+
	'    <td align="left"><input class="intxt" id="full_name_name" value="'+str_full_name_name+'" style="width:235px;"/></td>'+
	'  </tr>'+	
	
	'  <tr>'+
	'    <td width="98" valign="top"><input  id="full_name_text" class="intxt" value="'+str_full_name_text+'" style="width:80px;"/></td>'+
	'    <td width="251" align="left" valign="top"><input class="intxt" value="" style="width:235px;"/>'+
	'      <br />'+
	'      <span class="fonti">First Name</span></td>'+
	'    <td align="left" valign="top"><input class="intxt" value="" style="width:235px;"/>'+
	'     <br />'+
	'      <span class="fonti">Last Name</span></td>'+
	'  </tr>'+

	'</table>'+
	'    </div>'+
	'    </li>';
	return control_full_name;
}
function addFullName(obj, sm) {
	var c=$('.fbc_list').append(controlFullName());
	bindAction(c);
};

function saveFullName(obj, sm) {
	var full_name_name=obj.find("#full_name_name").val();	
	var full_name_text=obj.find("#full_name_text").val();
	var control='';
	control=controlFullName(full_name_name,full_name_text);	
	return control;
}

function makeFullName(obj, sm) {
	var full_name_name=obj.find("#full_name_name").val();
	var full_name_text=obj.find("#full_name_text").val();
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_full_name">';
	control=control+'  <tr>';
	control=control+'  <th width="80" valign="top" id="form_full_name_label">'+full_name_text+'</th>';
	control=control+'    <td width="251" align="left" valign="top"><input name="'+full_name_name+'_first_name" class="intxt" id="form_full_name_first_name" value="" style="width:235px;"/>';
	control=control+'      <br />';
	control=control+'      <span class="fonti">First Name</span></td>';
	control=control+'    <td align="left" valign="top"><input name="'+full_name_name+'_last_name" class="intxt" id="form_full_name_last_name" value="" style="width:238px;"/>';
	control=control+'     <br />';
	control=control+'      <span class="fonti">Last Name</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}