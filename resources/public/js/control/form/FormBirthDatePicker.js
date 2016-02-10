function controlBirthDatePickerItemMonth(){
	var control_item_month="";
	//var monthArray=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	var monthArray=new Array("01","02","03","04","05","06","07","08","09","10","11","12");	
	for (i in monthArray){
		control_item_month+=
		'    <li><a href="#">'+monthArray[i]+'</a></li>';			
	}
	return control_item_month
}

function controlBirthDatePickerItemDay(){
	var control_item_day="";
	for(i=1;i<=31;i++){
		if(i<10){
	control_item_day+=
	'    <li><a href="#">0'+i+'</a></li>';	
		}else{
	control_item_day+=
	'    <li><a href="#">'+i+'</a></li>';			
		}
	}
	return control_item_day
}

function controlBirthDatePickerItemYear(){
	var control_item_year="";
	year=new Date().getFullYear();
	for(i=year-5;i<=year+10;i++){	
	control_item_year+=
	'    <li><a href="#">'+i+'</a></li>';	
	}
	return control_item_year
}

function bindActionFormBirthDatePickerList(obj){
	var c=obj;	
	bindActionSelectList(c,"#monthSelected","#monthSelButton","#monthSel");
	bindActionSelectList(c,"#daySelected","#daySelButton","#daySel");
	bindActionSelectList(c,"#yearSelected","#yearSelButton","#yearSel");
	bindActionSelectedItem(c,"#monthSel li","#monthSearchType","#monthSel","#monthSelected");
	bindActionSelectedItem(c,"#daySel li","#daySearchType","#daySel","#daySelected");
	bindActionSelectedItem(c,"#yearSel li","#yearSearchType","#yearSel","#yearSelected");		
}

function rebindActionFormBirthDatePicker(obj){
	bindActionFormBirthDatePickerList(obj);
}


function formBirthDatePicker(obj, sm) {
	var birth_date_picker_label=obj.find("#birth_date_picker_label").text();
	var form_birth_date_picker_month=obj.find("#monthSelected").text();
	var form_birth_date_picker_day=obj.find("#daySelected").text();
	var form_birth_date_picker_year=obj.find("#yearSelected").text();
	var control='';
	control=control+'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_birth_date_picker">';
	control=control+'  <tr>';
	control=control+'    <th width="80" valign="top" id="birth_date_picker_label">'+birth_date_picker_label+'</th>';
	control=control+'    <td width="222" align="left" valign="top">';
	control=control+'    <div class="hoptions op_month">';
	control=control+'     <input name="searchdomain" type="hidden" value="">';
	control=control+'     <input id="monthSearchType" name="searchType" type="hidden" value="playlist">';
	control=control+'     <div class="selSearch">';
	control=control+'    <div class="nowSearch" id="monthSlected" >'+form_birth_date_picker_month+'</div>';
	control=control+'    <div class="btnSel"><a href="#" ></a></div>';
	control=control+'    <div class="clear"></div>';
	control=control+'    <ul class="selOption" id="monthSel" style="display:none;">';
	control=control+controlBirthDatePickerItemMonth();
	control=control+'    </ul>';
	control=control+'     </div>';
	control=control+'   </div>';
	control=control+'    <br />';
	control=control+'<span class="fonti">Month</span></td>';
	if(form_birth_date_picker_day!=''){
	control=control+'    <td width="132" align="left" valign="middle">';
	control=control+'    <div class="hoptions op_day">';
	control=control+'     <input name="searchdomain" type="hidden" value="">';
	control=control+'     <input id="daySearchType" name="searchType" type="hidden" value="playlist">';
	control=control+'     <div class="selSearch">';
	control=control+'    <div class="nowSearch" id="daySlected" >'+form_birth_date_picker_day+'</div>';
	control=control+'    <div class="btnSel"><a href="#" ></a></div>';
	control=control+'    <div class="clear"></div>';
	control=control+'    <ul class="selOption" id="daySel" style="display:none;">';
	control=control+controlBirthDatePickerItemDay();
	control=control+'    </ul>';
	control=control+'     </div>';
	control=control+'   </div>';
	control=control+'   <br />';
	control=control+'<span class="fonti">Day</span></td>';
	}
	control=control+'    <td align="left" valign="top">';
	control=control+'    <div class="hoptions op_year">';
	control=control+'     <input name="searchdomain" type="hidden" value="">';
	control=control+'     <input id="yearSearchType" name="searchType" type="hidden" value="playlist">';
	control=control+'     <div class="selSearch">';
	control=control+'    <div class="nowSearch" id="yearSlected" >'+form_birth_date_picker_year+'</div>';
	control=control+'    <div class="btnSel"><a href="#" ></a></div>';
	control=control+'    <div class="clear"></div>';
	control=control+'    <ul class="selOption" id="yearSel" style="display:none;">';
	control=control+controlBirthDatePickerItemYear();
	control=control+'    </ul>';
	control=control+'     </div>';
	control=control+'   </div>';
	control=control+'    <br />';
	control=control+'<span class="fonti">Year</span></td>';
	control=control+'  </tr>';
	control=control+'</table>';		
	return control;
}