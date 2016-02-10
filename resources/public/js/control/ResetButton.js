function controlResetButton() {
	var control_reset_button='    <li class="control control_reset_button">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Reset Button</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'    <div class="submittxt"><span>Reset</span></div>'+
	'    <div class="btn_options"> <a href="#!" title="Options" id="op2" class="btn_ops">Options</a>'+
	'      <div class="layoutbox" id="cont_op2">'+
	'        <div class="laym">'+
	'          <table width="100%" border="0" cellspacing="0" cellpadding="0">'+
	'            <tr>'+
	'              <td width="50%" valign="top"><input class="intxt inhalf" value="reset" id="submit_text" />'+
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
	'              <td colspan="2"><a href="#!" title="ok" class="btn_ok" onclick="layhide(\'op2\');return false">OK</a></td>'+
	'            </tr>'+
	'          </table>'+
	'        </div>'+
	'        <div class="layb"></div>'+
	'      </div>'+
	'    </div>'+
	'    </div>'+
	'    </li>';
	return control_reset_button;
}


function bindActionResetButtonOptionListItem(obj){
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

function bindActionResetButtonOptionList(obj){
	var c=obj;	
	c.find(".nowSearch").click(function(){//下拉框
		if("none"==c.find("#subtxtSel").css("display")){
				c.find("#subtxtSel").css("display","block");
		}else{
				c.find("#subtxtSel").css("display","none");		
		}
		return false;
	});	
	
	c.find(".nowSearch").mouseout(function(){//下拉框
		if("block"==c.find("#subtxtSel").css("display")){
			setTimeout(function() {
				c.find("#subtxtSel").css("display","none");	
            },
            1000);		
		}
	});	
	
	c.find(".btnSel a").click(function(){//下拉按钮
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

function bindActionResetButtonOption(obj){
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

function rebindActionResetButton(obj){
	bindActionResetButtonOption(obj);
	bindActionResetButtonOptionList(obj);	
	bindActionResetButtonOptionListItem(obj);
}

function addResetButton(obj, sm) {
	var c=$('.fbc_list').append(controlResetButton()).find("li.control:last");
	bindAction(c);
	bindActionResetButtonOption(c);
	bindActionResetButtonOptionList(c);	
	bindActionResetButtonOptionListItem(c);
};

function saveResetButton(obj, sm) {
	var control='';
	control=controlResetButton();		
	return control;
}

function makeResetButton(obj, sm) {
	var control='';
	control=control+'<div class="resubmit"><input type="reset" value="reset" />';
	control=control+'';
	control=control+'</div>';		
	return control;
}