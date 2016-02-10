function controlRadioButtonItem(str_radio_button_item_value,str_radio_button_item_label_text){
	if (typeof str_radio_button_item_value == 'undefined')str_radio_button_item_value='';
	if (typeof str_radio_button_item_label_text == 'undefined')str_radio_button_item_label_text='';
	
	var item_radio_button=
	'  <tr class="item_radio_button" >'+
	'    <td>'+
	'        <label>'+
	'          <input type="radio" name="RadioGroup" value="'+str_radio_button_item_value+'" id="RadioGroup" />'+
	'          <input class="intxt inhalf" value="'+str_radio_button_item_label_text+'" id="item_radio_button_label" /></label>'+
	'   </td>'+
	'    <td><img src="/images/icon_imgjian.jpg" alt="" title="delete" class="minus_radio_button" /></td>'+
	'  </tr>';
	return item_radio_button;
}

function controlRadioButton(str_radio_button_name,str_radio_button_text,str_radio_button_items) {
	if (typeof str_radio_button_name == 'undefined')str_radio_button_name='';
	if (typeof str_radio_button_text == 'undefined')str_radio_button_text='';
	if (typeof str_radio_button_items == 'undefined')str_radio_button_items='';	

	var control_radio_button='    <li class="control control_radio_button">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Radio Button</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+

	'    <div class="fbc_txt">'+
	'    	<div class="fbct_98">control name:</div>'+
	'    	<div class="fbct_half">'+
	'      	<input class="intxt" id="radio_button_name" value="'+str_radio_button_name+'" style="width:235px;" />'+
	'    	</div>'+	
	'    </div>'+	
	
	'    <div class="fbc_txt">'+
	'    <div class="fbct_half">'+
	'      <input class="intxt inhalf" id="radio_button_text"  value="'+str_radio_button_text+'" />'+
	//'      <input class="intxt inhalf" id="radio_button_text"  value="'+str_radio_button_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}"/>'+	
	'      </div>'+
	'    <div class="oplist">'+
	'    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_radio_button" >'+
	'  <tr>'+
	'  <td>&nbsp;</td>'+
	'  <td><img src="/images/icon_imgjia.jpg" alt="" title="add" class="plus_radio_button"/></td>'+
	'  </tr>'+
	str_radio_button_items	+	
	'</table>'+
	'    </div>'+
	'    </div>'+
	'    </li>';
	return control_radio_button;
}

function bindActionRadioButtonItemMinus(item){
	var c=item;
	c.find(".minus_radio_button").click(
		function(){
			c.remove();
		}
	);
}

function bindActionRadioButtonItemPlus(obj){
	var c=obj;
	c.find(".plus_radio_button").click(function(){
		c.find(".table_radio_button").append(controlRadioButtonItem());
		bindActionRadioButtonItemMinus(c.find(".table_radio_button .item_radio_button:last"));
	})	
}

function rebindActionRadioButton(obj){	
	var c=obj;
	bindActionRadioButtonItemPlus(c);
	c.find(".item_radio_button").each(function(){
		bindActionRadioButtonItemMinus($(this));
	});
}

function addRadioButton(obj, sm) {
	var c=$('.fbc_list').append(controlRadioButton()).find("li.control:last");
	bindActionRadioButtonItemPlus(c);
	bindAction(c);
};

function saveRadioButton(obj, sm) {
	var radio_button_name=obj.find("#radio_button_name").val();	
	var radio_button_text=obj.find("#radio_button_text").val();
	var str_radio_button_items='';
	obj.find('.table_radio_button .item_radio_button').each(function(){
		str_radio_button_item_label=$(this).find("#item_radio_button_label").val();
		str_radio_button_items=str_radio_button_items+controlRadioButtonItem(str_radio_button_item_label,str_radio_button_item_label);
	});		
	var control='';
	control=controlRadioButton(radio_button_name,radio_button_text,str_radio_button_items);
	return control;
}

function makeRadioButton(obj, sm) {
	var radio_button_name=obj.find("#radio_button_name").val();
	var radio_button_text=obj.find("#radio_button_text").val();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_radio_button">';
	control=control+'  <tr>';
	if(''!=radio_button_text){
	control=control+'    <td width="70" id="form_radio_buton_label" style="Vertical-align:Top;">'+radio_button_text+'</td>';	
	}	
	control=control+'    <td style="Vertical-align:Top;">';		
	control=control+'      <table width="100%" border="0" cellspacing="0" cellpadding="0">';	
	obj.find("#item_radio_button_label").each(function(){
		control=control+'  <tr class="item_radio_button" >';
		control=control+'    <td id="form_radio_button_item">';
		control=control+'        <input type="radio" name="'+radio_button_name+'" value="'+$(this).val()+'" id="RadioGroup" />';
		control=control+'        <label id="form_check_box_label">';
		control=control+'          '+$(this).val()+'';
		control=control+'		 </label>';	
		control=control+'   </td>';
		control=control+'  </tr>';
	});	
	control=control+'      </table>';
	control=control+'    </td>';			
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}