function controlDropDownListItem(str_drop_down_list_item_value){
	if (typeof str_drop_down_list_item_value == 'undefined')str_drop_down_list_item_value='';
	
	var item_drop_down_list=
	'<li><a href="#">'+
	str_drop_down_list_item_value+
	'</a></li>';
	return item_drop_down_list;
}

function controlDropDownOptionItem(str_drop_down_option_item_value){
	if (typeof str_drop_down_option_item_value == 'undefined')str_drop_down_option_item_value='';	
	
	var item_drop_down_option=
	'  <tr class="item_drop_down_option">'+
	'    <td width="380">'+
	'        <label>'+
	'          <input class="intxt inhalf" value="'+str_drop_down_option_item_value+'"/></label>'+
	'	 </td>'+
	'    <td><img src="/images/icon_imgjian.jpg" alt="" title="delete" class="minus_drop_down_option" /></td>'+
	'  </tr>';
	return item_drop_down_option;
}

function controlDropDown(str_drop_down_name,str_drop_down_text,str_drop_down_list_item) {
	if (typeof str_drop_down_name == 'undefined')str_drop_down_name='';
	if (typeof str_drop_down_text == 'undefined')str_drop_down_text='Click to edit this text...';
	if (typeof str_drop_down_list_item == 'undefined')str_drop_down_list_item='';	

	var control_drop_down='    <li class="control control_drop_down">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Drop Down</div>'+
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
	'      	<input class="intxt" id="drop_down_name" value="'+str_drop_down_name+'" style="width:235px;" />'+
	'    	</div>'+	
	'    </div>'+	
	
	'    <div class="fbc_txt">'+
	'    <div class="fbct_half">'+
	'      <input class="intxt inhalf" id="drop_down_text" value="'+str_drop_down_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}"/>'+
	'      </div>'+
	'    <div class="hoptions">'+
	'     <input name="searchdomain" type="hidden" value="">'+
	'     <input id="headSearchType" name="searchType" type="hidden" value="playlist">'+
	'     <div class="selSearch">'+
	'    <div class="nowSearch" id="headSlected" ></div>'+
	'    <div class="btnSel"><a href="#" ></a></div>'+
	'    <div class="clear"></div>'+
	'    <ul class="selOption" id="headSel" style="display:none;">'+
//controlDropDownListItem
str_drop_down_list_item+
	'    </ul>'+
	'     </div>'+
	'   </div>'+
	'    <div class="btn_options">'+
	'    <a href="#!" title="Options" id="op1" class="btn_ops">Options</a>'+
	'    <div class="layoutbox" id="cont_op1">'+
	'    <div class="laym">'+
	'    <table width="100%" border="0" cellspacing="0" cellpadding="0" id="opItem" class="table_drop_down" >'+
//controlDropDownOptionItem
	'  <tr>'+
	'  <td>&nbsp;</td>'+
	'  <td><img src="/images/icon_imgjia.jpg" alt="" title="add" class="plus_drop_down_option" /></td>'+
	'  </tr>'+
	'  <tr>'+
	'  <td colspan="2">'+
	'  <a href="#!" title="ok" class="btn_ok" onclick="layhide(\'op1\');return false">OK</a>'+
	'  </td>'+
	'  </tr>'+
	'</table>'+
	'    </div>'+
	'    <div class="layb"></div>'+
	'    </div>'+
	'    </div>   '+
	'    </div>'+
	'    </li>';
	return control_drop_down;
}

function bindActionDropDownOptionItemMinus(item){
	var c=item;
	c.find(".minus_drop_down_option").click(
		function(){
			c.remove();
		}
	);
}

function bindActionDropDownOptionItemPlus(obj){
	var c=obj;
	c.find(".plus_drop_down_option").click(function(){
		c.find(".table_drop_down").append(controlDropDownOptionItem());
		bindActionDropDownOptionItemMinus(c.find(".table_drop_down .item_drop_down_option:last"));
	})	
}

function bindActionDropListItem(obj){
	var c=obj;
	c.find("#headSel li").click(function(){
		
		c.find("#headSearchType").val($(this).text());		
		c.find("#headSel").css("display","none");
		c.find("#headSlected").text($(this).text());
		
		try{window.clearTimeout(timer);}catch(e){};
		return false;		
	});
	
	c.find("#headSel li").mouseover(function(){
		try{window.clearTimeout(timer);}catch(e){}	
	});	
	
	c.find("#headSel li").mouseout(function(){
		if("block"==c.find("#headSel").css("display")){
			timer=setTimeout(function() {
				c.find("#headSel").css("display","none");	
			},
			1000);		
		}	
	});		
}

function bindActionDropDownOption(obj){
	var c=obj;
	
	bindActionDropDownOptionItemPlus(c);		
	
	c.find("a#op1").click(function(){
		c.find("#opItem .item_drop_down_option").remove();
		c.find(".selOption li a").each(function(){
			var strIteml='';
			strIteml=controlDropDownOptionItem($(this).text());
			c.find("#opItem").append(strIteml);
		});
		
		c.find(".item_drop_down_option").each(function(){
			bindActionDropDownOptionItemMinus($(this));
		});			
		c.find("#cont_op1").slideDown(250);		
	});
	
	c.find(".btn_ok").click(function(){
		c.find(".selOption li").remove();
		c.find(".item_drop_down_option input").each(function(){
			var strIteml='';
			strIteml=controlDropDownListItem($(this).val());
			c.find(".selOption").append(strIteml);
		});	
		c.find("#cont_op1").hide();
		
		bindActionDropListItem(c);		
	});
}

function bindActionDropDownList(obj){
	var c=obj;	
	c.find(".nowSearch").click(function(){//下拉框
		if("none"==c.find("#headSel").css("display")){
				c.find("#headSel").css("display","block");
		}else{
				c.find("#headSel").css("display","none");		
		}
		return false;
	});	
	
	c.find(".nowSearch").mouseout(function(){//下拉框
		if("block"==c.find("#headSel").css("display")){
			timer=setTimeout(function() {
				c.find("#headSel").css("display","none");	
            },
            1000);		
		}
	});	
	
	c.find(".btnSel a").click(function(){//下拉按钮
		if("none"==c.find("#headSel").css("display")){
				c.find("#headSel").css("display","block");		
		}else{
				c.find("#headSel").css("display","none");							
		}
		return false;
	});		

	c.find(".btnSel a").mouseout(function(){
		if("block"==c.find("#headSel").css("display")){
			timer=setTimeout(function() {
				c.find("#headSel").css("display","none");	
            },
            1000);		
		}
	});	    	
}

function rebindActionDropDown(obj){
	bindActionDropDownOption(obj);
	bindActionDropDownList(obj);
	bindActionDropListItem(obj);	
}

function addDropDown(obj, sm) {
	var c=$('.fbc_list').append(controlDropDown()).find("li.control:last");
	bindAction(c);
	bindActionDropDownOption(c);
	bindActionDropDownList(c);
};

function saveDropDown(obj, sm) {
	var drop_down_name=obj.find("#drop_down_name").val();	
	var drop_down_text=obj.find("#drop_down_text").val();	
	var drop_down_list_items='';
	
	obj.find(".selOption li a").each(function(){
		drop_down_list_items+=controlDropDownListItem($(this).text());
	});	
	var control='';
	control=controlDropDown(drop_down_name,drop_down_text,drop_down_list_items);
	return control;
}

function makeDropDown(obj, sm) {
	var drop_down_text=obj.find("#drop_down_text").val();
	var drop_down_name=obj.find("#drop_down_name").val();	
	var drop_down_list_items='';	
	obj.find(".selOption li a").each(function(){
		drop_down_list_items+=controlDropDownListItem($(this).text());
	});		
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_drop_down">';
	control=control+'  <tr>';
	control=control+'    <th width="120" id="form_drop_down_label">'+drop_down_text+'</th>';
	control=control+'    <td colspan="3"><div class="countrys">';
	control=control+'     <input name="searchdomain" type="hidden" value="">';
	control=control+'     <input id="cardtpSearchType" name="'+drop_down_name+'" type="hidden" value="">';
	control=control+'     <div class="selSearch">';
	control=control+'    <div class="nowSearch" id="headSlected"></div>';
	control=control+'    <div class="btnSel"><a href="#" ></a></div>';
	control=control+'    <div class="clear"></div>';
	control=control+'    <ul class="selOption" id="headSel" style="display:none;">';
	control=control+drop_down_list_items;
	control=control+'    </ul>';
	control=control+'     </div>';
	control=control+'   </div></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}