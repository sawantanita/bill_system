// JavaScript Document

////// END FOR JOINT

function search_data_joint(uom, table_list, search_field, show_place, conditions)
{

	//alert(table_list)
	//alert(conditions)
	var xmlHttp3= new GetXmlHttpObject();
	var url="../search_home_new.php?unm="+uom+"&table_list="+table_list+"&search_field="+search_field+"&conditions="+conditions;
	//alert(url)

	xmlHttp3.onreadystatechange=function stateChanged()
	{
	
		if(xmlHttp3.readyState==4)
		{
			var output=xmlHttp3.responseText;
			//alert(output);
			if(output!='')
			{
				myarray=output.split(',');
		//		var selObj = window.opener.document.forms[0].elements["name"];
		//		var option = window.opener.document.createElement("option");
				document.getElementById(show_place).style.visibility='visible';
				var selObj = document.forms[0].elements[show_place];
				var option = document.createElement("option");
				
				selObj.options.length=0;
				for(var count = 0; count <myarray.length; ++count)
				{
					myarray[count]=myarray[count].replace(/^\s+|\s+$/g, "")
					var myOption = option.cloneNode(false);
					myOption.value = myarray[count];

					myOption.appendChild(document.createTextNode(myarray[count]));
					//myOption.appendChild(window.opener.document.createTextNode(myarray[count]));
					selObj.appendChild(myOption);
				}
			}
			else
			{
				hide_combo(show_place)
				hideCurrentPopup()
				
			}
			//document.getElementById("livesearch").innerHTML=xmlHttp.responseText;
			//document.getElementById("livesearch").style.border="1px solid #A5ACB2";
			//xmlHttp=null;
		
		}
	}
	xmlHttp3.open("GET",url,true);
	xmlHttp3.send(null);
	
}
////// END FOR JOINT
function pickitem_single(show_place,search_from)
{
	//alert("SINGLE")
	var xmlHttp=GetXmlHttpObject();
	var idx=document.getElementById(show_place).options.selectedIndex
	var val=document.getElementById(show_place).options[idx].value
	document.getElementById(search_from).value=val
	hide_combo(show_place)
}
function pickitem_multiple(show_place,search_from,search_field,table1,search_by,search_from2)
{
	//alert("MULTIPLE")
	var xmlHttp2=GetXmlHttpObject();
	var idx=document.getElementById(show_place).options.selectedIndex
	var val=document.getElementById(show_place).options[idx].value
	///////////////////////////////////////////////////////////////// for id search  ////////////////////
	var url="../search_home_for_id.php?xx="+val+"&tblname1="+table1+"&table_field1="+search_field+"&table_field2="+search_by;
	alert(url)
	xmlHttp2.open("GET",url,true);
   	var id="";
	xmlHttp2.onreadystatechange=function stateChanged()
	{
	
		if(xmlHttp2.readyState==4)
		{
			var output=xmlHttp2.responseText;
			//alert(output);
			if(output!='')
			{
				//myarray=output.split(',');
				////alert("IF")
				id=output;
				document.getElementById(search_from2).value=id;
			}
			else
			{
				//alert("ELSE")
				document.getElementById(search_from2).value='';
				hide_combo(show_place)
				hideCurrentPopup()
			}
		}
	}
	xmlHttp2.send(null);
	/////////////////////////////////////////////////////////////////////
	//alert(search_from2)
	//alert(id)
	document.getElementById(search_from).value=val
	
	hide_combo(show_place)
}

function pickitem_empid(search_from,search_field,table1,search_by,search_from2)
{
	//alert(search_from2);
	//alert("MULTIPLE")
	var xmlHttp2=GetXmlHttpObject();
	var idx=document.forms[0].elements[search_from].value;
	idx=idx.replace("&","*");
	var val="";
	var output="";
	///////////////////////////////////////////////////////////////// for id search  ////////////////////
	var url="../search_home_for_id.php?xx="+idx+"&tblname1="+table1 + "&table_field1=" + search_field + "&table_field2="+search_by;
	//alert(url)
	xmlHttp2.open("GET",url,true);
   	var id="";
	xmlHttp2.onreadystatechange=function stateChanged()
	{
	
		if(xmlHttp2.readyState==4)
		{
			var output=xmlHttp2.responseText;
			//alert(output);
			if(output!='')
			{
				//myarray=output.split(',');
				////alert("IF")
				id=output;
				document.forms[0].elements[search_from2].value=id;
				if(table1=="ledger")
				{	
					document.forms[0].elements[search_from2].focus();
				}
				//alert(cstr[3]);
			}
			else
			{
				//alert("ELSE")
				document.forms[0].elements[search_from2].value='';
			}
		
		}
	}
	xmlHttp2.send(null);
	/////////////////////////////////////////////////////////////////////
}

function pickitem_ledgers(search_from,search_field,table1,search_by,search_from2,odc,op_bal,ref_flag,cost_center,vch_type,tax_type_id,tax_per_id,auto_post,txtdt,cl_bal_bug,bug_amount,bug_flag,bug_lock)
{
	var xmlHttp2=GetXmlHttpObject();
	var idx=document.forms[0].elements[search_from].value;
	idx=idx.replace("&","*");
	var val="";
	var output="";
	///////////////////////////////////////////////////////////////// for id search  ////////////////////
	var url="../op_bal.php?xx="+idx+"&tblname1="+table1 + "&table_field1=" + search_field + "&table_field2="+search_by + "&vch_type="+ vch_type + "&tax_type_id="+ tax_type_id + "&tax_per_id="+ tax_per_id+ "&auto_post="+ auto_post+ "&txtdt="+ txtdt+ "&bug_flag="+ bug_flag+ "&cl_bal_bug="+ cl_bal_bug+ "&bug_amount="+ bug_amount;
	//alert(url)
	xmlHttp2.open("GET",url,true);
   	var id="";
	
	xmlHttp2.onreadystatechange=function stateChanged()
	{
	
		if(xmlHttp2.readyState==4)
		{
			var output=xmlHttp2.responseText;
			//alert(output);
			if(output!='')
			{
				//myarray=output.split(',');
				//alert(txtdt)
				//id=output;
				cstr=output.split("-");
				
				document.forms[0].elements[op_bal].value=cstr[0];
				document.forms[0].elements[odc].value=cstr[1];
				document.forms[0].elements[search_from2].value=cstr[2];
				document.forms[0].elements[ref_flag].value=cstr[3];
				document.forms[0].elements[cost_center].value=cstr[4];
				document.forms[0].elements[tax_type_id].value=cstr[5];
				document.forms[0].elements[tax_per_id].value=cstr[6];
				document.forms[0].elements[auto_post].value=cstr[10];
				document.forms[0].elements[cl_bal_bug].value=cstr[11];
				document.forms[0].elements[bug_amount].value=cstr[12];
				document.forms[0].elements[bug_flag].value=cstr[13];
				document.forms[0].elements[bug_lock].value=cstr[14];
				if ((cstr[7]=="25") && (cstr[1]=="Cr") && (cstr[8]=="led_nm"))
				{
					alert ("Your "+cstr[9]+" Balance is Negative, Do you want to continue...?");
				}
				if (cstr[2]!="")
				{
					if (cstr[13]=="ENA")
					{
						if (cstr[14]=="lock")
						{
							document.forms[0].elements[search_from2].value='';
							document.forms[0].elements[odc].value='';
							document.forms[0].elements[op_bal].value='';
							document.forms[0].elements[ref_flag].value='';
							document.forms[0].elements[cost_center].value='';
							document.forms[0].elements[tax_type_id].value='';
							document.forms[0].elements[tax_per_id].value='';
							document.forms[0].elements[auto_post].value='';
							document.forms[0].elements[search_from].value='';
							document.forms[0].elements[bug_flag].value=cstr[13];
							document.forms[0].elements[search_from2].focus();
							alert ("Ledger Budget Balance is Zero, Please Select Other Ledger...!!!");
							return;
						}
						else
						{
							alert (cstr[9]+" Leddger Budget Balance is Zero");
							return;
						}
					}
				}
			}
			else
			{
				//alert("ELSE")
				document.forms[0].elements[search_from2].value='';
				document.forms[0].elements[search_from].value='';
				document.forms[0].elements[odc].value='';
				document.forms[0].elements[op_bal].value='';
				document.forms[0].elements[ref_flag].value='';
				document.forms[0].elements[cost_center].value='';
				document.forms[0].elements[tax_type_id].value='';
				document.forms[0].elements[tax_per_id].value='';
				document.forms[0].elements[auto_post].value='';
				document.forms[0].elements[bug_flag].value='';
				document.forms[0].elements[search_from2].focus();
			}
		}
	}
	xmlHttp2.send(null);
	/////////////////////////////////////////////////////////////////////
}
function pick_empinfo(search_from,search_field,table,search_by,search_from2)
{
	//search_from = is textbox name where we select value to find another value e.g. emp_nm
	//search_from2= this is textbox name where we can set value like eg. emp_id
	
	var xmlHttp2=GetXmlHttpObject();
	var idx=document.getElementById(search_from).value;
	var val="";
	var url="../emp_info_auto.php?xx="+idx+"&tblname="+table + "&table_search_field=" + search_field + "&table_search_by="+search_by;
	//alert(url)
	xmlHttp2.open("GET",url,true);
   	var id="";
	xmlHttp2.onreadystatechange=function stateChanged()
	{
	
		if(xmlHttp2.readyState==4)
		{
			var output=xmlHttp2.responseText;
			if(output!='')
			{
				 id=output;
				document.getElementById(search_from2).value=id;
				document.getElementById(search_from2).focus()
			}
			else
			{
				document.getElementById(search_from2).focus()
				document.getElementById(search_from2).focus()
			}
		
		}
	}
	xmlHttp2.send(null);
	hideCurrentPopup()
}

function pick_batchinfo(cnt,search_field,table,search_by,txtbatch,txtmfg1,txtmfg,txtexp1,txtexp)
{
	var xmlHttp2=GetXmlHttpObject();
	var idx=document.getElementById(txtbatch).value;
	var val="";
	var url="../batch_info_auto.php?tblname="+table + "&table_search_field=" + search_field + "&table_search_by="+search_by+"&searchval="+idx;
	//alert(url)
	xmlHttp2.open("GET",url,true);
   	var id="";
	xmlHttp2.onreadystatechange=function stateChanged()
	{
		if(xmlHttp2.readyState==4)
		{
			var output=xmlHttp2.responseText;
			//alert(output)
			if(output!='')
			{
				arr_date=output.split(',');
				document.getElementById(txtmfg1).value=arr_date[1];
				document.getElementById(txtmfg).value=arr_date[0];
				document.getElementById(txtexp1).value=arr_date[3];
				document.getElementById(txtexp).value=arr_date[2];
			}
		}
	}
	xmlHttp2.send(null);
	hideCurrentPopup()
}

function hide_combo(show_place)
{
	document.getElementById(show_place).style.visibility='hidden'; 
}
function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
	// Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}	
//////////////////////// TO GET THE FIELD CO-ORDINATES ////////////////////////////////
function getAbsolutePosition(element){
    var ret = new Point();
    for(; 
        element && element != document.body;
        ret.translate(element.offsetLeft, element.offsetTop), element = element.offsetParent
        );
        
    return ret;
}

function Point(x,y){
        this.x = x || 0;
        this.y = y || 0;
        this.toString = function(){
            return '('+this.x+', '+this.y+')';
        };
        this.translate = function(dx, dy){
            this.x += dx || 0;
            this.y += dy || 0;
        };
        this.getX = function(){ return this.x; }
        this.getY = function(){ return this.y; }
        this.equals = function(anotherpoint){
            return anotherpoint.x == this.x && anotherpoint.y == this.y;
        };
}
///////////////////////////////////	///////////////////////////////////////////////////