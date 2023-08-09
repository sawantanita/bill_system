function pickitem_vendor_no(search_tbl,search_field,search_from,tbl_search_by,tbl_search)
{
	//alert("okkokok"+tbl_search+"-----"+search_from)
	var xmlHttp2=GetXmlHttpObject();
	var idx=document.forms[0].elements[search_from].value;
	idx=idx.replace("&","*");
	var val="";
	var output="";
	//var vch_type=document.forms[0].elements[vch_type].value;
	//alert(vch_type) 
	///////////////////////////////////////////////////////////////// for id search  ////////////////////
	var url="../find_mob_no.php?xx="+idx+"&tblname1="+search_tbl + "&search_field=" + search_field + "&search_from="+search_from+"&tbl_search_by="+tbl_search_by+"&tbl_search="+tbl_search;
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
				cstr=output.split("##");
				
				document.forms[0].elements[search_field].value=cstr[1];				
			}
			else
			{
				//alert("ELSE")
				document.forms[0].elements[search_field].value='';
			}
		}
	}
	xmlHttp2.send(null);
	/////////////////////////////////////////////////////////////////////
}

///////////////////////////////////	///////////////////////////////////////////////////
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