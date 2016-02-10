function controlHeading(str_heading_text){
	if (typeof str_heading_text == 'undefined')
          str_heading_text='Click to edit this text...';
	
	var control_heading='    <li class="control control_heading">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Heading</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'    <input class="intxt" id="heading_text" value="'+str_heading_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}"/>'+
	'    </div>'+
	'    </li>';
	return control_heading;
}
function addHeading(obj, sm) {
var c=$('.fbc_list').append(controlHeading()).find("li.control:last");
	bindAction(c);
};

function saveHeading(obj, sm) {
	var heading_text=obj.find("#heading_text").val();
	var control=controlHeading(heading_text);
	return control;
}

function makeHeading(obj, sm) {
	var heading_text=obj.find("#heading_text").val();
	var control='<div class="requf_tit form_control form_heading" id="form_heading_label" >'+heading_text+'</div>';
	return control;
}
