var timer;

function commitOrder(){
	var content='';
	var is_heading_start=false;
	$('.container .form_control').each(function(){

		if($(this).hasClass('form_heading')){
			if(is_heading_start){
				published+='</div>';
			}else{
				heading_start=true;
			}
			content=content+formHeading($(this));
			content+='<div class="requf_cont">';
		}
                if($(this).hasClass('form_file_upload')){
                        content=content+formFileUpload($(this));
                }
		if($(this).hasClass('form_address')){
			content=content+formAddress($(this));
		}
		if($(this).hasClass('form_birth_date_picker')){
			content=content+formBirthDatePicker($(this));
		}
		if($(this).hasClass('form_tos')){
			content=content+formTOS($(this));
		}
		if($(this).hasClass('form_check_box')){
			content=content+formCheckBox($(this));
		}
		if($(this).hasClass('form_date_time')){
			content=content+formDateTime($(this));
		}
		if($(this).hasClass('form_drop_down')){
			content=content+formDropDown($(this));
		}
		if($(this).hasClass('form_email')){
			content=content+formEmail($(this));
		}
		if($(this).hasClass('form_client_email')){
			content=content+formClientEmail($(this));
		}
		if($(this).hasClass('form_full_name')){
			content=content+formFullName($(this));
		}
		if($(this).hasClass('form_number')){
			content=content+formNumber($(this));
		}
		if($(this).hasClass('form_payment')){
                  content=content+formPayment($(this));
                }
                if($(this).hasClass('form_phone')){
			content=content+formPhone($(this));
		}
		if($(this).hasClass('form_radio_button')){
			content=content+formRadioButton($(this));
		}
		if($(this).hasClass('form_text_area')){
			content=content+formTextArea($(this));
		}
		if($(this).hasClass('form_text_box')){
			content=content+formTextBox($(this));
		}
		if($(this).hasClass('form_unique_id')){
			content=content+formUniqueId($(this));
		}
	});

	if(is_heading_start){content+='</div>';}
	$('#order_content').val(content);
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
	c.find(selectedItem).click(function(){
		if("none"==c.find(selectItem).css("display")){
				c.find(selectItem).css("display","block");
		}else{
				c.find(selectItem).css("display","none");
		}
		return false;
	});

	c.find(selectedItem).mouseout(function(){
		if("block"==c.find(selectItem).css("display")){
			timer=setTimeout(function() {
				c.find(selectItem).css("display","none");
            },
            1000);
		}
	});

	c.find(selectButton).click(function(){
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

function rebindActionForm(){
	$('.container .form_control').each(function(){
		if ($(this).hasClass('form_address')){
			rebindActionFormAddress($(this));
		}else if ($(this).hasClass('form_birth_date_picker')){
			rebindActionFormBirthDatePicker($(this));
		}else if ($(this).hasClass('form_drop_down')){
			rebindActionFormDropDown($(this));
		}

	});
}

function validateForm(){
        var flag = true;
        $('.container .form_control').each(function(){
                if ($(this).hasClass('form_tos')){
                        flag = flag && validateFormTOS($(this));
                } else if ($('input[name=InvoiceNumber]', this).length > 0) {
                        flag = flag && validateFormInvoice($(this))
                }
        });
        return flag;}

$(document).ready(function(){
	rebindActionForm();
	$("#user_submit").click(function(e){
          commitOrder();
	});
});
