		// JavaScript Document


function search_data(uom, tblname, search_field, show_place, search_from)
{
	//alert (uom)
	//alert (tblname)
	var xmlHttp= new GetXmlHttpObject();
	var url="../search_home.php?unm="+uom+"&tblname="+tblname+"&search_field="+search_field;
	//alert(url)
	
	xmlHttp.onreadystatechange=function stateChanged()
	{
	
		if(xmlHttp.readyState==4)
		{
			var output=xmlHttp.responseText;
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
					//alert(myarray[count])
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
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);
	
}

/*

//following function is used when we want to give condition

function search_data_with_cond(uom, tblname, search_field, show_place, search_from,cond)
{
	//alert (uom)
	//alert (tblname)
	var xmlHttp= new GetXmlHttpObject();
	var url="../search_home1.php?unm="+uom+"&tblname="+tblname+"&search_field="+search_field+"&cond="+cond;
	//alert(url)
	
	xmlHttp.onreadystatechange=function stateChanged()
	{
	
		if(xmlHttp.readyState==4)
		{
			var output=xmlHttp.responseText;
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
					//alert(myarray[count])
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
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);
	
}*/


function pickitem(show_place,search_from)
{
	var xmlHttp=GetXmlHttpObject();
	var idx=document.getElementById(show_place).options.selectedIndex
	var val=document.getElementById(show_place).options[idx].value
    
	document.getElementById(search_from).value=val
	hide_combo(show_place)
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



		
	