function controlDateTime(str_date_time_name,str_date_time_text,str_form_date_time_month,str_form_date_time_day,str_form_date_time_year,str_form_date_time_hour,str_form_date_time_minutes,str_form_date_tiem_t) {

	if (typeof str_date_time_name == 'undefined')str_date_time_name='';
	if (typeof str_date_time_text == 'undefined')str_date_time_text='Click to edit this text...';	
	if (typeof str_form_date_time_month == 'undefined')str_form_date_time_month='1';
	if (typeof str_form_date_time_day == 'undefined')str_form_date_time_day='1';	
	if (typeof str_form_date_time_year == 'undefined')str_form_date_time_year='2012';
	if (typeof str_form_date_time_hour == 'undefined')str_form_date_time_hour='00';		
	if (typeof str_form_date_time_minutes == 'undefined')str_form_date_time_minutes='00';	
	if (typeof str_form_date_tiem_t == 'undefined')str_form_date_tiem_t='AM';
	
	var control_date_time='    <li class="control control_date_time">'+
	'    <div class="fbc_bar">'+
	'    <div class="bar_tit">DateTime</div>'+
	'    <div class="bar_btns"><span>'+
	'    <a href="#!" title="ARROW DOWN" class="btn_down" ></a>'+
	'    <a href="#!" title="ARROW UP" class="btn_up"></a>'+
	'    <a href="#!" title="ARROW BOTTOM" class="btn_bottom"></a>'+
	'    <a href="#!" title="ARROW TOP" class="btn_top"></a>'+
	'    <a href="#!" title="DELETE" class="btn_del"></a>'+
	'    </span></div>'+
	'    </div>'+
	'    <div class="fbc_txt">'+
	'      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab">'+
	'      <tr>'+
	'        <td align="left" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab">'+

	'          <tr>'+
	'            <td width="108" valign="top">control name:</td>'+
	'            <td width=""  colspan="11" align="left" valign="top"><input class="intxt" id="date_time_name" value="'+str_date_time_name+'" style="width:235px;" /></td>'+
	'          </tr>'+	
	
	'          <tr>'+
	'            <td width="108" valign="top"><input class="intxt" id="date_time_text" value="'+str_date_time_text+'" onfocus="if(value ==\'Click to edit this text...\'){value =\'\'}" onblur="if (value ==\'\'){value=\'Click to edit this text...\'}" style="width:100px;"/></td>'+
	'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_month" value="'+str_form_date_time_month+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />'+
	'<span class="fonti">Month</span></td>'+
	'            <td width="10" align="left" valign="middle"><span class="fontc2">/</span><br />'+
	'<span class="fonti">&nbsp;</span></td>'+
	'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_day" value="'+str_form_date_time_day+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />'+
	'<span class="fonti">Day</span></td>'+
	'            <td width="10" align="left" valign="middle"><span class="fontc2">/</span><br />'+
	'<span class="fonti">&nbsp;</span></td>'+
	'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_year" value="'+str_form_date_time_year+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />'+
	'<span class="fonti">Year</span></td>'+
	'            <td width="18" align="left" valign="middle"><span class="fontc2">at</span><br />'+
	'<span class="fonti">&nbsp;</span></td>'+
	'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_hour" value="'+str_form_date_time_hour+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />'+
	'<span class="fonti">Hour</span></td>'+
	'            <td width="10" align="left" valign="middle"><span class="fontc2">:</span><br />'+
	'<span class="fonti">&nbsp;</span></td>'+
	'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_minutes" value="'+str_form_date_time_minutes+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />'+
	'<span class="fonti">Minutes</span></td>'+
	'            <td width="97" align="left" valign="top"><div class="hoptions op_dtime">'+
	'     <input name="searchdomain" type="hidden" value="">'+
	'     <input id="dtimeSearchType" name="searchType" type="hidden" value="'+str_form_date_tiem_t+'">'+
	'     <div class="selSearch">'+
	'    <div class="nowSearch" id="dtimeSlected" >'+str_form_date_tiem_t+'</div>'+
	'    <div class="btnSel"><a href="#"></a></div>'+
	'    <div class="clear"></div>'+
	'    <ul class="selOption" id="dtimeSel" style="display:none;">'+
	'    <li><a href="#">AM</a></li>'+
	'    <li><a href="#">PM</a></li>'+
	'    </ul>'+
	'     </div>'+
	'   </div></td>'+
	'            <td align="left" valign="middle"><img src="/images/icon_datetime.jpg" width="17" height="20" /><br />'+
	'<span class="fonti">&nbsp;</span></td>'+
	'          </tr>'+
	'        </table></td>'+
	'      </tr>'+
	'      </table>'+
	'    </div>'+
	'    </li>';
	return control_date_time;
}

function bindActionDateTimeList(obj){
	var c=obj;	
	c.find(".nowSearch").click(function(){//下拉框
		if("none"==c.find("#dtimeSel").css("display")){
				c.find("#dtimeSel").css("display","block");
		}else{
				c.find("#dtimeSel").css("display","none");		
		}
		return false;
	});	
	
	c.find(".nowSearch").mouseout(function(){//下拉框
		if("block"==c.find("#dtimeSel").css("display")){
			timer=setTimeout(function() {
				c.find("#dtimeSel").css("display","none");	
            },
            1000);		
		}
	});	
	
	c.find(".btnSel a").click(function(){//下拉按钮
		if("none"==c.find("#dtimeSel").css("display")){
				c.find("#dtimeSel").css("display","block");		
		}else{
				c.find("#dtimeSel").css("display","none");							
		}
		return false;
	});		

	c.find(".btnSel a").mouseout(function(){
		if("block"==c.find("#dtimeSel").css("display")){
			timer=setTimeout(function() {
				c.find("#dtimeSel").css("display","none");	
            },
            1000);		
		}
	});	
		
	c.find("#dtimeSel li").click(function(){
		
		c.find("#dtimeSearchType").val($(this).text());		
		c.find("#dtimeSel").css("display","none");
		c.find("#dtimeSlected").text($(this).text());
		
		try{window.clearTimeout(timer);}catch(e){};
		return false;		
	});
	
	c.find("#dtimeSel li").mouseover(function(){
		try{window.clearTimeout(timer);}catch(e){}	
	});	
	
	c.find("#dtimeSel li").mouseout(function(){
		if("block"==c.find("#dtimeSel").css("display")){
			timer=setTimeout(function() {
				c.find("#dtimeSel").css("display","none");	
            },
            1000);		
		}	
	});		
}

function rebindActionDateTime(obj){
	bindActionDateTimeList(obj);	
}

function addDateTime(obj, sm) {
	var currentDate = new Date();
	var cMonth=currentDate.getMonth()+1;
	var cDay=currentDate.getDate();
	var cYear=currentDate.getFullYear();
	var cHour=currentDate.getHours();
	var cMinutes=currentDate.getMinutes()
	var c=$('.fbc_list').append(controlDateTime('','Click to edit this text...',cMonth,cDay,cYear,cHour,cMinutes)).find("li.control:last");
	bindAction(c);
	bindActionDateTimeList(c);
};

function saveDateTime(obj, sm) {
	var date_time_name=obj.find("#date_time_name").val();
	var date_time_text=obj.find("#date_time_text").val();
	var form_date_time_month=obj.find("#form_date_time_month").val();
	var form_date_time_day=obj.find("#form_date_time_day").val();
	var form_date_time_year=obj.find("#form_date_time_year").val();
	var form_date_time_hour=obj.find("#form_date_time_hour").val();		
	var form_date_time_minutes=obj.find("#form_date_time_minutes").val();	
	var form_date_tiem_t=obj.find("#dtimeSearchType").val();		
	var control='';
	control=controlDateTime(date_time_name,date_time_text,form_date_time_month,form_date_time_day,form_date_time_year,form_date_time_hour,form_date_time_minutes,form_date_tiem_t);	
	return control;
}

function makeDateTime(obj, sm) {
	var date_time_name=obj.find("#date_time_name").val();
	var date_time_text=obj.find("#date_time_text").val();
	var form_date_time_month=obj.find("#form_date_time_month").val();
	var form_date_time_day=obj.find("#form_date_time_day").val();
	var form_date_time_year=obj.find("#form_date_time_year").val();
	var form_date_time_hour=obj.find("#form_date_time_hour").val();		
	var form_date_time_minutes=obj.find("#form_date_time_minutes").val();	
	var form_date_tiem_t=obj.find("#dtimeSearchType").val();	
	
	var control='';
	control=control+'      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab form_control form_date_time">';
	control=control+'      <tr>';
	control=control+'        <td align="left" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="fulln_tab">';
	control=control+'          <tr>';
	control=control+'            <td width="108" valign="top" id="form_date_time_label" >'+date_time_text+'</td>';
	control=control+'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_month" value="'+form_date_time_month+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />';
	control=control+'<span class="fonti">Month</span></td>';
	control=control+'            <td width="10" align="left" valign="middle"><span class="fontc2">/</span><br />';
	control=control+'<span class="fonti">&nbsp;</span></td>';
	control=control+'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_day" value="'+form_date_time_day+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />';
	control=control+'<span class="fonti">Day</span></td>';
	control=control+'            <td width="10" align="left" valign="middle"><span class="fontc2">/</span><br />';
	control=control+'<span class="fonti">&nbsp;</span></td>';
	control=control+'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_year" value="'+form_date_time_year+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />';
	control=control+'<span class="fonti">Year</span></td>';
	control=control+'            <td width="18" align="left" valign="middle"><span class="fontc2">at</span><br />';
	control=control+'<span class="fonti">&nbsp;</span></td>';
	control=control+'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_hour" value="'+form_date_time_hour+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />';
	control=control+'<span class="fonti">Hour</span></td>';
	control=control+'            <td width="10" align="left" valign="middle"><span class="fontc2">:</span><br />';
	control=control+'<span class="fonti">&nbsp;</span></td>';
	control=control+'            <td width="46" align="left" valign="top"><input class="intxt" id="form_date_time_minutes" value="'+form_date_time_minutes+'" style="width:30px;" onfocus="if(value ==\'16\'){value =\'\'}" onblur="if (value ==\'\'){value=\'16\'}"/><br />';
	control=control+'<span class="fonti">Minutes</span></td>';
	control=control+'            <td width="97" align="left" valign="top"><div class="hoptions op_dtime">';
	control=control+'     <input name="searchdomain" type="hidden" value="">';
	control=control+'     <input id="dtimeSearchType" name="searchType" type="hidden" value="playlist">';
	control=control+'     <div class="selSearch">';
	control=control+'    <div class="nowSearch" id="dtimeSlected" onclick="if(document.getElementById(\'dtimeSel\').style.display==\'none\'){document.getElementById(\'dtimeSel\').style.display=\'block\';}else {document.getElementById(\'dtimeSel\').style.display=\'none\';};return false;" onmouseout="drop_mouseout(\'dtime\');">'+form_date_tiem_t+'</div>';
	control=control+'    <div class="btnSel"><a href="#" onclick="if(document.getElementById(\'dtimeSel\').style.display==\'none\'){document.getElementById(\'dtimeSel\').style.display=\'block\';}else {document.getElementById(\'dtimeSel\').style.display=\'none\';};return false;" onmouseout="drop_mouseout(\'dtime\');"></a></div>';
	control=control+'    <div class="clear"></div>';
	control=control+'    <ul class="selOption" id="dtimeSel" style="display:none;">';
	control=control+'    <li><a href="#" onclick="return search_show(\'dtime\',\'SW\',this)" onmouseover="drop_mouseover(\'dtime\');" onmouseout="drop_mouseout(\'dtime\');">AM</a></li>';
	control=control+'    <li><a href="#" onclick="return search_show(\'dtime\',\'XW\',this)" onmouseover="drop_mouseover(\'dtime\');" onmouseout="drop_mouseout(\'dtime\');">PM</a></li>';
	control=control+'    </ul>';
	control=control+'     </div>';
	control=control+'   </div></td>';
	control=control+'            <td align="left" valign="middle"><img src="/images/icon_datetime.jpg" width="17" height="20" /><br />';
	control=control+'<span class="fonti">&nbsp;</span></td>';
	control=control+'          </tr>';
	control=control+'        </table></td>';
	control=control+'      </tr>';
	control=control+'      </table>';
	return control;
}