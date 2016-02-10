function controlSubmitButton() {
	var control_submit_button=
	'    <li class="control control_submit_button">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Submit Button</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt">'+
  '    <div class="resubmit">'+
	'    <div class="submittxt" style="margin:0 auto;"><span>Submit</span></div>'+
	'    <div class="btn_options"> <a href="#!" title="Options" id="op2" class="btn_ops">Options</a>'+
	'      <div class="layoutbox" id="cont_op2">'+
	'        <div class="laym">'+
	'          <table width="100%" border="0" cellspacing="0" cellpadding="0">'+
	'            <tr>'+
	'              <td width="50%" valign="top"><input class="intxt inhalf" id="submit_text" value="submit"/>'+
	'                <br />'+
	'                <span class="fonti">Submit Text</span></td>'+
	'              <td valign="top"><div class="subtxt">'+
	'                <input name="searchdomain2" type="hidden" value="" />'+
	'                <input id="subtxtSearchType" name="subtxtSearchType" type="hidden" value="playlist" />'+
	'                <div class="selSearch">'+
	'                  <div class="nowSearch" id="subtxtSlected"></div>'+
	'                  <div class="btnSel"><a href="#"></a></div>'+
	'                  <div class="clear"></div>'+
	'                  <ul class="selOption" id="subtxtSel" style="display:none;">'+
	'                    <li><a href="#">left</a></li>'+
	'                    <li><a href="#">middle</a></li>'+
	'                    <li><a href="#">right</a></li>'+
	'                  </ul>'+
	'                </div>'+
	'              </div>'+
	'                <span class="fonti">Button Align</span></td>'+
	'            </tr>'+
	'            <tr>'+
	'              <td colspan="2"><a href="#!" title="ok" class="btn_ok">OK</a></td>'+
	'            </tr>'+
	'          </table>'+
	'        </div>'+
	'        <div class="layb"></div>'+
	'      </div>'+
	'    </div>'+
	'    </div>'+
	'    </li>';
	return control_submit_button;
}

function bindActionSubmitButtonOptionListItem(obj){
	var c=obj;
	c.find("#subtxtSel li").click(function(){

		c.find("#subtxtSearchType").val($(this).text());
		c.find("#subtxtSel").css("display","none");
		c.find("#subtxtSlected").text($(this).text());

		try{window.clearTimeout(timer);}catch(e){};
		return false;
	});

	c.find("#subtxtSel li").mouseover(function(){
		try{window.clearTimeout(timer);}catch(e){}
	});

	c.find("#subtxtSel li").mouseout(function(){
		if("block"==c.find("#subtxtSel").css("display")){
			timer=setTimeout(function() {
				c.find("#subtxtSel").css("display","none");
			},
			1000);
		}
	});
}

function bindActionSubmitButtonOptionList(obj){
	var c=obj;
	c.find(".nowSearch").click(function(){
		if("none"==c.find("#subtxtSel").css("display")){
				c.find("#subtxtSel").css("display","block");
		}else{
				c.find("#subtxtSel").css("display","none");
		}
		return false;
	});

	c.find(".nowSearch").mouseout(function(){//������
		if("block"==c.find("#subtxtSel").css("display")){
			setTimeout(function() {
				c.find("#subtxtSel").css("display","none");
            },
            1000);
		}
	});

	c.find(".btnSel a").click(function(){//������ť
		if("none"==c.find("#subtxtSel").css("display")){
				c.find("#subtxtSel").css("display","block");
		}else{
				c.find("#subtxtSel").css("display","none");
		}
		return false;
	});

	c.find(".btnSel a").mouseout(function(){
		if("block"==c.find("#subtxtSel").css("display")){
			setTimeout(function() {
				c.find("#subtxtSel").css("display","none");
            },
            1000);
		}
	});
}

function bindActionSubmitButtonOption(obj){
	var c=obj;
	c.find("a#op2").click(function(){
		c.find("#cont_op2").slideDown(250);
		return false
	});

	c.find(".btn_ok").click(function(){
		var submit_text=c.find("#submit_text").val();
		c.find(".submittxt span").text(submit_text);
		c.find("#cont_op2").hide();
	});
}

function rebindActionSubmitButton(obj){
	bindActionSubmitButtonOption(obj);
	bindActionSubmitButtonOptionList(obj);
	bindActionSubmitButtonOptionListItem(obj);
}

function addSubmitButton(obj, sm) {
	var c=$('.fbc_list').append(controlSubmitButton()).find("li.control:last");
	bindAction(c);
	bindActionSubmitButtonOption(c);
	bindActionSubmitButtonOptionList(c);
	bindActionSubmitButtonOptionListItem(c);
};

function saveSubmitButton(obj, sm) {
	var control='';
	control=controlSubmitButton();
	return control;
}

function makeSubmitButton(obj, sm) {
	var control='';
	control=control+'<div class="resubmit"><button type="submit" name="user_submit" id="user_submit">Submit</button>';
	control=control+'</div>';
	return control;
}
