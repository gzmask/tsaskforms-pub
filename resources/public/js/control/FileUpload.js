function controlFileUpload(str_file_upload_name,str_file_upload_text) {
	if (typeof str_file_upload_name == 'undefined')str_file_upload_name='';
	if (typeof str_file_upload_text == 'undefined')str_file_upload_text='Click to edit this text...';
	
	var control_file_upload=
	'    <li class="control control_file_upload">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">File Upload</div>'+
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
	'      	<input class="intxt" id="file_upload_name" value="'+str_file_upload_name+'" style="width:235px;" />'+
	'    	</div>'+	
	'    </div>'+	
	
	'    <div class="fbc_txt">'+
	'    <div class="fbct_half">'+
	'      <input class="intxt inhalf" id="file_upload_text" value="'+str_file_upload_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}"/>'+
	'      </div>'+
	'    <div class="fileup"><input class="intxt inhalf" value="" name="fake_input" id="fake_input"/><input name="real_input" id="real_input" type="file" style="display:none;" /></div>'+
	'    <div class="btn_options">'+
	'    <a href="#!" title="Browse" class="btn_ops" >Browse</a>'+
	'    </div>'+
	'    </div>'+
	'    </li>';
	return control_file_upload;
}

function bindActionFileUpload(obj){
	var c=obj;
	c.find(".btn_ops").click(function(){
		c.find("#real_input").click();
	});
	
	c.find("#real_input").change(function(){
		c.find("#fake_input").val($(this).val());
	});
}

function rebindActionFileUpload(obj){
	bindActionFileUpload(obj);
}

function addFileUpload(obj, sm) {
	var c=$('.fbc_list').append(controlFileUpload()).find("li.control:last");
	bindAction(c);
	bindActionFileUpload(c);
};

function saveFileUpload(obj, sm) {
	var file_upload_name=obj.find("#file_upload_name").val();
	var file_upload_text=obj.find("#file_upload_text").val();	
	var control='';
	control=controlFileUpload(file_upload_name,file_upload_text);
	return control;
}

function makeFileUpload(obj, sm) {
	var file_upload_name=obj.find("#file_upload_name").val();
	var file_upload_text=obj.find("#file_upload_text").val();	
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_file_upload">';
	control=control+'  <tr>';
	control=control+'    <th id="form_file_upload_label" width="80" valign="top">'+file_upload_text+'</th>';
	control=control+'    <td><input class="intxt inhalf" value="" name="fake_input"/><input name="real_input" id="real_input" type="file" style="display:none;" onchange="javascript:fake_input.value=value"/></td>';
	control=control+'    <td class="btn_options" align="left">';
	control=control+'    <a href="#!" title="Browse" class="btn_ops"  onclick="javascript:real_input.click();" >Browse</a>';
	control=control+'    </td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}
