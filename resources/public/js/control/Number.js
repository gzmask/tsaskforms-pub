function controlNumber(str_number_name,str_number_text,str_number_value) {
	if (typeof str_number_name == 'undefined')str_number_name='';
	if (typeof str_number_text == 'undefined')str_number_text='Number:';	
	if (typeof str_number_value == 'undefined')str_number_value='ex:25';
	
	var control_number='    <li class="control control_number">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Number</div>'+
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
	'    <td align="left"><input class="intxt" id="number_name" value="'+str_number_name+'" style="width:235px;"/></td>'+
	'  </tr>'+	
	
	'  <tr>'+
	'    <td width="108" valign="top"><input id="number_text" class="intxt" value="'+str_number_text+'" style="width:100px;"/></td>'+
	'    <td align="left" valign="top"><input id="number_value"s class="intxt" value="'+str_number_value+'" style="width:120px;" onfocus="if(value ==\'ex:25\'){value =\'\'}" onblur="if (value ==\'\'){value=\'ex:25\'}"/></td>'+
	'    </tr>'+
	'</table>'+
	'    </div>'+
	'    </li>';
	return control_number;
}
function addNumber(obj, sm) {
	var c=$('.fbc_list').append(controlNumber()).find("li.control:last");
	bindAction(c);
};

function saveNumber(obj, sm) {
	var number_name=obj.find("#number_name").val();	
	var title_text=obj.find("#number_text").val();
	var number_value=obj.find("#number_value").val();	
	var control='';
	control=controlNumber(number_name,title_text,number_value);	
	return control;
}

function makeNumber(obj, sm) {
	var number_name=obj.find("#number_name").val();	
	var title_text=obj.find("#number_text").val();
	var number_value=obj.find("#number_value").val();		
	if('Click to edit this text...'==title_text){
		title_text='';
	}
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_number">';
	control=control+'  <tr>';
	control=control+'    <th width="120" id="form_number_label" >'+title_text+'</th>';
	control=control+'    <td colspan="3" id="form_number_value" >'+number_value+'</td>';
	control=control+'    <input name="'+number_name+'" type=hidden id="number" value="'+number_value+'" />';		
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}