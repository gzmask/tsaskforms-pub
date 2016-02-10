function controlTextBox(str_text_box_name,str_text_box_text){
	if (typeof str_text_box_name == 'undefined')str_text_box_name='';
	if (typeof str_text_box_text == 'undefined')str_text_box_text='Click to edit this text...';
	
	var control_text_box='    <li class="control control_text_box">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Text Box</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	''+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab">'+
	'  <tr>'+
	'    <td width="98">control name:</td>'+
	'    <td align="left"><input class="intxt" id="text_box_name" value="'+str_text_box_name+'" style="width:235px;"/></td>'+
	'  </tr>'+		
	'  <tr>'+
	'    <td width="98"><input class="intxt" id="text_box_text" value="'+str_text_box_text+'" style="width:80px;" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}"/></td>'+
	'    <td align="left"><input class="intxt" value="" style="width:500px;"/></td>'+
	'  </tr>'+
	'</table>'+
	'    </div>'+
	'    </li>';
	return control_text_box;
}
/*
function controlTextBox(str_text_box_text='Click to edit this text...'){
	var control_text_box='    <li class="control control_text_box">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Text Box</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	''+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'    <input class="intxt" id="text_box_text" value="'+str_text_box_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}"/>'+
	'    </div>'+
	'    </li>';
	return control_text_box;
}*/

function addTextBox(obj, sm) {
	var c=$('.fbc_list').append(controlTextBox()).find("li.control:last");
	bindAction(c);
};

function saveTextBox(obj, sm) {
	var text_box_name=obj.find("#text_box_name").val().replace(/ /, '');
	var text_box_text=obj.find("#text_box_text").val();
	var control='';
	control=controlTextBox(text_box_name,text_box_text);
	return control;	
}

function makeTextBox(obj, sm) {
	var text_box_text=obj.find("#text_box_text").val();
	var text_box_name=obj.find("#text_box_name").val().replace(/ /, '');	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_text_box">';
	control=control+'  <tr>';
        if(text_box_name.match(/exam\sdate.*/gi)) {
            control=control+'    <th id="form_text_box_label" >'+text_box_text+'<br><a target="_blank" href="http://www.tsask.ca/power-engineering/calendar">Calendar</a></th>';
        }
        else {
	    control=control+'    <th id="form_text_box_label" >'+text_box_text+'</th>';
        }
	control=control+'    <td colspan="3"><input name="'+text_box_name+'" id="form_text_box_text" class="intxt" value="" style="width:500px;"/></td>';
	control=control+'  </tr>';
	control=control+'</table>';
	return control;	
}
