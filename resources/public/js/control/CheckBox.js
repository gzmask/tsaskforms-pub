function controlCheckBoxItem(str_check_box_item_value,str_check_box_item_label_text){
	if (typeof str_check_box_item_value == 'undefined')str_check_box_item_value='';
	if (typeof str_check_box_item_label_text == 'undefined')str_check_box_item_label_text='';
	
	var item_check_box=	
	'  <tr class="item_check_box">'+
	'    <td>'+
	'        <label>'+
	'          <input type="checkbox" name="RadioGroup1" value="'+str_check_box_item_value+'" id="RadioGroup1_0" />'+
	'          <input class="intxt inhalf" value="'+str_check_box_item_label_text+'" id="item_check_box_label"/></label>'+
	'   </td>'+
	'    <td><img src="/images/icon_imgjian.jpg" alt="" title="delete" class="minus_check_box"/></td>'+
	'  </tr>';
	return item_check_box;
}

function controlCheckBox(str_check_box_name,str_check_box_text,str_check_box_items) {
	if (typeof str_check_box_name == 'undefined')str_check_box_name='';
	if (typeof str_check_box_text == 'undefined')str_check_box_text='';
	if (typeof str_check_box_items == 'undefined')str_check_box_items='';
	
	var control_check_box='    <li class="control control_check_box">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Check Box</div>'+
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
	'      	<input class="intxt" id="check_box_name" value="'+str_check_box_name+'" style="width:235px;" />'+
	'    	</div>'+	
	'    </div>'+		
	'    <div class="fbc_txt">'+
	'    <div class="fbct_half">'+
	//'      <input class="intxt inhalf" id="check_box_text" value="'+str_check_box_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}"/>'+	
	'      <input class="intxt inhalf" id="check_box_text" value="'+str_check_box_text+'" />'+
	'      </div>'+
	'    <div class="oplist">'+
	'    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_check_box" >'+
	'  <tr>'+
	'  <td>&nbsp;</td>'+
	'  <td><img src="/images/icon_imgjia.jpg" alt="" title="add" class="plus_check_box" /></td>'+
	'  </tr>'+
	str_check_box_items	+
	'</table>'+
	'    </div>'+
	'    </div>'+
	'    </li>';
	return control_check_box;
}

function bindActionCheckBoxItemMinus(item){
	var c=item;
	c.find(".minus_check_box").click(
		function(){
			c.remove();
		}
	);
}

function bindActionCheckBoxItemPlus(obj){
	var c=obj;
	c.find(".plus_check_box").click(function(){
		c.find(".table_check_box").append(controlCheckBoxItem());
		bindActionCheckBoxItemMinus(c.find(".table_check_box .item_check_box:last"));
	})	
}

function rebindActionCheckBox(obj){	
	var c=obj;
	bindActionCheckBoxItemPlus(c);
	c.find(".item_check_box").each(function(){
		bindActionCheckBoxItemMinus($(this));
	});
}

function addCheckBox(obj, sm) {
	var c=$('.fbc_list').append(controlCheckBox()).find("li.control:last");
	bindActionCheckBoxItemPlus(c);	
	bindAction(c);
};

function saveCheckBox(obj, sm) {//保存
	var check_box_name=obj.find("#check_box_name").val();
	var check_box_text=obj.find("#check_box_text").val();
	var str_check_box_items='';
	obj.find('.table_check_box .item_check_box').each(function(){
		str_check_box_item_label=$(this).find("#item_check_box_label").val();
		str_check_box_items=str_check_box_items+controlCheckBoxItem('',str_check_box_item_label);
	});	
	var control='';
	control=controlCheckBox(check_box_name,check_box_text,str_check_box_items);
	return control;
}

function makeCheckBox(obj, sm) {//生成前端
	var check_box_name=obj.find("#check_box_name").val();	
	var check_box_text=obj.find("#check_box_text").val();
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_check_box">';
	control=control+'  <tr>';
	if(''!=check_box_text){
	control=control+'    <td width="70" id="form_check_box_text" style="Vertical-align:Top;">'+check_box_text+'</td>';	
	}
	control=control+'    <td style="Vertical-align:Top;">';		
	control=control+'      <table width="100%" border="0" cellspacing="0" cellpadding="0">';
	obj.find("#item_check_box_label").each(function(){
		control=control+'<tr><td id="form_check_box_item" ><input id="form_check_box_value" name="'+check_box_name+'" type="checkbox" value="'+$(this).val()+'" /><label id="form_check_box_label">';
		control=control+$(this).val()+'</label></td></tr>';
	});
	control=control+'      </table>';
	control=control+'    </td>';			
	control=control+'  </tr>';
	control=control+'</table>';
	return control;
}
