function controlTOSItem(str_tos_item_value,str_tos_item_label_text){
	if (typeof str_tos_item_value == 'undefined')str_tos_item_value='';
	if (typeof str_tos_item_label_text == 'undefined')str_tos_item_label_text='';
	
	var item_tos=
	'  <tr class="item_tos">'+
	'    <td>'+
	'        <label>'+
	'          <input type="checkbox" name="RadioGroup1" value="'+str_tos_item_value+'" id="RadioGroup1_0" />'+
	'          <input class="intxt inhalf" value="'+str_tos_item_label_text+'" id="item_tos_label"/></label>'+
	'   </td>'+
	'    <td><img src="/images/icon_imgjian.jpg" alt="" title="delete" class="minus_tos"/></td>'+
	'  </tr>';
	return item_tos;
}

function controlTOS(str_tos_name,str_tos_text,str_tos_items) {
        var tos_default = "To the best of my knowledge, this application and all supporting documents are accurate. I understand that a false or misleading statement in this application or in any of the reference or other evidence or qualification submitted by myself or on my behalf may result in the Chielf Inspector denying this application.\n";

	if (typeof str_tos_name == 'undefined')
          str_tos_name='Consent the Terms of Services';
	if (typeof str_tos_text == 'undefined')
          str_tos_text=tos_default;
	if (typeof str_tos_items == 'undefined')
          str_tos_items='';
	
	var control_tos='<li class="control control_tos">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Terms of Services</div>'+
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
	'      	<input class="intxt" id="tos_name" value="'+str_tos_name+'" style="width:235px;" />'+
	'    	</div>'+	
	'    </div>'+		
	'    <div class="fbc_txt">'+
	'      <textarea class="intxt" id="tos_text">'+str_tos_text+'</textarea>'+
	'      </div>'+
	'    <div class="fbc_txt">'+
	'    <div class="oplist">'+
	'    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_tos" >'+
	'  <tr>'+
	'  <td>&nbsp;</td>'+
	'  </tr>'+
	'<input type="radio" name="tos_response" value="yes">&nbsp;by checking this box, I hereby agree to the terms stated above.'+
        '&nbsp;<br />'+
	'<input type="radio" name="tos_response" value="no">&nbsp;I decline'+
	str_tos_items	+
	'</table>'+
	'    </div>'+
	'    </div>'+
	'    </li>';
	return control_tos;
}

function bindActionTOSItemMinus(item){
	var c=item;
	c.find(".minus_tos").click(
		function(){
			c.remove();
		}
	);
}

function bindActionTOSItemPlus(obj){
	var c=obj;
	c.find(".plus_tos").click(function(){
		c.find(".table_tos").append(controlTOSItem());
		bindActionTOSItemMinus(c.find(".table_tos .item_tos:last"));
	})	
}

function rebindActionTOS(obj){	
	var c=obj;
	bindActionTOSItemPlus(c);
	c.find(".item_tos").each(function(){
		bindActionTOSItemMinus($(this));
	});
}

function addTOS(obj, sm) {

	var c=$('.fbc_list').append(controlTOS()).find("li.control:last");
	bindActionTOSItemPlus(c);	
	bindAction(c);
};

function saveTOS(obj, sm) {
	var tos_name=obj.find("#tos_name").val();
	var tos_text=obj.find("#tos_text").val();
	var str_tos_items='';
	obj.find('.table_tos .item_tos').each(function(){
		str_tos_item_label=$(this).find("#item_tos_label").val();
		str_tos_items=str_tos_items+controlTOSItem('',str_tos_item_label);
	});	
	var control='';
	control=controlTOS(tos_name,tos_text,str_tos_items);
	return control;
}

function makeTOS(obj, sm) {
	var tos_name=obj.find("#tos_name").val();	
	var tos_text=obj.find("#tos_text").val();
	var control='';
	control=control+'<div>';
	if(''!=tos_text){
          control=control+'    <textarea id="form_tos_text" style="min-height: 150px; width: 100%; Vertical-align:Top;" class="fulln_tab form_control form_tos">'+tos_text+'</textarea></br>';	
        }
	control=control+'<input type="radio" name="tos_response" value="yes">&nbsp;by checking this box, I hereby agree to the terms stated above.';
        control=control+'&nbsp;';
        control=control+'<br />';
	control=control+'<input type="radio" name="tos_response" value="no">&nbsp;I decline';
	control=control+'</div>';
        /*
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_tos">';
	control=control+'  <tr>';
	if(''!=tos_text){
	control=control+'    <td width="70" id="form_tos_text" style="Vertical-align:Top;">'+tos_text+'</td>';	
	}
	control=control+'    <td style="Vertical-align:Top;">';		
	control=control+'      <table width="100%" border="0" cellspacing="0" cellpadding="0">';
	obj.find("#item_tos_label").each(function(){
		control=control+'<tr><td id="form_tos_item" ><input id="form_tos_value" name="" type="checkbox" value="" /><label id="form_tos_label">';
		control=control+$(this).val()+'</label></td></tr>';
	});
	control=control+'      </table>';
	control=control+'    </td>';			
	control=control+'  </tr>';
	control=control+'</table>';
        */
	return control;
}
