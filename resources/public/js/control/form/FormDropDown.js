function bindActionFormDropDownList(obj){
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

function bindActionFormDropListItem(obj){
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

function rebindActionFormDropDown(obj){
	bindActionFormDropDownList(obj);
	bindActionFormDropListItem(obj);	
}

function formDropDown(obj, sm) {
	var form_drop_down_label=obj.find("#form_drop_down_label").text();
	var headSlected=obj.find("#headSlected").text();		
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_drop_down">';
	control=control+'  <tr>';
	control=control+'    <th width="120" id="form_drop_down_label">'+form_drop_down_label+'</th>';
	control=control+'    <td colspan="3"><div class="countrys">';
	control=control+'     <input name="searchdomain" type="hidden" value="">';
	control=control+'     <input id="cardtpSearchType" name="searchType" type="hidden" value="playlist">';
	control=control+'     <div class="selSearch">';
	control=control+'    <div class="nowSearch" id="headSlected" >'+headSlected+'</div>';
	control=control+'    <div class="btnSel"><a href="#" ></a></div>';
	control=control+'    <div class="clear"></div>';
	control=control+'    <ul class="selOption" id="cardtpSel" style="display:none;">';
	control=control+'    </ul>';
	control=control+'     </div>';
	control=control+'   </div></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}
