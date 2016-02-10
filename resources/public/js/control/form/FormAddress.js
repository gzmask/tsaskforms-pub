function formAddress(obj, sm) {
	var form_address_label=obj.find("#form_address_label").text();
	var form_address_street=obj.find("#form_address_street").val();
	var form_address_street_line2=obj.find("#form_address_street_line2").val();
	var form_address_city=obj.find("#form_address_city").val();
	var form_address_state=obj.find("#form_address_state").val();	
	var form_address_zipcode=obj.find("#form_address_zipcode").val();
	var form_address_country=obj.find("#countrySlected").text();
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_address">';
	control=control+'  <tr>';
	control=control+'    <th width="80" rowspan="4" valign="top" id="form_address_label" >'+form_address_label+'</th>';
	control=control+'    <td colspan="2" align="left" valign="top"><input class="intxt" id="form_address_street" value="'+form_address_street+'" style="width:500px;" readonly /><br />';
	control=control+'<span class="fonti">Street Address</span></td>';
	control=control+'  </tr>';
	control=control+'  <tr>';
	control=control+'    <td colspan="2" align="left" valign="top"><input class="intxt" id="form_address_street_line2" value="'+form_address_street_line2+'" style="width:500px;" readonly /><br />';
	control=control+'  <span class="fonti">Street Address Line2</span></td>';
	control=control+'  </tr>';
	control=control+'  <tr>';
	control=control+'    <td width="251" align="left" valign="top"><input class="intxt" id="form_address_city" value="'+form_address_city+'" style="width:235px;" readonly /><br />';
	control=control+'  <span class="fonti">City</span></td>';
	control=control+'    <td align="left" valign="top"><input class="intxt" id="form_address_state" value="'+form_address_state+'" style="width:238px;" readonly />';
	control=control+'      <br />';
	control=control+'<span class="fonti">State/Province</span></td>';
	control=control+'  </tr>';
	control=control+'  <tr>';
	control=control+'    <td width="235" align="left" valign="top"><input class="intxt" id="form_address_zipcode" value="'+form_address_zipcode+'" style="width:235px;" readonly /><br />';
	control=control+'  <span class="fonti">Postal/Zip Code</span></td>';
	control=control+'    <td align="left" valign="top"><div class="countrys">';
	control=control+'     <input name="searchdomain" type="hidden" value="">';
	control=control+'     <input id="countrySearchType" name="searchType" type="hidden" value="playlist">';
	control=control+'     <div class="selSearch">';
	control=control+'    <div class="nowSearch" id="countrySlected" >'+form_address_country+'</div>';
	control=control+'    <div class="btnSel"><a href="#" ></a></div>';
	control=control+'    <div class="clear"></div>';
	control=control+'    <ul class="selOption" id="countrySel" style="display:none;">';
	//control=control+controlAddressCountry();
	control=control+'    </ul>';
	control=control+'     </div>';
	control=control+'   </div><br />';
	control=control+'<span class="fonti">Country</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}


function bindActionAddressList(obj){
	var c=obj;	
	c.find(".nowSearch").click(function(){//下拉框
		if("none"==c.find("#countrySel").css("display")){
				c.find("#countrySel").css("display","block");
		}else{
				c.find("#countrySel").css("display","none");		
		}
		return false;
	});	
	
	c.find(".nowSearch").mouseout(function(){//下拉框
		if("block"==c.find("#countrySel").css("display")){
			timer=setTimeout(function() {
				c.find("#countrySel").css("display","none");	
            },
            1000);		
		}
	});	
	
	c.find(".btnSel a").click(function(){//下拉按钮
		if("none"==c.find("#countrySel").css("display")){
				c.find("#countrySel").css("display","block");		
		}else{
				c.find("#countrySel").css("display","none");							
		}
		return false;
	});		

	c.find(".btnSel a").mouseout(function(){
		if("block"==c.find("#countrySel").css("display")){
			timer=setTimeout(function() {
				c.find("#countrySel").css("display","none");	
            },
            1000);		
		}
	});	


	c.find("#countrySel li").click(function(){
		
		c.find("#countrySearchType").val($(this).text());		
		c.find("#countrySel").css("display","none");
		c.find("#countrySlected").text($(this).text());
		
		try{window.clearTimeout(timer);}catch(e){};
		return false;		
	});
	
	c.find("#countrySel li").mouseover(function(){
		try{window.clearTimeout(timer);}catch(e){
			alert(e);
		}	
	});	
	
	c.find("#countrySel li").mouseout(function(){
		if("block"==c.find("#countrySel").css("display")){
			timer=setTimeout(function() {
				c.find("#countrySel").css("display","none");	
            },
            1000);		
		}			
	});		
}

function rebindActionFormAddress(obj){
	bindActionAddressList(obj);
}