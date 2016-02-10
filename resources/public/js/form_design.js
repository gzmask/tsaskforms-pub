var timer;

function bindAction(obj){
	var c=obj;

	c.find("a.btn_del").click(function(){
		$(this).parent().parent().parent().parent().remove();
	  });

	c.find("a.btn_down").click(function(){
		var control_obj=$(this).parent().parent().parent().parent();
		control_obj.before(control_obj.next());
	});

	c.find("a.btn_up").click(function(){
		var control_obj=$(this).parent().parent().parent().parent();
		control_obj.after(control_obj.prev());
	});

	c.find("a.btn_bottom").click(function(){
		$(this).parent().parent().parent().parent().appendTo($('.fbc_list'));
	});

	c.find("a.btn_top").click(function(){
		$(this).parent().parent().parent().parent().prependTo($('.fbc_list'));
	});
}

function bindActionSelectedItem(obj,bindItem,searchType,selectItem,selectedItem){
	var c=obj;
	c.find(bindItem).click(function(){

		c.find(searchType).val($(this).text());
		c.find(selectItem).css("display","none");
		c.find(selectedItem).text($(this).text());

		try{window.clearTimeout(timer);}catch(e){};
		return false;
	});

	c.find(bindItem).mouseover(function(){
		try{window.clearTimeout(timer);}catch(e){}
	});

	c.find(bindItem).mouseout(function(){
		if("block"==c.find(selectItem).css("display")){
			timer=setTimeout(function() {
				c.find(selectItem).css("display","none");
			},
			1000);
		}
	});
}

function bindActionSelectList(obj,selectedItem,selectButton,selectItem){
	var c=obj;
	c.find(selectedItem).click(function(){//������
		if("none"==c.find(selectItem).css("display")){
				c.find(selectItem).css("display","block");
		}else{
				c.find(selectItem).css("display","none");
		}
		return false;
	});

	c.find(selectedItem).mouseout(function(){//������
		if("block"==c.find(selectItem).css("display")){
			timer=setTimeout(function() {
				c.find(selectItem).css("display","none");
            },
            1000);
		}
	});

	c.find(selectButton).click(function(){//������ť
		if("none"==c.find(selectItem).css("display")){
				c.find(selectItem).css("display","block");
		}else{
				c.find(selectItem).css("display","none");
		}
		return false;
	});

	c.find(selectButton).mouseout(function(){
		if("block"==c.find(selectItem).css("display")){
			timer=setTimeout(function() {
				c.find(selectItem).css("display","none");
            },
            1000);
		}
	});
}

function rebindAction(){
	$('.fbc_list li').each(function(){
		bindAction($(this));
		if($(this).hasClass('control_check_box')){
			rebindActionCheckBox($(this));
		}else if ($(this).hasClass('control_tos')){
			rebindActionTOS($(this));
		}else if ($(this).hasClass('control_drop_down')){
			rebindActionDropDown($(this));
		}else if ($(this).hasClass('control_radio_button')){
			rebindActionRadioButton($(this));
		}else if ($(this).hasClass('control_file_upload')){
			rebindActionFileUpload($(this));
		}else if ($(this).hasClass('control_date_time')){
			rebindActionDateTime($(this));
		}else if ($(this).hasClass('control_birth_date_picker')){
			rebindActionBirthDatePicker($(this));
		}else if ($(this).hasClass('control_address')){
			rebindActionAddress($(this));
		}else if ($(this).hasClass('control_submit_button')){
			rebindActionSubmitButton($(this));
		}else if ($(this).hasClass('control_reset_button')){
			rebindActionResetButton($(this));
		}
	});
}

function saveForm(){
	var content='';
	var published='';

	$('.fbc_list li').each(function(){
		if($(this).hasClass('control_address')){
			content=content+saveAddress($(this));
		}else if ($(this).hasClass('control_birth_date_picker')){
			content=content+saveBirthDatePicker($(this));
		}else if ($(this).hasClass('control_check_box')){
			content=content+saveCheckBox($(this));
		}else if ($(this).hasClass('control_tos')){
			content=content+saveTOS($(this));
		}else if ($(this).hasClass('control_date_time')){
			content=content+saveDateTime($(this));
		}else if ($(this).hasClass('control_drop_down')){
			content=content+saveDropDown($(this));
		}else if ($(this).hasClass('control_client_email')){
			content=content+saveClientEmail($(this));
		}else if ($(this).hasClass('control_email')){
			content=content+saveEmail($(this));
		}else if ($(this).hasClass('control_file_upload')){
			content=content+saveFileUpload($(this));
		}else if ($(this).hasClass('control_full_name')){
			content=content+saveFullName($(this));
		}else if ($(this).hasClass('control_heading')){
			content=content+saveHeading($(this));
		}else if ($(this).hasClass('control_number')){
			content=content+saveNumber($(this)); 
                }else if ($(this).hasClass('control_payment')){ 
                        content=content+savePayment($(this));
		}else if ($(this).hasClass('control_phone')){
			content=content+savePhone($(this));
		}else if ($(this).hasClass('control_radio_button')){
			content=content+saveRadioButton($(this));
		}else if ($(this).hasClass('control_reset_button')){
			content=content+saveResetButton($(this));
		}else if ($(this).hasClass('control_submit_button')){
			content=content+saveSubmitButton($(this));
		}else if ($(this).hasClass('control_text_area')){
			content=content+saveTextArea($(this));
		}else if ($(this).hasClass('control_text_box')){
			content=content+saveTextBox($(this));
		}else if ($(this).hasClass('control_unique_id')){
			content=content+saveUniqueId($(this));
		}
	});

	var is_heading_start=false;
	$('.fbc_list li').each(function(){
		if($(this).hasClass('control_address')){
			published=published+makeAddress($(this));
		}else if ($(this).hasClass('control_birth_date_picker')){
			published=published+makeBirthDatePicker($(this));
		}else if ($(this).hasClass('control_check_box')){
			published=published+makeCheckBox($(this));
		}else if ($(this).hasClass('control_tos')){
			published=published+makeTOS($(this));
		}else if ($(this).hasClass('control_date_time')){
			published=published+makeDateTime($(this));
		}else if ($(this).hasClass('control_drop_down')){
			published=published+makeDropDown($(this));
		}else if ($(this).hasClass('control_client_email')){
			published=published+makeClientEmail($(this));
		}else if ($(this).hasClass('control_email')){
			published=published+makeEmail($(this));
		}else if ($(this).hasClass('control_file_upload')){
			published=published+makeFileUpload($(this));
		}else if ($(this).hasClass('control_full_name')){
			published=published+makeFullName($(this));
		}else if ($(this).hasClass('control_heading')){
			if(is_heading_start){
				published+='</div>';
			}else{
				heading_start=true;
			}
			published=published+makeHeading($(this));
			published+='<div class="requf_cont">';
		}else if ($(this).hasClass('control_number')){
			published=published+makeNumber($(this));
                }else if ($(this).hasClass('control_payment')){
			published=published+makePayment($(this));
		}else if ($(this).hasClass('control_phone')){
			published=published+makePhone($(this));
		}else if ($(this).hasClass('control_radio_button')){
			published=published+makeRadioButton($(this));
		}else if ($(this).hasClass('control_reset_button')){
			published=published+makeResetButton($(this));
		}else if ($(this).hasClass('control_submit_button')){
			published=published+makeSubmitButton($(this));
		}else if ($(this).hasClass('control_text_area')){
			published=published+makeTextArea($(this));
		}else if ($(this).hasClass('control_text_box')){
			published=published+makeTextBox($(this));
		}else if ($(this).hasClass('control_unique_id')){
			published=published+makeUniqueId($(this));
		}
	});
	if(is_heading_start){published+='</div>';}
	$('#form_content').val(content);
	$('#form_published').val(published);
	document.forms[0].submit();
}

$(document).ready(function(){
	rebindAction();
});
