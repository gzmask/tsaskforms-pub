function controlAddressCountry() {
	var control_item_country="";
	var countryArray=new Array("Afghanistan",
"Argentina",
"?land Islands",
"Albania",
"Algeria",
"American Samoa",
"Andorra",
"Angola",
"Anguilla",
"Antarctica",
"Antigua and Barbuda",
"Armenia",
"Aruba",
"Australia",
"Austria",
"Azerbaijan",
"Bahamas",
"Bahrain",
"Bangladesh",
"Barbados",
"Belarus",
"Belgium",
"Belize",
"Benin",
"Bermuda",
"Bhutan",
"Bolivia",
"Bosnia and Herzegovina",
"Botswana",
"Bouvet Island",
"Brazil",
"British Indian Ocean Territory",
"Brunei Darussalam",
"Bulgaria",
"Burkina Faso",
"Burundi",
"Cambodia",
"Cameroon",
"Canada",
"Cape Verde",
"Cayman Islands",
"Central African Republic",
"Chad",
"Chile",
"China",
"Christmas Island",
"Cocos (Keeling) Islands",
"Columbia",
"Comoros",
"Congo",
"Congo, The Democratic Republic of the",
"Cook Islands",
"Costa Rica",
"Cote d\'Ivoire – Really Ivory Coast",
"Croatia",
"Cuba",
"Cyprus",
"Czech Republic",
"Denmark",
"Djibouti",
"Dominica",
"Dominican Republic",
"East Timor",
"Ecuador",
"Egypt",
"El Salvador",
"Equatorial Guinea",
"Eritrea",
"Estonia",
"Ethiopia",
"Falkland Islands (Malvinas)",
"Faroe Islands",
"Fiji",
"Finland",
"France",
"French Guiana",
"French Polynesia",
"French Southern Territories",
"Gabon",
"Gambia",
"Georgia",
"Germany",
"Ghana",
"Gibraltar",
"Great Britain",
"Greece",
"Greenland",
"Grenada",
"Guadeloupe",
"Guam",
"Guatemala",
"Guinea",
"Guinea Bissau",
"Guyana",
"Haiti",
"Heard and McDonald Islands",
"Honduras",
"Hong Kong",
"Hungary",
"Iceland",
"India",
"Indonesia",
"Iran, Islamic Republic of",
"Iraq",
"Ireland",
"Israel",
"Italy",
"Jamaica",
"Japan",
"Jordan",
"Kazakhstan",
"Kenya",
"Kiribati",
"Korea, Democratic People\'s Republic",
"Korea, Republic of",
"Kuwait",
"Kyrgyzstan",
"Lao People\'s Democratic Republic",
"Latvia",
"Lebanon",
"Liechtenstein",
"Lesotho",
"Liberia",
"Libyan Arab Jamahiriya",
"Lithuania",
"Luxembourg",
"Macau",
"Macedonia, Former Yugoslav Republic of",
"Madagascar",
"Malawi",
"Malaysia",
"Maldives",
"Mali",
"Malta",
"Marshall Islands",
"Martinique",
"Mauritania",
"Mauritius",
"Mayotte",
"Mexico",
"Micronesia, Federated States of",
"Moldova, Republic of",
"Monaco",
"Mongolia",
"Montserrat",
"Morocco",
"Mozambique",
"Myanmar",
"Namibia",
"Nauru",
"Nepal",
"Netherlands",
"Netherlands Antilles",
"New Caledonia",
"New Zealand",
"Nicaragua",
"Niger",
"Nigeria",
"Niue",
"Norfolk Island",
"Northern Mariana Islands",
"Norway",
"Oman",
"Pakistan",
"Palau",
"Palestinian Territory, Occupied",
"Panama",
"Papua New Guinea",
"Paraguay",
"Peru",
"Philippines",
"Pitcairn",
"Poland",
"Portugal",
"Puerto Rico",
"Qatar",
"Reunion",
"Romania",
"Russian Federation",
"Rwanda",
"Saint Kitts and Nevis",
"Saint Lucia",
"Saint Vincent and the Grenadines",
"Samoa",
"San Marino",
"Sao Tome and Principe",
"Saudi Arabia",
"Senegal",
"Serbia and Montenegro",
"Seychelles",
"Sierra Leone",
"Singapore",
"Slovakia",
"Slovenia",
"Solomon Islands",
"Somalia",
"South Africa",
"South Georgia – South Sandwich Islands",
"Spain",
"Sri Lanka",
"St. Helena",
"St. Pierre and Miquelon",
"Sudan",
"Suriname",
"Svalbard and Jan Mayen",
"Swaziland",
"Sweden",
"Switzerland",
"Syrian Arab Republic",
"Taiwan",
"Tajikistan",
"Tanzania, United Republic of",
"Thailand",
"Togo",
"Tokelau",
"Tonga",
"Trinidad and Tobago",
"Tunisia",
"Turkey",
"Turkmenistan",
"Turks and Caicos Islands",
"Tuvalu",
"Uganda",
"Ukraine",
"United Arab Emirates",
"United States",
"United States Minor Outlying Islands",
"Uruguay",
"Uzbekistan",
"Vanuatu",
"Vatican City state",
"Venezuela",
"Viet Nam",
"Virgin Islands (British)",
"Virgin Islands (US)",
"Wallis and Futuna",
"Western Sahara",
"Yemen",
"Zambia",
"Zimbabwe");
	for (i in countryArray){
		control_item_country+=
		'    <li><a href="#">'+countryArray[i]+'</a></li>';			
	}
	return control_item_country
}

function controlAddress(str_address_name,str_address_text) {
	if (typeof str_address_name == 'undefined')str_address_name='';
	if (typeof str_address_text == 'undefined')str_address_text='Address:';	
	var control_address='    <li class="control control_address">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">Address</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab">'+
	'  <tr>'+
	'    <td width="98">control name:</td>'+
	'    <td align="left"><input class="intxt" id="address_name" value="'+str_address_name+'" style="width:235px;"/></td>'+
	'  </tr>'+	
	'  </tr>'+
	
	'  <tr>'+
	'    <td width="98" valign="top"><input class="intxt" id="address_text" value="'+str_address_text+'" style="width:80px;"/></td>'+
	'    <td colspan="2" align="left" valign="top"><input class="intxt" value="" style="width:500px;" /><br />'+
	'<span class="fonti">Street Address</span></td>'+
	'  </tr>'+
	'  <tr>'+
	'    <td width="98" valign="top">&nbsp;</td>'+
	'    <td colspan="2" align="left" valign="top"><input class="intxt" value="" style="width:500px;" /><br />'+
	'<span class="fonti">Street Address Line2</span></td>'+
	'  </tr>'+
	'  <tr>'+
	'    <td width="98" valign="top">&nbsp;</td>'+
	'    <td width="251" align="left" valign="top"><input class="intxt" value="" style="width:235px;" /><br />'+
	'<span class="fonti">City</span></td>'+
	'    <td align="left" valign="top"><input class="intxt" value="" style="width:235px;" /><br />'+
	'<span class="fonti">State/Province</span></td>'+
	'  </tr>'+
	'  <tr>'+
	'    <td width="98" valign="top">&nbsp;</td>'+
	'    <td width="235" align="left" valign="top"><input class="intxt" value="" style="width:235px;" /><br />'+
	'<span class="fonti">Postal/Zip Code</span></td>'+
	'    <td align="left" valign="top"><div class="countrys">'+
	'     <input name="searchdomain" type="hidden" value="">'+
	'     <input id="countrySearchType" name="searchType" type="hidden" value="playlist">'+
	'     <div class="selSearch">'+
	'    <div class="nowSearch" id="countrySlected"></div>'+
	'    <div class="btnSel"><a href="#"></a></div>'+
	'    <div class="clear"></div>'+
	'    <ul class="selOption" id="countrySel" style="display:none;">'+
controlAddressCountry()+
	'    </ul>'+
	'     </div>'+
	'   </div><br />'+
	'<span class="fonti">Country</span></td>'+
	'  </tr>'+
	'</table>'+
	'    </div>'+
	'    </li>';
	return control_address;
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

function rebindActionAddress(obj){
	bindActionAddressList(obj);	
}

function addAddress(obj, sm) {
	var c=$('.fbc_list').append(controlAddress()).find("li.control:last");
	bindAction(c);
	bindActionAddressList(c);
};

function saveAddress(obj, sm) {
	var address_name=obj.find("#address_name").val();
	var title_text=obj.find("#address_text").val();
	var control='';
	control=controlAddress(address_name,title_text);	
	return control;
}

function makeAddress(obj, sm) {
	var address_name=obj.find("#address_name").val();
	var title_text=obj.find("#address_text").val();
	if('Click to edit this text...'==title_text){
		title_text='';
	}
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_address">';
	control=control+'  <tr>';
	control=control+'    <th width="80" rowspan="4" valign="top" id="form_address_label" >'+title_text+'</th>';
	control=control+'    <td colspan="2" align="left" valign="top"><input name="'+address_name+'_street" class="intxt" id="form_address_street" value="" style="width:500px;" /><br />';
	control=control+'<span class="fonti">Street Address</span></td>';
	control=control+'  </tr>';
	control=control+'  <tr>';
	control=control+'    <td colspan="2" align="left" valign="top"><input name="'+address_name+'_street_line2" class="intxt" id="form_address_street_line2" value="" style="width:500px;" /><br />';
	control=control+'  <span class="fonti">Street Address Line2</span></td>';
	control=control+'  </tr>';
	control=control+'  <tr>';
	control=control+'    <td width="251" align="left" valign="top"><input name="'+address_name+'_city" class="intxt" id="form_address_city" value="" style="width:235px;" /><br />';
	control=control+'  <span class="fonti">City</span></td>';
	control=control+'    <td align="left" valign="top"><input name="'+address_name+'_state" class="intxt" id="form_address_state" value="" style="width:238px;" />';
	control=control+'      <br />';
	control=control+'<span class="fonti">State/Province</span></td>';
	control=control+'  </tr>';
	control=control+'  <tr>';
	control=control+'    <td width="235" align="left" valign="top"><input name="'+address_name+'_zipcode" class="intxt" id="form_address_zipcode" value="" style="width:235px;" /><br />';
	control=control+'  <span class="fonti">Postal/Zip Code</span></td>';
	control=control+'    <td align="left" valign="top"><div class="countrys">';
	control=control+'     <input name="searchdomain" type="hidden" value="">';
	control=control+'     <input name="'+address_name+'_country" id="countrySearchType" type="hidden" value="">';
	control=control+'     <div class="selSearch">';
	control=control+'    <div class="nowSearch" id="countrySlected" ></div>';
	control=control+'    <div class="btnSel"><a href="#" ></a></div>';
	control=control+'    <div class="clear"></div>';
	control=control+'    <ul class="selOption" id="countrySel" style="display:none;">';
	control=control+controlAddressCountry();
	control=control+'    </ul>';
	control=control+'     </div>';
	control=control+'   </div><br />';
	control=control+'<span class="fonti">Country</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';	
	return control;
}