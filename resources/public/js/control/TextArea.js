function controlTextArea(str_text_area_text){
	if (typeof str_text_area_text == 'undefined')str_text_area_text='Click to edit this text...';
	
	var control_text_area='    <li class="control control_text_area">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Text Area</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'    <textarea class="intxt" id="text_area_text" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}">'+str_text_area_text+'</textarea>'+
	'    </div>'+
	'    </li>';
	return control_text_area;
}

function addTextArea(obj, sm) {
	var c=$('.fbc_list').append(controlTextArea()).find("li.control:last");
	bindAction(c);
};

function saveTextArea(obj, sm) {
	var text_area_text=obj.find("#text_area_text").val();
	var control=controlTextArea(text_area_text);
	return control;	
}

function makeTextArea(obj, sm) {
	var text_area_text=obj.find("#text_area_text").val();
	var control='<div class="requ_desc form_control form_text_area">'+text_area_text+'</div>';
	return control;	
}