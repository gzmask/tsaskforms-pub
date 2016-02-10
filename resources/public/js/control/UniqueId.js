function controlUniqueId(str_unique_id_name,str_unique_id_text, str_unique_id_value) {
	if (typeof str_unique_id_name == 'undefined')str_unique_id_name='';
	if (typeof str_unique_id_text == 'undefined')str_unique_id_text='Click to edit this text...';
	if (typeof str_unique_id_value == 'undefined')str_unique_id_value='0';
	
	var control_unique_id='    <li class="control control_unique_id">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Unique Id</div>'+
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
	'    <td width="118">control name:</td>'+
	'    <td align="left"><input class="intxt" id="unique_id_name" value="'+str_unique_id_name+'" style="width:235px;"/></td>'+
	'  </tr>'+	

	
	'  <tr>'+
	'    <td width="118" valign="top"><input class="intxt" id="unique_id_text" value="'+str_unique_id_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}" style="width:100px;"/></td>'+
	'    <td align="left" valign="top"><input class="intxt" id="unique_id_value" value="'+str_unique_id_value+'" style="width:500px;" onfocus="if(value ==\'0\'){value =\'\'}" onblur="if (value ==\'\'){value=\'0\'}"/><br />'+
	'<span class="fonti fontc3"><img src="/images/icon_ts.jpg">This field will not be soon on the form</span></td>'+
	'  </tr>'+
	'</table>'+
	'    </div>'+
	'    </li>';
	return control_unique_id;
}
function addUniqueId(obj, sm) {
	var c=$('.fbc_list').append(controlUniqueId()).find("li.control:last");
	bindAction(c);
};

function saveUniqueId(obj, sm) {
	var unique_id_name=obj.find("#unique_id_name").val();	
	var unique_id_text=obj.find("#unique_id_text").val();
	var unique_id_value=obj.find("#unique_id_value").val();	
	var control=controlUniqueId(unique_id_name,unique_id_text,unique_id_value);	
	return control;
}

function makeUniqueId(obj, sm) {
	var unique_id_name=obj.find("#unique_id_name").val();
	var unique_id_value=obj.find("#unique_id_value").val();
	var control='<input name="'+unique_id_name+'" type=hidden id="unique_id" class="form_control form_unique_id" value="'+unique_id_value+'" />';	
	return control;
}