function include(filename)
{     

var head = document.getElementsByTagName('head')[0];        
var script = document.createElement('script');      
script.src = filename;      
script.type = 'text/javascript';        
head.appendChild(script)  

} 
include('popup.txt') 
include('../popup.txt') 
include('utility.txt') 
include('../utility.txt') 

// ************************* GLOBAL VARIABLE DECLARATION **********************************//
var hidnElement = null;
var element = null;
//This variable used in account for reopen of costcenter window 
var objWindow=null;
//************************* CLOSE BROWSER FUNCTION **********************************//


/**************<onselect checkbox disable tooltip>*************/
function toggleToolTip(chk)
{
	 if(document.getElementById(chk).checked==true)
	 {
		document.getElementById(chk).tooltiptext="You Selected checkbox!";
	 }
	 else
	 {
		 document.getElementById(chk).tooltiptext="Approve or Delete?";
	 }
}
/**************</onselect checkbox disable tooltip>*************/


function getXMLHTTPRequest() {
try {
req = new XMLHttpRequest();
} catch(err1) {
  try {
  req = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (err2) {
    try {
    req = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (err3) {
      req = false;
    }
  }
}
return req;
}
var http = getXMLHTTPRequest();
function restoreval(sval,fname,flgval) 
{
  	http.open("GET", fname+'?sval='+sval+'&flgval='+flgval, true);
	http.onreadystatechange = function() { }
    http.send(null);
}

function restorevalAccount(sval,fname,flgval,ptype,empAc,nnid) 
{
  	var para="sval="+sval+"&flgval="+flgval+"&ptype="+ptype+"&empAc="+empAc+"&nnid="+nnid;
	http.open("GET", fname+'?'+para, true);
	http.onreadystatechange = function() 
	{ 
		if(http.readyState == 4) 
		{
			alert(http.responseText);
		}	
	}
    http.send(null);
}


// ************************* PRINT FUNCTION **********************************//
function PrintPage()
{
	/*
		This function prints a page. Data which u want to be visible put it in a div with div id="iCoder".
		All other data outside this div is hidden. Also put print button in other div named anything
	*/
	var all = document.getElementsByTagName("div");

	for (var i=0, max=all.length; i < max; i++) {
    
		all[i].style.visibility="hidden";
		}
	
	document.getElementById("iCoder").style.visibility = "visible";
			window.print();
	document.getElementById("iCoder").style.visibility = "visible";
	for (var i=0, max=all.length; i < max; i++) {
    
		all[i].style.visibility="visible";
		}
}
function printPg()
{

	if(document.getElementsByTagName("div").item("iCoder"))
	{
		document.getElementsByTagName("div").item("iCoder").style.visibility = "hidden"
	}
	if(document.getElementsByTagName("div").item("print"))
	{
		if(document.getElementsByTagName("div").item("print").length)
		{
			for(var i=0; i<document.getElementsByTagName("div").item("print").length; i++)
			{
				document.getElementsByTagName("div").item("print")[i].style.visibility = "hidden"
			}
			window.print()
			for(var i=0; i<document.getElementsByTagName("div").item("print").length; i++)
			{
				document.getElementsByTagName("div").item("print")[i].style.visibility = "visible"
			}
		}
		else
		{
			document.getElementsByTagName("div").item("print").style.visibility = "hidden"
			window.print()
			document.getElementsByTagName("div").item("print").style.visibility = "visible";
		}
	}
	else
	{
		window.print()
	}
	if(document.getElementsByTagName("div").item("iCoder"))
	{
		document.getElementsByTagName("div").item("iCoder").style.visibility = "visible";
	}
}


//***************** RETRIVAL FUNCTION FROM DATABASE TO FIELD **************************//
function tbl_sel_date(dte, objDisInpt, objHidnInpt)
{
	
	var dayDate, mDate, yDate, arrDate
	
	if(!isEmpty(dte))
	{
		arrDate = dte.split("/")

		dayDate = arrDate[0]
		mDate = arrDate[1]
		yDate = arrDate[2]

		if(objDisInpt.type)
		{
			objDisInpt.value = dayDate + "/" + mDate + "/" + yDate
			objHidnInpt.value = yDate + "/" + mDate + "/" + dayDate
		}
		else
		{
			//alert(objHidnInpt)
			//alert(objDisInpt)
			//alert(yDate + "/" + mDate + "/" + dayDate)
			//document.getElementById(objDisInpt).value = dayDate + "/" + mDate + "/" + yDate
			document.getElementById("non$"+objHidnInpt).value = dayDate + "/" + mDate + "/" + yDate
			document.getElementById(objHidnInpt).value = yDate + "/" + mDate + "/" + dayDate
		}
	}
}


function retriveTime(dte, objDisInpt, objHidnInpt)
{
	var dayDate, mDate, yDate, arrDate
	if(!isEmpty(dte))
	{
		arrDate = dte.split(":")

		dayDate = arrDate[2]
		mDate = arrDate[1]
		yDate = arrDate[0]

		if(objDisInpt.type)
		{
			objDisInpt.value = yDate + ":" + mDate + ":" + dayDate
			objHidnInpt.value = yDate + ":" + mDate + ":" + dayDate
		}
		else
		{
			document.getElementById(objDisInpt).value = yDate + ":" + mDate + ":" + dayDate 
			document.getElementById(objHidnInpt).value = yDate + ":" + mDate + ":" + dayDate
		}
	}
}
function listValue(obj,objValue)
{
	var total
	var objType = ""
	
	if(obj.type)
	{
		objType = obj.type
	}
	else
	{
		if(obj.length)
		{
			if(obj[0].type)
			{
				objType = obj[0].type
			}
		}
	}
	total = obj.length
	switch(objType)
	{
		case "select-one" :
		{ 
			for(var k=0;k<total;k++)
			{
				if(obj[k].value == objValue)
				{
					obj.selectedIndex = k;
					obj[k].selected = true;
					//alert(obj[k].value +"=" + objValue)
				}
			}
			break;
		}
		case "select-multiple" :
		{
			break;
		}
		case "radio" :
		{
			if(obj.length)
			{
				for(var k=0;k<total;k++)
				{
					if(obj[k].value == objValue)
					{
						obj[k].checked = true;
					}
				}
			}
			else
			{
				if(obj.value == objValue)
				{
					obj.checked = true;
				}
				else
				{
					obj.checked = false;
				}
			}
			break;
		}
		case "checkbox" :
		{
			break;
		}
	}

}



function listValue1(obj,objValue)
{
	var total
	
	if(obj.length && obj.type)
	{
		total = obj.length
		switch(obj.type)
		{
			case "select-one" :
			{
				for(var k=0;k<total;k++)
				{
					if(obj[k].value == objValue)
					{
						obj.selectedIndex = k;
						obj[k].selected = true;
					}
				}
				break;
			}
			case "select-multiple" :
			{
				break;
			}
		}
	}

	if(obj.length && obj[0].type)
	{
		total = obj.length
		switch(obj[0].type)
		{
			case "radio" :
			{
				for(var k=0;k<total;k++)
				{
					if(obj[k].value == objValue)
					{
						obj[k].checked = true;
					}
				}
				break;
			}
			case "checkbox" :
			{
				break;
			}
		}
	}
}


//******************* Common Validation Functions ***********************//
var cmnt = ""


function isNum(num)
{
	num = trim(num)
	validCH="0123456789.";
	var i = 0

	trim(num)
	if(!isEmpty(num))
	{
		if(isNaN(num))
		{
			cmnt = "#Name# is not a Number"
			return(false)
		}
	}
	else
	{
		cmnt = "#Name# is not a Number"
		return(false)
	}

	return true;
}



function isNumber(num)
{
	num = trim(num)
	validCH="0123456789.";
	var i = 0

	trim(num)
	if(!isEmpty(num))
	{
		if(isNaN(num))
		{
			cmnt = "#Name# is not a Number"
			return(false)
		}
	}
	return true;
}

function isAmt(num)
{
	num = trim(num)

	if(!isEmpty(num))
	{
		if(isNaN(num))
		{
			cmnt = "Please enter appropriate value for #Name#"
			return(false)
		}
		else
		{
			if(num<0)
			{
				cmnt = "Please enter appropriate value for #Name#"
				return(false)
			}
		}
	}
	
	return true;
}

function isDiscount(num)
{
	num = trim(num)

	if(!isEmpty(num))
	{
		if(isNaN(num))
		{
			cmnt = "Please enter appropriate value for #Name#"
			return(false)
		}
		else
		{
			if(num >=100 || num < 0)
			{
				cmnt = "Please enter appropriate value for #Name#"
				return(false)
			}
		}
	}
	
	return true;
}

function isGRN(num)
{
	num = trim(num)
	if(!isEmpty(num))
	{
		if(!isNum(num))
		{
			return(false)
		}
		else
		{
			if(!isGTZero(num))
			{
				return false
			}
		}
	}
	return true;
}

function isGRN1(num)
{
	num = trim(num)
	if(!isEmpty(num))
	{
		if(!isNum(num))
		{
			return(false)
		}
		else
		{
			
		}
	}
	return true;
}


function isGTZero(num)
{
	num = trim(num)

	if(!isEmpty(num))
	{
		if(isNaN(num))
		{
			cmnt = "Please enter appropriate value for #Name#"
			return(false)
		}
		else
		{
			if(num<=0)
			{
				cmnt = "Please enter appropriate value for #Name#"
				return(false)
			}
		}
	}
	else
	{
		cmnt = "Please enter appropriate value for #Name#"
		return(false)
	}

	return true;
}


function isDateLE(dte)
{

	if(!isEmpty(dte))
	{
		dte = trim(dte)

		arrDate = dte.split("/")
		arrDTToday = DtToday.split("/")
		
		dtDate=new Date((arrDate[1] + "/" + arrDate[0] + "/" + arrDate[2]))
		TDate=new Date((arrDTToday[1] + "/" + arrDTToday[0] + "/" + arrDTToday[2]))

		if(dtDate > TDate)
		{
			cmnt = "Please select appropriate Date for #Name#"
			return false
		}
	}

	return true;
}

function isDateLESS(dte)
{

	if(!isEmpty(dte))
	{
		dte = trim(dte)

		arrDate = dte.split("/")
		arrDTToday = DtToday.split("/")
		
		dtDate=new Date((arrDate[1] + "/" + arrDate[0] + "/" + arrDate[2]))
		TDate=new Date((arrDTToday[1] + "/" + arrDTToday[0] + "/" + arrDTToday[2]))

		if(dtDate < TDate)
		{
			cmnt = "Please select appropriate Date for #Name#"
			return false
		}
	}

	return true;
}


function isCurrentMonth(mth)
{

	if(!isEmpty(mth))
	{
		mth = trim(mth)

		arrDTToday = DtToday.split("/")
		
		if(mth != arrDTToday[1])
		{
			cmnt = "Invalid Month \nPlease select current Month"
			return false
		}
	}

	return true;
}

function isCurrentYear(yer)
{

	if(!isEmpty(yer))
	{
		yer = trim(yer)

		arrDTToday = DtToday.split("/")
		
		if(yer != arrDTToday[2])
		{
			cmnt = "Invalid Year \nPlease select current Year"
			return false
		}
	}

	return true;
}


function isNotNull(txt)
{
	txt = trim(txt)
	if(isEmpty(txt))
	{
		cmnt = "Fill #Name#"
		return false;
	}
	return true;
}
//this is for only characters function
function isSpChar(txt)
{
	txt = trim(txt)
	var iChars = "`~!@#$%^&*()+=-_[]\\\';,./{}|\":<>?";

	for (var i = 0; i < txt.length; i++)
	{
		if (iChars.indexOf(txt.charAt(i)) != -1)
		{
			cmnt = "#Name# has special characters. \nThese are not allowed.\n Please remove them and try again.";
			return false;
		}
	}
	return true;
}
//this is for special characters function

function isProportion(num)
{
	num = trim(num)
	var iChars = "0123456789.:";

	for (var i = 0; i < num.length; i++)
	{
		if (iChars.indexOf(num.charAt(i)) == -1)
		{
			cmnt = "#Name# Please fill proper value";
			return false;
		}
	}
	return true;
	///
	/*num = trim(num)
	validCH="0123456789.";
	var i = 0

	trim(num)
	if(!isEmpty(num))
	{
		if(isNaN(num))
		{
			cmnt = "#Name# is not a Number"
			return(false)
		}
	}
	else
	{
		cmnt = "#Name# is not a Number"
		return(false)
	}

	return true;*/

	///
}
function isNotSpChar(txt)
{
	txt = trim(txt)
	var iChars = "`~!@#$%^&*()+=-_[]\\\';,./{}|\":<>?";
	for (var i = 0; i < txt.length; i++)
	{
		if (iChars.indexOf(txt.charAt(i)) == -1)
		{
			cmnt = "#Name# has not special characters. \nThese are not allowed.\n Please remove them and try again.";
			return false;
		}
	}
	return true;
}
function isText(txt)
{
	txt = trim(txt)
	validCH="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	var i = 0
	if(isEmpty(txt))
	{
		cmnt = "#Name# is not a valid Text"
		return false;
	}
	
	for(i=0;i<txt.length;i++)
	{
		if(validCH.indexOf(txt.charAt(i))==-1)
		{
			cmnt = "#Name# is not a valid text"
			return false;
		}
	}

	return true;
}

function isTextNew(txt)
{
	/*THIS IS CHECK TEXT AS WELL AS STORED EMPTY VALUE*/
	txt = trim(txt)
	validCH="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	var i = 0
	/*if(isEmpty(txt))
	{
		cmnt = "#Name# is not a valid Text"
		return false;
	}*/
	
	for(i=0;i<txt.length;i++)
	{
		if(!isEmpty(txt))
		{
			if(validCH.indexOf(txt.charAt(i))==-1)
			{
				cmnt = "#Name# is not a valid text"
				return false;
			}
		}
	}

	return true;
}


function isEmail(mail)
{
	var i = 0
	mail = trim(mail)
	at=mail.indexOf("@");
	lat=mail.lastIndexOf("@");
	dot=mail.indexOf(".");
	valid1="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-.@";


	if(isEmpty(mail))
	{
		return true;
	}
	
	if(at==-1 || dot==-1 || at==1 || dot==1 || at==mail.length || dot== mail.length || dot-1==at || at!=lat)
	{
		cmnt = "#Name# is not a valid Email address"
		return false;
	}

	for(i=0;i<mail.length;i++)
	{
		if(valid1.indexOf(mail.charAt(i))==-1)
		{
			cmnt = "#Name# is not a valid Email address"
			return false;
		}
	}

	if(mail.charAt(mail.length-1) == ".")
	{
		cmnt = "#Name# is not a valid Email address"
		return false;
	}

	return true;
}

function isInteger(s)
{
	var i;
	s = s.toString();
	if(!isEmpty(s))
	{
		if(isNaN(s))
		{
			cmnt = "#Name# is not a Number"
			return(false)
		}
		else
		{
			for (i = 0; i < s.length; i++)
			{
				var c = s.charAt(i);
				if(c == '.')
				{
					arr_str_dec = s.split('.')
					str_dec = arr_str_dec[1]
					for(var j = 0; j < str_dec.length; j++)
					{
						d = str_dec.charAt(j);
						if(d > 0)
						{
							cmnt ="#Name# value is not an Integer";
							return false;
						}
					}
				}
				else if (isNaN(c)) 
				{
					cmnt ="#Name# value is not an Integer";
					return false;
				}
			}
		}
	}
	return true;
}
//document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
//******************* Common Functions ***********************//

var winMain = null;
var openWindow = new Array();

function winOpen(url, winName, width, height)
{
	if(winMain == null)
 	{
		//alert ("AAA")
		url = genURL(url)
		
		winMain = open(url,"common","height=" + height + ",width=" + width + ",directories=no,location=no,menubar=no,minimize=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no")
		//openWindow[openWindow.length]=winMain;
		//alert(openWindow.length);
		return winMain;
	}
}

//The openWindow array will hold the handles of all open child windows


//Track open adds the new child window handle to the array.

//loop over all known child windows and try to close them.  No error is
//thrown if a child window(s) was already closed.
/*function closeWindows() {
	var openCount = openWindow.length;
	alert(winMain + "-" + openCount);
	for(r=0;r<openCount;r++) {
		openWindow[r].close();
		alert(winMain + "-" + openWindow[r] );
	}
}*/

//This is the function for popup in account. It is for reference window.
var winSel=null;
function winOpen4(url, winName, width, height)
{
	if(winSel == null)
 	{
		//alert ("AAA")
		url = genURL(url)
		winSel = open(url,"common","height=" + height + ",width=" + width + ",directories=no,location=no,menubar=no,minimize=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no")
		return winSel;
	}
	else
	{
		//alert ("BBB")
		winSel.close();
	}
}

function winOpen1(url, winName, width, height)
{
	if(winMain == null)
	{
		url = genURL(url)
		winMain = open(url,"common","height=" + height + ",width=" + width + ",directories=no,location=no,menubar=yes,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no")
		return winMain;
	}
}

function winOpen2(url, winName, width, height)
{
	if(winMain == null)
	{
		url = genURL(url)
		winMain = open(url,"common1","height=" + height + ",width=" + width + ",directories=no,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no")
		//return winMain;
	}
}
function winOpenAcc(url, winName, width, height)
{
	if(winMain == null)
	{
		url = genURL(url)
		winMain = open(url,"common","height=" + height + ",width=" + width + ",directories=no,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no")
		//return winMain;
	}
}
function winOpenCalc(url, winName, width, height)
{
	if(winMain == null)
	{
		url = genURL(url)
		open(url,"common2","height=" + height + ",width=" + width + ",top=20,left=20,directories=no,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no")
		//return winMain;
	}
}
function winOpen3(url, winName, width, height)
{
	if(winMain == null)
	{
		url = genURL(url)
		open(url,"common2","height=" + height + ",width=" + width + ",top=300,left=350,directories=no,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no")
		//return winMain;
	}
}

function selectDatewithfisc(element, hidnElement)
{
	if(!hidnElement)
	{
		hidnElement = "hid" + element
	}
		
	if(document.getElementById(element))
	{
		if(document.getElementById(element).value != "")
		{
			var dte = document.getElementById(element).value.split("/")
			show_calendar(element, hidnElement, parseInt(dte[1]-1), dte[2])
		}
		else
		{
			show_calendar(element, hidnElement)
		}
		
	}
	//url = "/hms/giveMeDatewithfisc.asp?elementName=" + element + "&hidnElement=" + hidnElement;
	//winMain = window.open(url,"win1","toolbar=no,directories=no,resize=no,menubar=no,location=no,scrollbars=no,width=250,height=50,top=50,left=50,maximise=null")

}

/* This function is replaced with the new calendar function.
function selectDate(element, hidnElement)
{
	//if(!hidnElement)
	//{
	//	hidnElement = "hid" + element
	//}
	//url = "/hms/giveMeDate.asp?elementName=" + element + "&hidnElement=" + hidnElement;
	//winMain = window.open(url,"win1","toolbar=no,directories=no,resize=no,menubar=no,location=no,scrollbars=no,width=250,height=50,top=50,left=50,maximise=null")

	if(!hidnElement)
	{	
		hidnElement = "hid" + element
	}
	if(document.getElementById(element))
	{	
		if(document.getElementById(element).value != "")
		{
			var dte = document.getElementById(element).value.split("/")
			show_calendar(element, hidnElement, parseInt(dte[1]-1), dte[2])
		}
		else
		{
			show_calendar(element, hidnElement)
		}
		
	}
}
*/

function genURL(strURL)
{
	if(strURL.indexOf("?") > 0)
	{
		strURL = strURL + "&rndNo=" + Math.random()
	}
	else
	{
		strURL = strURL + "?rndNo=" + Math.random()
	}
	return strURL
}

var replaceWith = "";
var v,status,msg,inp;

var re = new RegExp(" ","ig");

function isEmpty(val)
{
	val = val.replace(re,replaceWith);
	return(val == "")
}

function trim(inputString)
{
//	Removes leading and trailing spaces from the passed string. Also removes
//	consecutive spaces and replaces it with one space. If something besides
//	a string is passed in (null, custom object, etc.) then return the input.
	if (typeof inputString != "string")
	{
		return inputString;
	}
	var retValue = inputString;
	var ch = retValue.substring(0, 1);
	while (ch == " ")
	{
		// Check for spaces at the beginning of the string
		retValue = retValue.substring(1, retValue.length);
	      ch = retValue.substring(0, 1);
	}
	ch = retValue.substring(retValue.length-1, retValue.length);
	while (ch == " ")
	{
		// Check for spaces at the end of the string
		retValue = retValue.substring(0, retValue.length-1);
		ch = retValue.substring(retValue.length-1, retValue.length);
	}

/*
	while (retValue.indexOf("  ") != -1)
	{
		// Note that there are two spaces in the string - look for multiple spaces within the string
		retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
	}
*/
	return retValue; // Return the trimmed string back to the user
}





//******************** Form restore defaults all inputs ***************//
var resFrmMain

function restoreFrm(frm) 
{
	resFrmMain = frm
	var i = 0
	for(i=0;i<frm.length;i++)
	{
		//alert(frm.elements[i].type)
		if(frm.elements[i].type)
		{
			setDefaultValue(frm.elements[i])
		}
	}
	return true;
}



function setDefaultValue(inpt)
{
	//alert(inpt.type)
	switch(inpt.type)
	{
		case "text" :
		{
			inpt.value = "";
			break;
		}
		case "password" :
		{
			inpt.value = "";
			break;
		}
		case "hidden" :
		{
			break;
		}
		case "select-one" :
		{
			inpt.selectedIndex = 0
			break;
		}
		case "select-multiple" :
		{
			selMulDefault(inpt);
			break;
		}
		case "radio" :
		{
			//rDefault(inpt);
			break;
		}
		case "checkbox" :
		{
			cDefault(inpt);
			break;
		}
		case "textarea" :
		{
			inpt.value = ""
			break;
		}
		case "file" :
		{
			inpt.value = ""
			break;
		}
	}
}
//-----------------------select all check box--------------
//---------------------changes made by shukra -----------------
	function selectall(frm)
	{
		var i = 0
		for(i=0;i<frm.length;i++)
		{
			if (frm.elements[i].type=="checkbox" && frm.elements[i].disabled == false)
			{
				frm.elements[i].checked=true;
			}
		}
		return true;
	}
	
//-----------------------de select all check box--------------
//---------------------changes made by shukra -----------------
	function uncheckall(frm)
	{
		
		var i = 0
		for(i=0;i<frm.length;i++)
		{
			if (frm.elements[i].type=="checkbox" && frm.elements[i].disabled == false)
			{
				frm.elements[i].checked=false;
			}
		}
		return true;
	}



function selMulDefault(inpt)
{
	var strVal = ""
	var len = inpt.length
	var j =0
		
	for(j=0;j<len;j++)
	{
		if(inpt[j].selected)
		{
			inpt[j].selected = false;
		}
	}
}



function rDefault(inpt)
{
	var strVal = ""
	var nm = inpt.name
	var j =0
	if(resFrmMain[nm].length)
	{
		for(j=0;j<resFrmMain[nm].length;j++)
		{
			if(resFrmMain[nm][j].checked)
			{
				resFrmMain[nm][j].checked = false
			}
		}
	}
	else
	{
		if(resFrmMain[nm].checked)
		{
			resFrmMain[nm].checked = false
		}
	}
}



function cDefault(inpt)
{
	var strVal = ""
	var nm = inpt.name
	var j =0
	if(resFrmMain[nm].length)
	{
		for(j=0;j<resFrmMain[nm].length;j++)
		{
			if(resFrmMain[nm][j].checked)
			{
				resFrmMain[nm][j].checked = false;
			}
		}
	}
	else
	{
		if(resFrmMain[nm].checked)
		{
			resFrmMain[nm].checked = false;
		}
	}
}




//******************** Form Checking Code ***************//
	
var frmMain
var DELIMITER = "$#@"

function checkFrm(frm) 
{ 
//alert(frm)
	frmMain = frm
	var i = 0
	for(i=0;i<frm.length;i++)
	{
		//alert(frm.elements[i].type + " : " + frm.elements[i].name + " : " + frm.elements[i].getAttribute('validate') + " : " + frm.elements[i].value)
		if(frm.elements[i].getAttribute('validate'))
		{
		//alert(frm.elements[i].type + " : " + frm.elements[i].tagName + " : " + frm.elements[i].validate + " : " + frm.elements[i].value)
			if(frm.elements[i].type)
			{
				if(frm.elements[i].disabled == false)
				{
					if(!checkInp(getValue(frm.elements[i]), frm.elements[i].getAttribute('validate'), frm.elements[i]))
					{
						return false;
					}
				}
			}
		}
		
		//alert(frm.elements[i].value)
		//alert(frm.elements[i].tagName)
	}
	return true;
}


function checkInp(value, vali, objItem)
{

	var arrVali, arrParam
	var fncName = "", trValue = "", lsValue = "", comment = ""
	var retValue
	var j=0, k=0 
	
	arrVali = vali.split(",")
	for(j=0;j<arrVali.length;j++)
	{
		fncName = ""
		trValue = ""
		lsValue = ""
		comment = ""
		cmnt = ""
	
		arrParam = arrVali[j].split("#")
		fncName = arrParam[0]
		for(k=1;k<arrParam.length;k++)
		{
			if(arrParam[k] == "true" || arrParam[k] == "false")
			{
				trValue = arrParam[k]
			}
			else
			{
				if(arrParam[k] == "any" || arrParam[k] == "all")
				{
					lsValue = arrParam[k]
				}
				else
				{
					comment = arrParam[k]
				}
			}
		}

		fncName = trim(fncName)
		
		if(fncName.charAt(fncName.length) == ")")
		{
		 	// *********code to be writen; if some parameters is to be sent then code has to be writen here
		}
		else
		{
			fncName = "retValue = " + fncName + "('" + value + "')"
		}
		if(trValue == "")
		{
			trValue = "true"
		}
		eval(fncName)
	
		if(trValue == "true" && !retValue)
		{
			dispComment(comment, objItem)
			return false;
		}
		else
		{
			if(trValue == "false" && retValue)
			{
				dispComment(comment, objItem)
				return false;
			}
		}
	}
	return true;
}


function dispComment(commnt, objItem)
{
	if(commnt != "")
	{
		alert(commnt)
	}
	else
	{
		if(objItem.getAttribute('disName'))
		{
			cmnt = cmnt.replace("#Name#", objItem.getAttribute('disName'))
		}
		else
		{
			if(objItem.name)
			{
				cmnt = cmnt.replace("#Name#", objItem.name)
			}
			else
			{
				cmnt = cmnt.replace("#Name#", "Field")
			}
		}
		alert(cmnt)
	}
	objItem.focus()
}


function isINInputList(inputType)
{
	if(inputType == "button")
	{
		return false;
	}
	return true;
}


function getValue(inpt)
{
	//alert(inpt.type)
	switch(inpt.type)
	{
		case "text" :
		{
			return (inpt.value);
			break;
		}
		case "password" :
		{
			return (inpt.value);
			break;
		}
		case "hidden" :
		{
			return (inpt.value);
			break;
		}
		case "select-one" :
		{
			if(inpt.selectedIndex == -1)
			{
				return "";
			}
			else
			{
				return (inpt[inpt.selectedIndex].value);
			}
			break;
		}
		case "select-multiple" :
		{
			return (selValue(inpt));
			break;
		}
		case "radio" :
		{
			return (rValue(inpt));
			break;
		}
		case "checkbox" :
		{
			return (cValue(inpt));
			break;
		}
		case "textarea" :
		{
			return (inpt.value);
			break;
		}
		case "file" :
		{
			return (inpt.value);
			break;
		}
	}
}


function selValue(inpt)
{
	var strVal = ""
	var len = inpt.length
	var j =0
		
	for(j=0;j<len;j++)
	{
		if(inpt[j].selected)
		{
			strVal = strVal + inpt[j].value + DELIMITER
		}
	}
	strVal = strVal.substr(0,strVal.length-DELIMITER.length)
	return (strVal);
}



function rValue(inpt)
{
	var strVal = ""
	var nm = inpt.name
	var j =0
	if(frmMain[nm].length)
	{
		for(j=0;j<frmMain[nm].length;j++)
		{
			if(frmMain[nm][j].checked)
			{
				return (frmMain[nm][j].value)
			}
		}
	}
	else
	{
		if(frmMain[nm].checked)
		{
			return(frmMain[nm].value)
		}
		else
		{
			return "";
		}
	}
	return ("");
}



function cValue(inpt)
{
	var strVal = ""
	var nm = inpt.name
	var j =0
	if(frmMain[nm].length)
	{
		for(j=0;j<frmMain[nm].length;j++)
		{
			if(frmMain[nm][j].checked)
			{
				strVal = strVal + frmMain[nm][j].value + DELIMITER
			}
		}
	}
	else
	{
		if(frmMain[nm].checked)
		{
			return(frmMain[nm].value)
		}
		else
		{
			return "";
		}
	}

	strVal = strVal.substr(0,strVal.length-DELIMITER.length)
	return (strVal);
}



//*********** INVENTORY FUNCTIONS *****************//

function getItem(itemCode, itemName, groupName, matreq_no)
{
	url1 = "/hms/inventory/itemSelSing.asp?item_code=" + itemCode + "&item_nm=" + itemName + "&grp_name=" + groupName + "&matreq_no=" + matreq_no
	winOpen(url1,'test',500,400)
}


function selEmpInv(empName)
{
	if(!empName)
	{
		searchWinHandler=winOpen("../emp_list.asp", "Employee List", "450","350");
	}
	else
	{
		searchWinHandler=winOpen("../emp_list.asp?empName=" + empName, "Employee List", "450","350");
	}
}




//*********** Button over code *****************//

var prevElement = "null"
clsName = ""
clsOver = ""

document.onmousemove = function buttTrap()  {

	var tagClass
	event = event || window.event;
	
	tagClass = event.srcElement.className

	if(event.srcElement.disabled && event.srcElement.disabled == true)
	{
		if(prevElement != "null")
		{
			prevElement.className = clsName
			prevElement = "null"
		}
		return;
	}
	
	if(tagClass == "button" || tagClass == "buttonOver" || tagClass == "buttSize" || tagClass == "buttSizeOver")
	{
		if(prevElement != "null")
		{
			prevElement.className = clsName
			prevElement = "null"
		}

		if(tagClass == "button" || tagClass == "buttonOver")
		{
			clsName = "button"
			clsOver = "buttonOver"
		}	

		if(tagClass == "buttSize" || tagClass == "buttSizeOver")
		{
			clsName = "buttSize"
			clsOver = "buttSizeOver"
		}

		//document.f.txtLogin.value = event.srcElement.type
		event.srcElement.className = clsOver
		prevElement = event.srcElement
	}
	else
	{
		if(prevElement != "null")
		{
			prevElement.className = clsName
			prevElement = "null"
		}
	}
	
}

document.onmousedown = clickTrapp;

function clickTrapp()
{
	if(winMain != null)
	{
		winMain.close();
		winMain = null;
	}
	/* Code added by swapnil for reopen costcentre window */
	if(objWindow != null)
	{
		objWindow.close();
		objWindow = null;
	}
//	alert("ok")
}
//*****************************POP UP DATE******************************//
<!-- STEP ONE: Copy this code into a new file, save as date-picker.js  -->

<!-- Original:  Kedar R. Bhave (softricks@hotmail.com) -->
<!-- Web Site:  http://www.softricks.com -->

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

var weekend = [0,6];
var weekendColor = "#e0e0e0";
var fontface = "arial";
var fontsize = 1;
var h_item = ""
var n_win = false;
var p_win

var gNow = new Date();
var ggWinCal;
isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;


Calendar.Months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(p_item, p_WinCal, p_month, p_year, p_format) {
	if ((p_month == null) && (p_year == null))	return;

	if (p_WinCal == null)
		this.gWinCal = ggWinCal;
	else
		this.gWinCal = p_WinCal;
	
	if (p_month == null) {
		this.gMonthName = null;
		this.gMonth = null;
		this.gYearly = true;
	} else {
		this.gMonthName = Calendar.get_month(p_month);
		this.gMonth = new Number(p_month);
		this.gYearly = false;
	}

	this.gYear = p_year;
	this.gFormat = p_format;
	this.gBGColor = "white";
	this.gFGColor = "black";
	this.gTextColor = "black";
	this.gHeaderColor = "black";
	this.gReturnItem = p_item;
}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;
Calendar.print = Calendar_print;

function Calendar_get_month(monthNo) {
	return Calendar.Months[monthNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) {
	/* 
	Check for leap year ..
	1.Years evenly divisible by four are normally leap years, except for... 
	2.Years also evenly divisible by 100 are not leap years, except for... 
	3.Years also evenly divisible by 400 are leap years. 
	*/
	if ((p_year % 4) == 0) {
		if ((p_year % 100) == 0 && (p_year % 400) != 0)
			return Calendar.DOMonth[monthNo];
	
		return Calendar.lDOMonth[monthNo];
	} else
		return Calendar.DOMonth[monthNo];
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();
	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}
	
	return ret_arr;
}

function Calendar_print() {
	ggWinCal.print();
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();
	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}
	return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function() {
	var vCode = "";
	var vHeader_Code = "";
	var vData_Code = "";
	
	// Begin Table Drawing code here..
	vCode = vCode + "<TABLE BORDER=0 width='100%' cellpadding=0 cellspacing=0 BGCOLOR=#FFFFFF>";
	
	vHeader_Code = this.cal_header();
	vData_Code = this.cal_data();
	vCode = vCode + vHeader_Code + vData_Code;
	
	vCode = vCode + "</TABLE>";
	
	return vCode;
}

Calendar.prototype.show = function() {
	var vCode = "";
	
	this.gWinCal.document.open();

	// Setup the page...
	this.wwrite("<html>");
	this.wwrite("<head><title>:: System :: - Calendar</title>");
	this.wwrite("<style type='text/css'>");
	this.wwrite("<!--");
	this.wwrite("@import '../calender.css';");
	this.wwrite("-->");
	this.wwrite("</style>");

	this.wwrite("</head>");

	this.wwrite("<body oncontextmenu='return false;' topmargin='0' leftmargin='0'>");

	// Show navigation buttons
	var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
	var prevMM = prevMMYYYY[0];
	var prevYYYY = prevMMYYYY[1];

	var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
	var nextMM = nextMMYYYY[0];
	var nextYYYY = nextMMYYYY[1];

	this.wwrite("<TABLE WIDTH='100%' BORDER=0 CELLSPACING=0 CELLPADDING=0 style='border:solid 1px #000000'>");
	this.wwrite("<tr>");
	this.wwrite("<td>");
		this.wwrite("<TABLE WIDTH='100%' BORDER=0 BGCOLOR='#d0d0d0' CELLSPACING=0 CELLPADDING=0 style='border-left:solid 2px #FFFFFF;border-top:solid 2px #FFFFFF'>");
		this.wwrite("<tr><td colspan='11' height='4'></td></tr>");
		this.wwrite("<tr><td colspan='10'align='right'><input type='button' value='x' style='width:12;height:12' onclick='" + p_win + ".clsDate()'></td>");
		this.wwrite("<td></td></tr>");
		this.wwrite("<tr><td colspan='11' height='5'></td></tr>");
		this.wwrite("<tr>");
		this.wwrite("<td width='10'>&nbsp;</td>");
		this.wwrite("<td align='center'><input type='button' value='<<'");
		this.wwrite("onclick=\"" + p_win + ".Build('" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "')\"");
		this.wwrite("></td>");
		this.wwrite("<td width='10'>&nbsp;</td>");
		this.wwrite("<td align='center'><input type='button' value='<'");
		this.wwrite("onclick=\"" + p_win + ".Build('" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "')\"");
		this.wwrite("></td>");
		this.wwrite("<td width='10'>&nbsp;</td>");
		this.wwrite("<td align='center' width='100%'>");
		this.wwriteA("<FONT style='font-size:11px'><B>");
		this.wwriteA(this.gMonthName + " " + this.gYear);
		this.wwriteA("</B></font></td>");
		this.wwrite("<td width='10'>&nbsp;</td>");
		this.wwrite("<td align='center'><input type='button' value='>'");
		this.wwrite("onclick=\"" + p_win + ".Build('" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "')\"");
		this.wwrite("></td>");
		this.wwrite("<td width='10'>&nbsp;</td>");
		this.wwrite("<td align='center'><input type='button' value='>>'");
		this.wwrite("onclick=\"" + p_win + ".Build('" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "')\"");
		this.wwrite("></td>");
		this.wwrite("<td width='10'>&nbsp;</td>");

		this.wwrite("</tr>");
		this.wwrite("<tr><td colspan='11' height='5'></td></tr>");
		this.wwrite("</table>");
	this.wwrite("</td>");
	this.wwrite("</tr>");
	this.wwrite("<tr>");
	this.wwrite("<td>");
		// Get the complete calendar code for the month..
		vCode = this.getMonthlyCalendarCode();
		this.wwrite(vCode);
	this.wwrite("</td>");
	this.wwrite("</tr>");
	this.wwrite("</table>");

	this.wwrite("</body></html>");
	this.gWinCal.document.close();
}

Calendar.prototype.wwrite = function(wtext) {
	this.gWinCal.document.writeln(wtext);
}

Calendar.prototype.wwriteA = function(wtext) {
	this.gWinCal.document.write(wtext);
}

Calendar.prototype.cal_header = function() {
	var vCode = "";
	
	vCode = vCode + "<TR>";
	vCode = vCode + "<TD><B>Sun</B></TD>";
	vCode = vCode + "<TD><B>Mon</B></TD>";
	vCode = vCode + "<TD><B>Tue</B></TD>";
	vCode = vCode + "<TD><B>Wed</B></TD>";
	vCode = vCode + "<TD><B>Thu</B></TD>";
	vCode = vCode + "<TD><B>Fri</B></TD>";
	vCode = vCode + "<TD><B>Sat</B></TD>";
	vCode = vCode + "</TR>";
	vCode = vCode + "<TR><TD colspan='7' height='4'></TR>";
	
	return vCode;
}

Calendar.prototype.cal_data = function() {
	var vDate = new Date();
	vDate.setDate(1);
	vDate.setMonth(this.gMonth);
	vDate.setFullYear(this.gYear);

	var vFirstDay=vDate.getDay();
	var vDay=1;
	var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
	var vOnLastDay=0;
	var vCode = "";

	/*
	Get day for the 1st of the requested month/year..
	Place as many blank cells before the 1st day of the month as necessary. 
	*/

	vCode = vCode + "<TR>";
	for (i=0; i<vFirstDay; i++) {
		vCode = vCode + "<TD " + this.write_weekend_string(i) + "></TD>";
	}

// ******** code by abhijit

	

// ******** code by abhijit
	// Write rest of the 1st week
	for (j=vFirstDay; j<7; j++) {
		vCode = vCode + "<TD " + this.write_weekend_string(j) + ">" + 
			"<A HREF='#' " + 
				"onClick=\"" + p_win + ".document.getElementById('" + this.gReturnItem + "').value='" + 
				this.format_data(vDay) + 
				"';" + p_win + ".closeDate('" + this.format_data(vDay) + "');\">" + 
				this.format_day(vDay) + 
			"</A>" + 
			"</TD>";
		vDay=vDay + 1;
	}
	vCode = vCode + "</TR>";

	// Write the rest of the weeks
	for (k=2; k<7; k++) {
		vCode = vCode + "<TR>";

		for (j=0; j<7; j++) {
			vCode = vCode + "<TD " + this.write_weekend_string(j) + ">" + 
				"<A HREF='#' " + 
					"onClick=\"" + p_win + ".document.getElementById('" + this.gReturnItem + "').value='" + 
					this.format_data(vDay) + 
					"';" + p_win + ".closeDate('" + this.format_data(vDay) + "');\">" + 
				this.format_day(vDay) + 
				"</A>" + 
				"</TD>";
			vDay=vDay + 1;

			if (vDay > vLastDay) {
				vOnLastDay = 1;
				break;
			}
		}

		if (j == 6)
			vCode = vCode + "</TR>";
		if (vOnLastDay == 1)
			break;
	}
	
	// Fill up the rest of last week with proper blanks, so that we get proper square blocks
	for (m=1; m<(7-j); m++) {
		if (this.gYearly)
			vCode = vCode + "<TD " + this.write_weekend_string(j+m) + 
			"><FONT COLOR='gray'> </FONT></TD>";
		else
			vCode = vCode + "<TD " + this.write_weekend_string(j+m) + 
			"><FONT COLOR='gray'>&nbsp;&nbsp;" + m + "</FONT></TD>";
	}
	
	return vCode;
}

Calendar.prototype.format_day = function(vday) {
	var vNowDay = gNow.getDate();
	var vNowMonth = gNow.getMonth();
	var vNowYear = gNow.getFullYear();

	if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear)
		return ("<FONT COLOR=\"Blue\"><B>" + vday + "</B></FONT>");
	else
		return (vday);
}

Calendar.prototype.write_weekend_string = function(vday) {
	var i;

	// Return special formatting for the weekend day.
	for (i=0; i<weekend.length; i++) {
		if (vday == weekend[i])

			return (" BGCOLOR=\"" + weekendColor + "\"");
	}
	
	return "";
}

Calendar.prototype.format_data = function(p_day) {
	var vData;
	var vMonth = 1 + this.gMonth;
	vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
	var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
	var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
	var vY4 = new String(this.gYear);
	var vY2 = new String(this.gYear.substr(2,2));
	var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;

	switch (this.gFormat) {
		case "MM\/DD\/YYYY" :
			vData = vMonth + "\/" + vDD + "\/" + vY4;
			break;
		case "MM\/DD\/YY" :
			vData = vMonth + "\/" + vDD + "\/" + vY2;
			break;
		case "MM-DD-YYYY" :
			vData = vMonth + "-" + vDD + "-" + vY4;
			break;
		case "MM-DD-YY" :
			vData = vMonth + "-" + vDD + "-" + vY2;
			break;

		case "DD\/MON\/YYYY" :
			vData = vDD + "\/" + vMon + "\/" + vY4;
			break;
		case "DD\/MON\/YY" :
			vData = vDD + "\/" + vMon + "\/" + vY2;
			break;
		case "DD-MON-YYYY" :
			vData = vDD + "-" + vMon + "-" + vY4;
			break;
		case "DD-MON-YY" :
			vData = vDD + "-" + vMon + "-" + vY2;
			break;

		case "DD\/MONTH\/YYYY" :
			vData = vDD + "\/" + vFMon + "\/" + vY4;
			break;
		case "DD\/MONTH\/YY" :
			vData = vDD + "\/" + vFMon + "\/" + vY2;
			break;
		case "DD-MONTH-YYYY" :
			vData = vDD + "-" + vFMon + "-" + vY4;
			break;
		case "DD-MONTH-YY" :
			vData = vDD + "-" + vFMon + "-" + vY2;
			break;

		case "DD\/MM\/YYYY" :
			vData = vDD + "\/" + vMonth + "\/" + vY4;
			break;
		case "DD\/MM\/YY" :
			vData = vDD + "\/" + vMonth + "\/" + vY2;
			break;
		case "DD-MM-YYYY" :
			vData = vDD + "-" + vMonth + "-" + vY4;
			break;
		case "DD-MM-YY" :
			vData = vDD + "-" + vMonth + "-" + vY2;
			break;

		default :
			vData = vMonth + "\/" + vDD + "\/" + vY4;
	}

	return vData;
}

function Build(p_item, p_month, p_year, p_format) {
	var p_WinCal = ggWinCal;
	gCal = new Calendar(p_item, p_WinCal, p_month, p_year, p_format);

	// Customize your Calendar here..
	gCal.gBGColor="white";
	gCal.gLinkColor="black";
	gCal.gTextColor="black";
	gCal.gHeaderColor="darkgreen";

	// Choose appropriate show function
	gCal.show();
}

function show_calendar() {
	/* 
		p_month : 0-11 for Jan-Dec; 12 for All Months.
		p_year	: 4-digit year
		p_format: Date format (mm/dd/yyyy, dd/mm/yy, ...)
		p_item	: Return Item.
	*/
	p_item = arguments[0];

	h_item = arguments[1];

	if (arguments[2] == null)
		p_month = new String(gNow.getMonth());
	else
		p_month = arguments[2];
	if (arguments[3] == "" || arguments[3] == null)
		p_year = new String(gNow.getFullYear().toString());
	else
		p_year = arguments[3];
	if (arguments[4] == null)
		p_day = "DD/MM/YYYY";
	else
		p_format = arguments[4];

	p_format = "DD/MM/YYYY";

	var diffX = document.body.scrollWidth - findPosX(document.getElementById(p_item))
	
	n_win = false;

	if(diffX <= 223)
	{
		diffX = 223 - diffX
		diffX = findPosX(document.getElementById(p_item)) - diffX
		if(diffX<0)
		{
			n_win = true;
		}
	}
	else
	{
		diffX = findPosX(document.getElementById(p_item))
	}

	
	//alert("element : " + document.documentElement.scrollHeight)
	
	var diffY = document.body.scrollHeight - findPosY(document.getElementById(p_item))

	if(diffY <= 162)
	{
		diffY = 142 - diffY
		diffY = findPosY(document.getElementById(p_item)) - diffY
		if(diffY<0)
		{
			n_win = true;
		}
	}
	else
	{
		diffY = findPosY(document.getElementById(p_item)) + 20
	}

	//alert(diffX)
	
	//document.getElementById("divDate").style.left = findPosX(document.getElementById(p_item));

	if(n_win)
	{
		vWinCal = window.open("about:blank","win11","toolbar=no,directories=no,resize=no,menubar=no,location=no,scrollbars=no,width=223,height=142,maximise=null")
		vWinCal.focus()
		p_win = "window.opener"

	}
	else
	{
		vWinCal = window.frame_Date
		document.getElementById("divDate").style.left = diffX;
		document.getElementById("divDate").style.top = diffY;
		document.getElementById("divDate").style.display = "";
		p_win = "parent.window"
		
	}
	
	ggWinCal = vWinCal;
	Build(p_item, p_month, p_year, p_format);
}

function closeDate(vlDte)
{
	if(n_win)
	{
		ggWinCal.close()
	}
	{
		document.getElementById("divDate").style.display = "none";
	}
	if(document.getElementById(h_item))
	{
		if(vlDte != "")
		{
			var dte = vlDte.split("/")
			document.getElementById(h_item).value = dte[2] + "/" + dte[1] + "/" + dte[0]
			document.getElementById(p_item).focus();
		}
		else
		{
			document.getElementById(h_item).value = ""
		}
	}
}

function clsDate(vlDte)
{
	if(n_win)
	{
		ggWinCal.close()
	}
	{
		document.getElementById("divDate").style.display = "none";
	}
}

function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}


function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

function charcount(descr,non$char1)
{
	//descr= It is form element where u adding text matter.
	//non$char1= It is form element where see number which is length  of text matter(textname) .
	j=eval("document.forms[0]."+descr+".value")
	if(((j.length)+1) >255)
	{
	 	alert('You can not add more characters');
		document.getElementById(descr).value=document.getElementById(descr).value.substring(0,254);
	}
	else
	{
			if (document.selection)
			{
				document.getElementById(non$char1).value=(j.length)-(document.selection.createRange().text.length-1);
			}
			else
			{
				document.getElementById(non$char1).value=(j.length)+1;
			}
	}
}

function getdcr(descr,non$char1)
{
	document.getElementById(descr).onkeydown=check_keydown;
	function check_keydown (e)
	{
		var keycode = ( window.Event ) ? e.which : event.keyCode;
		if (keycode == 8)
		{
			var cursorPos=getCursorPos(descr);
			if (document.getElementById(descr).value.length>0)
			{  
				var txt="";
				var st,st1;
				if (document.selection)
				{
					txt = document.selection.createRange().text;
				}
				if(txt.length>0)
				{
					st=document.getElementById(descr).value.substring(0,document.getElementById(descr).value.indexOf(txt));
					st1=document.getElementById(descr).value.substring(document.getElementById(descr).value.indexOf(txt) + txt.length,document.getElementById(descr).value.length)
					document.getElementById(descr).value=st+st1;
					document.getElementById(non$char1).value=document.getElementById(descr).value.length;
				}
				else
				{
					var str1,str2;
					str1=document.getElementById(descr).value.substring(0,cursorPos-1);
					str2=document.getElementById(descr).value.substring(cursorPos,document.getElementById(descr).value.length);
					document.getElementById(descr).value=str1+str2;
					document.getElementById(non$char1).value=document.getElementById(descr).value.length;
					setCursorPos(descr,cursorPos,keycode);
				}
			}
			return ( false );
		}
		else if ( keycode == 46 )
		{
			var txt="";
			var st,st1;
			if (document.selection)
			{
				txt = document.selection.createRange().text;
			}
			if(txt.length>0)
			{
				st=document.getElementById(descr).value.substring(0,document.getElementById(descr).value.indexOf(txt));
				st1=document.getElementById(descr).value.substring(document.getElementById(descr).value.indexOf(txt) + txt.length,document.getElementById(descr).value.length)
				document.getElementById(descr).value=st+st1;
				document.getElementById(non$char1).value=document.getElementById(descr).value.length;
			}
			else
			{
				var cursorPos=getCursorPos(descr);
				if (document.getElementById(descr).value.length>0)
				{  
					var str1,str2;
					str1=document.getElementById(descr).value.substring(0,cursorPos);
					str2=document.getElementById(descr).value.substring(cursorPos+1,document.getElementById(descr).value.length);
					document.getElementById(descr).value=str1+str2;
					document.getElementById(non$char1).value=document.getElementById(descr).value.length;
					setCursorPos(descr,cursorPos,keycode);
				 }
			}
			return (false);
		}
	}
}

function setCursorPos(descr,cursorPos,keycode)
{
	var obj=document.getElementById(descr);
	if(keycode==8)
		var pos=cursorPos-1;
	else if(keycode==46)
		var pos=cursorPos;
	//FOR IE
	if(obj.setSelectionRange)
	{
		obj.focus();
		obj.setSelectionRange(pos,pos);
	}
	// For Firefox
	else if (obj.createTextRange)
	{
		var range = obj.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function getCursorPos(descr)
{
	var pos;
	//save off the current value to restore it later,
	var sOldText = document.getElementById(descr).value;
	//create a range object and save off it's text
	var objRange = document.selection.createRange();
	var sOldRange = objRange.text;
	//alert(document.getElementById(descr).value + objRange.text);
	//set this string to a small string that will not normally be encountered
	var sWeirdString = '#%~';
	//insert the weirdstring where the cursor is at
	objRange.text = sOldRange + sWeirdString; objRange.moveStart('character', (0 - sOldRange.length - sWeirdString.length));
	//save off the new string with the weirdstring in it
	var sNewText = document.getElementById(descr).value;
	//set the actual text value back to how it was
	objRange.text = sOldRange;
	//look through the new string we saved off and find the location of
	//the weirdstring that was inserted and return that value
	for (i=0; i <= sNewText.length; i++) 
	{
		var sTemp = sNewText.substring(i, i + sWeirdString.length);
		if (sTemp == sWeirdString) 
		{
			pos = (i - sOldRange.length);
		}
	}
	return (pos);
}

function getCnt(txt_nm,char_cnt)
{
	document.getElementById(char_cnt).value= document.getElementById(txt_nm).value.length;
}

function charcount1(descr,non$char1,len1)
{	//textname= It is form element where u adding text matter.
	//countname= It is form element where see number which is length  of text matter(textname) .
	//len1= maximum length of the character 
	j=eval("document.forms[0]."+descr+".value")
//alert(j)
	if(((j.length)+1) >255)
	{
	 	alert('You can not add more characters!');	
		document.getElementById(descr).value=document.getElementById(descr).value.substring(0,254);
	}
	else
	{
	    if (document.selection)
		{
			document.getElementById(non$char1).value=(j.length)-(document.selection.createRange().text.length-1);
		}
		else
		{
			document.getElementById(non$char1).value=(j.length)+1;
		}
	}
}

function number_format( number, decimals, dec_point, thousands_sep ) {
    // *     example 1: number_format(1234.5678, 2, '.', '');
    // *     returns 1: 1234.57
 
    var i, j, kw, kd, km;
	 var sign = "";
 
	if(number < 0)
	 	sign="-";
	number=Math.abs(number);
	 // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }
 
    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
 
    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }
 
    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
 
 
    return sign + km + kw + kd;
}
function numtostr(val)   
{   
    var junkVal=val
    junkVal=Math.floor(junkVal);   
    var obStr=new String(junkVal);   
    numReversed=obStr.split("");   
    actnumber=numReversed.reverse();   
  
    if(Number(junkVal) >=0)   
    {   
        //do nothing   
    }   
    else  
    {   
        alert('wrong Number cannot be converted');   
        return false;   
    }   
    if(Number(junkVal)==0)   
    {   
        return 'Rupees Zero Only';   
        return false;   
    }   
    if(actnumber.length>9)   
    {   
        alert('Oops!!!! the Number is too big to covertes');   
        return false;   
    }   
  
    var iWords=["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];   
    var ePlace=['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];   
    var tensPlace=['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety' ];   
  
    var iWordsLength=numReversed.length;   
    var totalWords="";   
    var inWords=new Array();   
    var finalWord="";   
    j=0;   
    for(i=0; i<iWordsLength; i++)   
    {   
        switch(i)   
        {   
        case 0:   
            if(actnumber[i]==0 || actnumber[i+1]==1 )   
            {   
                inWords[j]='';   
            }   
            else  
            {   
                inWords[j]=iWords[actnumber[i]];   
            }   
            inWords[j]=inWords[j]+' Only';   
            break;   
        case 1:   
            tens_complication();   
            break;   
        case 2:   
            if(actnumber[i]==0)   
            {   
                inWords[j]='';   
            }   
            else if(actnumber[i-1]!=0 && actnumber[i-2]!=0)   
            {   
                inWords[j]=iWords[actnumber[i]]+' Hundred and';   
            }   
            else  
            {   
                inWords[j]=iWords[actnumber[i]]+' Hundred';   
            }   
            break;   
        case 3:   
            if(actnumber[i]==0 || actnumber[i+1]==1)   
            {   
                inWords[j]='';   
            }   
            else  
            {   
                inWords[j]=iWords[actnumber[i]];   
            }   
            inWords[j]=inWords[j]+" Thousand";   
            break;   
        case 4:   
            tens_complication();   
            break;   
        case 5:   
            if(actnumber[i]==0 || actnumber[i+1]==1 )   
            {   
                inWords[j]='';   
            }   
            else  
            {   
                inWords[j]=iWords[actnumber[i]];   
            }   
            inWords[j]=inWords[j]+" Lakh";   
            break;   
        case 6:   
            tens_complication();   
            break;   
        case 7:   
            if(actnumber[i]==0 || actnumber[i+1]==1 )   
            {   
                inWords[j]='';   
            }   
            else  
            {   
                inWords[j]=iWords[actnumber[i]];   
            }   
            inWords[j]=inWords[j]+" Crore";   
            break;   
        case 8:   
            tens_complication();   
            break;   
        default:   
            break;   
        }   
        j++;   
    }   
  
    function tens_complication()   
    {   
        if(actnumber[i]==0)   
        {   
            inWords[j]='';   
        }   
        else if(actnumber[i]==1)   
        {   
            inWords[j]=ePlace[actnumber[i-1]];   
        }   
        else  
        {   
            inWords[j]=tensPlace[actnumber[i]];   
        }   
    }   
	
    inWords.reverse();   
    for(i=0; i<inWords.length; i++)   
    {   
        finalWord+=inWords[i];   
    } 
	
	return finalWord
}
//=============Textarea Function :-Single Quote or Double Quote or Forworded Slash or Enter are not allowed================
var partextMain
var blankspace=""
	
function parsetext(partext) 
{ 
	partextMain = partext
	var i = 0
	for(i=0;i<partext.length;i++)
	{
		if(partext.elements[i].type=="textarea")
		{
			if(partext.elements[i].getAttribute("parsing") != "No")
			{
				partext.elements[i].value=partext.elements[i].value.replace(/\//g ,blankspace);
				partext.elements[i].value=partext.elements[i].value.replace(/'/g,blankspace);
				partext.elements[i].value=partext.elements[i].value.replace(/"/g,blankspace);
				partext.elements[i].value=partext.elements[i].value.replace(/(\r\n|[\r\n])/g, " "); //Enter key remove
				//partext.elements[i].value=partext.elements[i].value.replace(/\s/g,blankspace).replace(/,/g,','); 
			}
		}
	}
	return true;
}
//==================================================================

//=========================Function to serach drop down list by typing search string in a tex box===========================
function ddl_search_frm_txtbox(drop_down_list,text_search)// function responsible to search text from dropdown as typed in texbox
{
	var ddl=eval("document.forms[0]."+drop_down_list); // rename right hand object as document.form name.drop down id
	var text_box=eval("document.forms[0]."+text_search); // rename righ hand object as document.form name .textbox name

	var ctr=new Array(); // array counting number of results matched
	var val=0; // final matched value

	var arr=new Array(2); // array containing the values of drop down list
	var temp_ctr=new Array(); // temporary array counting number of results matched
	
	// fetching the values from drop down list
	for(var i=0;i<ddl.length;i++)
	{
		arr[i]=new Array();
		arr[i][0]=ddl.options[i].text.toUpperCase();
		arr[i][1]=ddl.options[i].value;
		ctr[i]=parseInt(0);
		temp_ctr[i]=ctr[i];
	}

	text_value=text_box.value.toUpperCase(); // text typed in text box
	var temp; // temporary variable
	var flag=1; // flag

	var myctr=parseInt(0); // counter

	// matching each value form drop down with entered text
	for(var j=0;j<i;j++)
	{
		var len=0;
		if(arr[j][0].length>text_value.length)
			len=text_value.length;
		else
			len=arr[j][0].length;
			
		for(var c=0;c<len;c++)
		{
			if(arr[j][0].charAt(0)==text_value.charAt(0))
			{
				flag=0;
			}
			else
			{
				ctr[j]=0;
				temp_ctr[j]=0;
			}

			if((arr[j][0].charAt(c)==text_value.charAt(c))&&flag==0)
			{
				flag=0;
				myctr=myctr+1;
		
				ctr[j]=parseInt(myctr);
				temp_ctr[j]=ctr[j];
			}
			else
			{
				flag=1;
				break;
			}
		}
		myctr=0;
	}

	var matched_index=1;
	var temp; // temporary variable
	// sorting the matched indexes with ascending order of maximum charaters matched
	for(var k=0;k<ctr.length-1;k++)
	{
		if(ctr[k]>ctr[k+1])
		{
			temp=ctr[k];
			ctr[k]=ctr[k+1];
			ctr[k+1]=temp;
		}
	}

	// finding the index of the maximum character matched value
	for(var n=0;n<ctr.length;n++)
	{
		if(ctr[k]==temp_ctr[n])
		{
			matched_index=n;
			break;
		}
	}
	val=arr[matched_index][1];

	setSelectedIndex(ddl, val);
}

function setSelectedIndex(ddl, val) // function responsible to set matched value in drop down list
{
	for ( var i = 0; i < ddl.options.length; i++ ) 
	{
        if ( ddl.options[i].value == val ) 
		{
            ddl.options[i].selected = true;
            return;
        }
    }
}
//==========================================================================================================================

function roundNumber(num, dec) 
{
	// function to round value upto n number of decimal places
	// example : roundNumber( 1.6666666667 , 3)
	
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}


function roundNumber(num, dec) 
{
	// function to round value upto n number of decimal places
	// example : roundNumber( 1.6666666667 , 3)
	
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

//--- Both functions for uploading  jadhav
function forwin(filenm)
{
	winOpen(filenm,"oWin","500","200")
}
		
function chng_suggst_mode()
{
	var req = Inint_AJAX();
     req.onreadystatechange = function () 
	 { 
          if (req.readyState==4) 
		  {
               if (req.status==200) 
			   {
                    document.getElementById('mm').innerHTML=req.responseText; //retuen value
               } 
          }
     };
	 
	 req.open("GET", "toggle_suggst_modehr.php");//make connection
     req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=iso-8859-1"); // set Header
     req.send(null); //send value
}



//------------------------------------------- Code of new calendar starts here ------------------------------------------------
var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var days = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

today = new getToday();	
var element_id;
var hid_element_id;
var strCal="";
var vWinCal;
var pp_win="";
var n_win = false;

function getDays(month, year) 
{
	// Test for leap year when February is selected.
	if (1 == month)
		return ((0 == year % 4) && (0 != (year % 100))) ||
			(0 == year % 400) ? 29 : 28;
	else
		return daysInMonth[month];
}

function getToday()
{
	// Generate today's date.
	this.now = new Date();
	this.year = this.now.getFullYear() ; // Returned year YYYY
	this.month = this.now.getMonth();
	this.day = this.now.getDate();
}
 
function newCalendar() 
{
	var parseYear = parseInt(vWinCal.document.getElementById("year")  [vWinCal.document.getElementById("year").selectedIndex].text);
	var parseMonth = vWinCal.document.getElementById("month").selectedIndex

	var newCal = new Date(parseYear , parseMonth , 1);
	var day = -1;
	var startDay = newCal.getDay();
	var daily = 0; 

	today = new getToday(); // 1st call
	if ((today.year == newCal.getFullYear() ) &&   (today.month == newCal.getMonth()))
	   day = today.day;
	// Cache the calendar table's tBody section, dayList.
	var tableCal = vWinCal.document.getElementById("calendar").tBodies.dayList;

	var intDaysInMonth =
	   getDays(newCal.getMonth(), newCal.getFullYear() );

	for (var intWeek = 0; intWeek < tableCal.rows.length;  intWeek++)
	{
		for (var intDay = 0;	 intDay < tableCal.rows[intWeek].cells.length;	 intDay++)
		{
			var cell = tableCal.rows[intWeek].cells[intDay];
			
			// Start counting days.
			if ((intDay == startDay) && (0 == daily))
				daily = 1;
			// Highlight the current day.
			cell.style.color = (day == daily) ? "red" : "";
			if(day == daily)
			{
				if(day<10)
					dt="0"+day;
				else
					dt=day;
				mn=newCal.getMonth()+1;
				if(mn<10)
					mn = "0"+mn;
				if(vWinCal.document.all) // if browser is other than firefox
					vWinCal.document.getElementById("todayday").innerText= "Today: " +  dt + "/" + (mn) + "/" + newCal.getFullYear() ;
				else // browser is other than firefox
					vWinCal.document.getElementById("todayday").textContent= "Today: " +  dt + "/" + (mn) + "/" + newCal.getFullYear() ;
			}

			// Output the day number into the cell.
			if ((daily > 0) && (daily <= intDaysInMonth))
			{
				if(vWinCal.document.all)
					cell.innerText = daily++;
				else
					cell.textContent = daily++;
			}
			else
			{
				if(vWinCal.document.all)
					cell.innerText = "";
				else
					cell.textContent = "";
			}
	   }
	}
}
	  
function getTodayDay()
{
	var mn = today.month+1
	if(mn < 10)
		mn = "0" + mn;
	var dt = today.day;
	if(dt < 10)
		dt = "0" + dt;
	document.getElementById(element_id).value = dt + "/" + mn + "/" + today.year; 
	document.getElementById(hid_element_id).value = today.year + "/" + mn + "/" + dt; 
	document.getElementById(element_id).focus();
	
	curyrindex=parseInt(today.year)-1900;
	vWinCal.document.getElementById("year").selectedIndex =curyrindex;
	vWinCal.document.getElementById("month").selectedIndex = today.month; 
	HideCalendar()
}
 
function getDate1(evt) 
{
	// This code executes when the user clicks on a day
	// in the calendar.
	var e = evt ? evt : window.evt;
	var srcElement = e.srcElement ? e.srcElement : e.target;
	
	if ("TD" == srcElement.tagName)
	{
		// Test whether day is valid.
		if(vWinCal.document.all)
			val = srcElement.innerText;
		else
			val = srcElement.textContent;
	}
	if ("" != val)
	{ 
		var mn = vWinCal.document.getElementById("month").selectedIndex+1;
		if(mn < 10)
			mn = "0" + mn;
		if(vWinCal.document.all)
			var dt = srcElement.innerText;
		else
			var dt = srcElement.textContent;
		if(dt < 10)
			dt = "0" + dt;
		var Year = vWinCal.document.getElementById("year") [vWinCal.document.getElementById("year").selectedIndex].text;
		document.getElementById(element_id).value= dt +"/"+ mn +"/"+ Year;
		document.getElementById(hid_element_id).value= Year +"/"+ mn +"/"+ dt;
		document.getElementById(element_id).focus();
		
		curyrindex=parseInt(Year)-1900;
		vWinCal.document.getElementById("year").selectedIndex =curyrindex;
		vWinCal.document.getElementById("month").selectedIndex = parseInt(mn)-1; 
		HideCalendar()
	}
}
 
function GetBodyOffsetX(el_name, arr_shift)
{
	var x;
	var y;
	x = 0;
	y = 0;

	var elem = document.getElementById(el_name);
	do 
	{
		x += elem.offsetLeft;
		y += elem.offsetTop;
		if (elem.tagName == "BODY")
			break;
		elem = elem.offsetParent; 
	} while  (1 > 0);

	arr_shift[0] = x;
	arr_shift[1] = y;
	return  x;
}	

function SetCalendarOnElement(el_name)
{
	if (el_name=="") 
	el_name = element_id;
	var arr_shift = new Array(2);
	GetBodyOffsetX(el_name, arr_shift);
	document.getElementById("divDate").style.left  = arr_shift[0]; //  - document.all.calendar.offsetLeft;
	document.getElementById("divDate").style.top = arr_shift[1] + 25 ;
}
	           
function ShowCalendar(elem_name,hid_elem_name)
{
	if (elem_name=="")
	{
		elem_name = element_id;
		hid_elem_name = hid_element_id;
	}
	element_id	= elem_name; // element_id is global variable
	if(!hid_elem_name)
		hid_element_id = "hid" + elem_name
	else
		hid_element_id	= hid_elem_name; // hid_element_id is global variable

	var diffX = document.body.scrollWidth - findPosX(document.getElementById(elem_name))
	if(diffX <= 200)
	{
		diffX = 200 - diffX
		diffX = findPosX(document.getElementById(elem_name)) - diffX
		if(diffX<0)
		{
			n_win = true;
		}
	}
	else
	{
		diffX = findPosX(document.getElementById(elem_name))
	}

	var diffY = document.body.scrollHeight - findPosY(document.getElementById(elem_name))
	if(diffY <= 210)
	{
		diffY = 210 - diffY
		diffY = findPosY(document.getElementById(elem_name)) - diffY
		if(diffY<0)
		{
			n_win = true;
		}
	}
	else
	{
		diffY = findPosY(document.getElementById(elem_name)) + 20
	}

	var parseYear = parseInt(document.getElementById(elem_name).value.substr(document.getElementById(elem_name).value.lastIndexOf("/")+1))-1900
	var parseMonth = Math.round(document.getElementById(elem_name).value.substr(parseInt(document.getElementById(elem_name).value.indexOf("/"))+1,2))-1

		
	if(n_win)
	{
		vWinCal = window.open("about:blank","win11","toolbar=no,directories=no,resize=no,menubar=no,location=no,scrollbars=no,width=189,height=200,maximise=null")
		pp_win = "window.opener";
		attachCalendar()

		if(document.getElementById(elem_name).value != "")
		{
			vWinCal.document.getElementById("year").selectedIndex = parseYear;
			vWinCal.document.getElementById("month").selectedIndex = parseMonth;
		}
		newCalendar();
	}
	else
	{
		vWinCal = window.frame_Date
		pp_win = "window.parent";
		
		attachCalendar()

		if(document.getElementById(elem_name).value != "")
		{
			vWinCal.document.getElementById("year").selectedIndex = parseYear;
			vWinCal.document.getElementById("month").selectedIndex = parseMonth;
		}
		newCalendar();
		//vWinCal.document.getElementById("calendar").style.display="inline";
		SetCalendarOnElement(element_id);
		document.getElementById("divDate").style.display = "";
	}
}

function HideCalendar()
{
	//vWinCal.document.getElementById("calendar").style.display="none";
	if(n_win)
		vWinCal.close()
	else
		document.getElementById("divDate").style.display = "none";
}



function selectDate(elem_name,hid_elem_name,stlmt)
{
		var finyr=for_java_financial_year;
		var dt1= (parseInt(finyr)-1) + '/04/01';
		var dt2= parseInt(finyr) + '/03/31';
		
		var diff=date_diff12("/",dt1,dt2)		
if(!stlmt) 
{
stlmt=',,,,' + (parseInt(finyr)-1) + '/04/01-0-' + diff
}
else 
{
	if(stlmt=="-")
 	{ 
		stlmt=",,,,,"; 
	} 
}
var stlmtx=stlmt;

	if(for_whether_report=="YES") {		stlmt=",,,,,";	}	else {	stlmt=stlmtx;	}	
	if(vWinCal) HideCalendar()
	//ShowCalendar(elem_name,hid_elem_name);

	ShowCalendar_lmt(elem_name,hid_elem_name,stlmt);

		
}

function gotoPrev(sid)
{
	if(sid == "year")
	{
		if(vWinCal.document.getElementById("year").selectedIndex > 0)
		{
			vWinCal.document.getElementById("year").selectedIndex = vWinCal.document.getElementById("year").selectedIndex -1;
			newCalendar();
		}
	}
	else if(sid == "month")
	{
		if(vWinCal.document.getElementById("month").selectedIndex == 0)
		{
			if(vWinCal.document.getElementById("year").selectedIndex > 0)
			{
				vWinCal.document.getElementById("month").selectedIndex = months.length-1;
				vWinCal.document.getElementById("year").selectedIndex = vWinCal.document.getElementById("year").selectedIndex -1;
				newCalendar();
			}
		}
		else if(vWinCal.document.getElementById("month").selectedIndex > 0)
		{
			vWinCal.document.getElementById("month").selectedIndex = vWinCal.document.getElementById("month").selectedIndex -1;
			newCalendar();
		}
	}
}

function gotoNext(sid)
{
	if(sid == "year")
	{
		if(vWinCal.document.getElementById("year").selectedIndex < 199)
		{
			vWinCal.document.getElementById("year").selectedIndex = vWinCal.document.getElementById("year").selectedIndex + 1;
			newCalendar();
		}
	}
	else if(sid == "month")
	{
		if(vWinCal.document.getElementById("month").selectedIndex == (months.length-1))
		{
			if(vWinCal.document.getElementById("year").selectedIndex < 199)
			{
				vWinCal.document.getElementById("month").selectedIndex = 0;
				vWinCal.document.getElementById("year").selectedIndex = vWinCal.document.getElementById("year").selectedIndex + 1;
				newCalendar();
			}
		}
		else if(vWinCal.document.getElementById("month").selectedIndex < (months.length-1))
		{
			vWinCal.document.getElementById("month").selectedIndex = vWinCal.document.getElementById("month").selectedIndex + 1;
			newCalendar();
		}
	}
}

function attachCalendar()
{
	vWinCal.document.open();
	vWinCal.document.writeln("<html>");
	vWinCal.document.writeln("<head><title>:: System :: - Calendar</title>");
	vWinCal.document.writeln("<style type='text/css'>");
	vWinCal.document.writeln("<!--");
	vWinCal.document.writeln("@import '../calender.css';");
	vWinCal.document.writeln("-->");
	vWinCal.document.writeln("</style>");
	
	vWinCal.document.writeln("</head>");
	
	vWinCal.document.writeln("<body oncontextmenu='return false;' topmargin='0' leftmargin='0'>");
	vWinCal.document.writeln("<TABLE class='tr1' border=1 cellPadding=0 cellSpacing=3 id=calendar style='DISPLAY: inline; POSITION: absolute; Z-INDEX: 4'>");
	vWinCal.document.writeln("  <TBODY>");
	vWinCal.document.writeln("  <TR>");
	vWinCal.document.writeln("    <TD colSpan=7 vAlign=center>");
	vWinCal.document.writeln("	<SELECT id=month onchange="+pp_win+".newCalendar()> ");
			// Output months into the document.
			// Select current month.
			for (var intLoop = 0; intLoop < months.length; intLoop++)
	vWinCal.document.writeln("<OPTION " +	(today.month == intLoop ? "Selected" : "") + ">" + months[intLoop] + "</OPTION>");
	vWinCal.document.writeln("	</SELECT> ");
	vWinCal.document.writeln("	<SELECT id=year onchange="+pp_win+".newCalendar()> ");
			// Output years into the document.
			// Select current year.
			for (var intLoop = 1900; intLoop < 2100; intLoop++)
	vWinCal.document.writeln(" <OPTION " + (today.year == intLoop ? "Selected" : "") + ">" + intLoop + "</OPTION>");
	vWinCal.document.writeln("	</SELECT> ");

	vWinCal.document.writeln("	</TD>");
	vWinCal.document.writeln("  </TR>");
	
	vWinCal.document.writeln("<TR>");
	vWinCal.document.writeln("<td colspan='7' align='center'><input title='Previous Year' type='button' value='<<'");
	vWinCal.document.writeln("onclick=\""+pp_win+".gotoPrev('year')\"");
	vWinCal.document.writeln(">&nbsp;&nbsp;&nbsp;");
	vWinCal.document.writeln("<input title='Previous Month' type='button' value='<'");
	vWinCal.document.writeln("onclick=\""+pp_win+".gotoPrev('month')\"");
	vWinCal.document.writeln(">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	vWinCal.document.writeln("<input title='Next Month' type='button' value='>'");
	vWinCal.document.writeln("onclick=\""+pp_win+".gotoNext('month')\"");
	vWinCal.document.writeln(">&nbsp;&nbsp;&nbsp;");
	vWinCal.document.writeln("<input title='Next Year' type='button' value='>>'");
	vWinCal.document.writeln("onclick=\""+pp_win+".gotoNext('year')\"");
	vWinCal.document.writeln("></td>");
	vWinCal.document.writeln("</TR>");
		
	vWinCal.document.writeln("  <TR class=tableSubHead>");
		// Output days.
		for (var intLoop = 0; intLoop < days.length; intLoop++)
	vWinCal.document.writeln("<TD>" + days[intLoop] + "</TD>");
	vWinCal.document.writeln("  </TR>");
	
	
	vWinCal.document.writeln("  <TBODY class=tr1 id=dayList onclick='"+pp_win+".getDate1(event)' vAlign=center>");
		for (var intWeeks = 0; intWeeks < 6; intWeeks++)
		{
	vWinCal.document.writeln("		<TR>");
			for (var intDays = 0; intDays < days.length; intDays++)
	vWinCal.document.writeln("			<TD align='center' style='cursor:pointer'></TD>");
	vWinCal.document.writeln("		</TR>");
		}
	
	vWinCal.document.writeln("  <TBODY>");
	vWinCal.document.writeln("  <TR>");
	vWinCal.document.writeln("    <TD style='cursor:pointer' class=tableSubHead colSpan=5 id=todayday onclick="+pp_win+".getTodayDay()>Today: " + (today.day + "/" + (today.month < 10 ? ("0"+(today.month+1)) : (today.month+1)) + "/" + today.year) +	" </TD>");
	vWinCal.document.writeln("    <TD align=center colSpan=2><A href='javascript:"+pp_win+".HideCalendar();'><SPAN style='COLOR: black; FONT-SIZE: 11px; cursor:hand'><B>Close</B></SPAN></A></TD>");
	vWinCal.document.writeln("  </TR>");
	vWinCal.document.writeln("  </TBODY>");
	
	vWinCal.document.writeln("</TABLE>");
	vWinCal.document.writeln("</body></html>");
	vWinCal.focus();
	vWinCal.document.close();
}
//------------------------------------------- Code of new calendar ends here --------------------------------------------------

//This is a function to clear the value in textbox when clicked on it.
var input_value = ""
var input_name = ""
function clearVal(inp_name,inp_value)
{
	if(document.getElementById(input_name))
	{
		new_value = document.getElementById(input_name).value
		if(new_value == "")
		{
			document.getElementById(input_name).value = input_value
		}
	}
	if(input_name != inp_name)
	{
		input_value = inp_value
		input_name = inp_name
	}
	document.getElementById(inp_name).value = ""
}


			//Global Envelope preparer function  S Jadhav
function envelope_send(x,empvend,y,z)
{
			//x=emp for employee cst=customer supp=supplier vend=vendor dbtr=Debitor crdtr=Creditor
			//y= enp1 for Envelope-3.875x7.125   enp2 for Envelope-3.875x8.875  enp3 for Envelope-4.125x9.5 
			//z= pre for preprint tot for total print
			//empvend for employee or vendor id
			if(empvend!="")
			{
			winMain = open("","commonenvelope","height=500,width=800,directories=no,location=no,menubar=no,minimize=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no")
			winMain.location="../multiple_employee_labelsasselmid.php?selValueno=" + empvend + "&empcust=" + x + "&labltype=" + y + "&lblprint=" + z
			
			}
			else
			{
				alert("Please send Employee/Vendor ID")	
			}
			

}		

function shw_hrflows()
{
		winMain = open("","commonenvelope","height=800,width=1100,directories=no,location=no,menubar=no,minimize=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no")
		winMain.location="payroll/contentsslider/hr_flowpresenter.php";
		
}


//--------------------------------------Code to disable right click-----------------------------------------------

/*function disableclick(e) {
	if (!e) {
        e = window.event;
	}
	if( e.button==2 ) {
		alert("Sorry Right Click has been disabled!");
		return false;
	}
	else
		return true;
}*/
/*document.onmousedown=disableclick

function disableclick(e) {

	if (!e) {

        e = window.event;

	}

	if( e.button==2 ) {

		alert("No right click, please.");

		return false;

	}

}*/

//----------------------------------------------------------------------------------------------------------------




function date_from_current(format,current,diff) 
{   //DATE provider Function from Current Date AS per Plus Minus Offset in days  S JADHAV 
	//This function provides Date from a given date with offset described by diff ... format is date separator '/' or '-'
	//Date provided shoud be in YEAR/MONTH/DAY format
if(format=='/') {	current=current.replace('-','/');	} else {		current=current.replace('/','-');			}
getdatesep=current.split(format);
theDate = new Date(parseInt(getdatesep[0]),(parseInt(getdatesep[1]-1)),(parseInt(getdatesep[2])+parseInt(diff)),0,0,0);
var newday=(theDate.getMonth()+1);
if(newday<10) {	newday="0" + newday;		} 
return (theDate.getFullYear() + "/" + newday + "/" + theDate.getDate());
}

function date_diff12(format,date1,date2)
{
	if(format=='/') {	date1=date1.replace('-','/'); date2=date2.replace('-','/');	} else {		date2=date2.replace('/','-');	date1=date1.replace('/','-');			}
	
	var getdatesep1=date1.split(format);
	var getdatesep2=date2.split(format);
	
var theDate1 = new Date(parseInt(getdatesep1[0]),(parseInt(getdatesep1[1])-1),parseInt(getdatesep1[2]),0,0,0);
var theDate2 = new Date(parseInt(getdatesep2[0]),(parseInt(getdatesep2[1])-1),parseInt(getdatesep2[2]),0,0,0);
		var theDate1ms=theDate1.getTime();
		var theDate2ms=theDate2.getTime();
		var diff = theDate2ms - theDate1ms;
		return (diff / (24 * 60 * 60 * 1000));

}


//Limited Calendars Functions  S JADHAV .........//

function newCalendar_lmt(my,stlmt) 
{
		
		
	var mysep=',';
	lmtsplt=stlmt.split(mysep);
	var mysep='-';
			
	
	//monthstart=0; monthend=months.length;
	if(lmtsplt[0]!="")
	{
	var monthslmt=lmtsplt[0].split(mysep);
	var yearslmt=lmtsplt[1].split(mysep);
	var monthstart=parseInt(monthslmt[0])-parseInt(monthslmt[1]) - 1;
	var monthend=parseInt(monthslmt[0])+parseInt(monthslmt[2]) - 1;
	if(monthstart<0) {	monthstart=0;	}
	if(monthend>11)   {	monthend=11;	}
	}
	else
	{
	var monthstart=0; var monthend=months.length-1;
	}
	
	if(lmtsplt[1]!="")
	{
	var yearslmt=lmtsplt[1].split(mysep);
	var yearstart=parseInt(yearslmt[0])-parseInt(yearslmt[1]) ;
	var yearend=parseInt(yearslmt[0])+parseInt(yearslmt[2]);
	}
	else
	{
	var yearstart=1900; var yearend=2099;
	}
	
	
	if(lmtsplt[2]!="")
	{
	var weekslmt=lmtsplt[2].split(mysep);
	}
	else
	{
	weekdys="0-1-2-3-4-5-6-7"
	var weekslmt=weekdys.split(mysep);	
	}
	
	if(lmtsplt[3]!="")
	{
	var dayshow=lmtsplt[3].split(mysep);
	}
	else
	{
	dayshow1=""
	var dayshow=dayshow1.split(mysep);	
	}


	var weeklenth=weekslmt.length
	var daylenth=dayshow.length

	
    var datefirst=""; var datelast="";
	if(lmtsplt[4]!="")
	{
	var dateslmt=lmtsplt[4].split(mysep);
	dateslmt[0]=dateslmt[0].replace('-','/');
	var datefirst=(date_from_current("/",dateslmt[0],-dateslmt[1]));
	var datelast=(date_from_current("/",dateslmt[0],dateslmt[2]));
	yearstart=parseInt(dtfsplt[0]);	yearend=parseInt(dtlsplt[0]);
			var yearseld=parseInt(vWinCal.document.getElementById("seldyr").value);
			if(yearstart==yearend) {	monthstart=parseInt(dtfsplt[1]-1); monthend=parseInt(dtlsplt[1])-1;		}
			else {		
					if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearstart)
					{
						monthstart=parseInt(dtfsplt[1]-1); monthend=11;	
					}
					else if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearend)
					{
						monthstart=0; monthend=parseInt(dtlsplt[1])-1;	
					}
					else
					{
						monthstart=0; monthend=11;	
					}
				
				}
	}
	
	

	//-----ENDS----

		
		//vWinCal.document.getElementById("month").selectedIndex 
		//vWinCal.document.getElementById("year").selectedIndex 
		var prevmonth1=parseInt(vWinCal.document.getElementById("seldmnt").value);
		
		if(my=='m') 
		{ 
			var stmon=monthstart;
			var randval=0;
			while(stmon<=monthend) 
			{	
			if(randval== vWinCal.document.getElementById("month").selectedIndex) 
			{	vWinCal.document.getElementById("seldmnt").value=stmon;	 break;		}
			else {	randval++; stmon++; }
			}
			
			
				vWinCal.document.getElementById("seldmntindx").value=randval;	
		} 
	else if(my=='y') 
	    { 
			var stmon=yearstart;
			var randval=0;
			while(stmon<=yearend) 
			{	
			if(randval== vWinCal.document.getElementById("year").selectedIndex) 
			{	vWinCal.document.getElementById("seldyr").value=stmon;	 break;		}
			else {	randval++; stmon++; }
			}
		
	vWinCal.document.getElementById("seldyrindx").value=randval;
	
	if((datefirst!="")&&(datelast!=""))
	{
		dtfsplt=datefirst.split('/');	dtlsplt=datelast.split('/');
		yearstart=parseInt(dtfsplt[0]);	yearend=parseInt(dtlsplt[0]);
		//alert(vWinCal.document.getElementById("month").selectedIndex + " " + (vWinCal.document.getElementById("month").length-1))
		var yearseld=parseInt(vWinCal.document.getElementById("seldyr").value);

			if(yearstart==yearend) {	monthstart=parseInt(dtfsplt[1]-1); monthend=parseInt(dtlsplt[1])-1;		}
			else {		
					if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearstart)
					{
						monthstart=parseInt(dtfsplt[1]-1); monthend=11;	
					}
					else if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearend)
					{
						monthstart=0; monthend=parseInt(dtlsplt[1])-1;	
					}
					else
					{
						monthstart=0; monthend=11;	
					}
				
				}
		

		var monthchnger="<SELECT id=month onchange="+pp_win+".newCalendar_lmt('m','" + stlmt + "')> ";
		var gotit="No";
		for (var intLoop = monthstart; intLoop <= monthend; intLoop++)
		if(months[prevmonth1] == months[intLoop])
		{
		var newindx=intLoop;
		gotit="Yes";
		monthchnger+="<OPTION " + (prevmonth1 == intLoop ? "Selected" : "") + ">" + months[intLoop] + "</OPTION>";
		}
		else
		{
		monthchnger+="<OPTION >" + months[intLoop] + "</OPTION>";
		}
		monthchnger+="</SELECT>";
		vWinCal.document.getElementById('monthing').innerHTML=monthchnger

		if(gotit=="Yes")
		{
		vWinCal.document.getElementById("seldmnt").value=newindx;
		vWinCal.document.getElementById("seldmntindx").value=newindx;
		}
		else
		{
		vWinCal.document.getElementById("seldmnt").value=monthstart;
		vWinCal.document.getElementById("seldmntindx").value=0;
		}
	}

		///vWinCal.document.getElementById("seldmntindx").value=0;	

		}
	
	//alert(vWinCal.document.getElementById("seldmnt").value + " " + vWinCal.document.getElementById("seldyr").value)
	
	//var parseYear = parseInt(vWinCal.document.getElementById("year")  [vWinCal.document.getElementById("year").selectedIndex].text);
	//var parseMonth = vWinCal.document.getElementById("month").selectedIndex

	parseYear=vWinCal.document.getElementById("seldyr").value;
	parseMonth=vWinCal.document.getElementById("seldmnt").value;
	
	
	
	var newCal = new Date(parseYear , parseMonth , 1);
	var day = -1;
	var startDay = newCal.getDay();
	var daily = 0; 

	today = new getToday(); // 1st call
	if ((today.year == newCal.getFullYear() ) &&   (today.month == newCal.getMonth()))
	   day = today.day;
	// Cache the calendar table's tBody section, dayList.
	var tableCal = vWinCal.document.getElementById("calendar").tBodies.dayList;

	var intDaysInMonth =
	   getDays(newCal.getMonth(), newCal.getFullYear() );

	for (var intWeek = 0; intWeek < tableCal.rows.length;  intWeek++)
	{
		var gt=1;
		for (var intDay = 0;	 intDay < tableCal.rows[intWeek].cells.length;	 intDay++)
		{
			var cell = tableCal.rows[intWeek].cells[intDay];
			
			// Start counting days.
			if ((intDay == startDay) && (0 == daily))
				daily = 1;
			// Highlight the current day.
			cell.style.color = (day == daily) ? "red" : "";
			if(day == daily)
			{
				if(day<10)
					dt="0"+day;
				else
					dt=day;
				mn=newCal.getMonth()+1;
				if(mn<10)
					mn = "0"+mn;
				if(vWinCal.document.all) // if browser is other than firefox
					vWinCal.document.getElementById("todayday").innerText= "Today: " +  dt + "/" + (mn) + "/" + newCal.getFullYear() ;
				else // browser is other than firefox
					vWinCal.document.getElementById("todayday").textContent= "Today: " +  dt + "/" + (mn) + "/" + newCal.getFullYear() ;
			}

			// Output the day number into the cell.
			if ((daily > 0) && (daily <= intDaysInMonth))
			{
				var isweek="No";
				for(var tw=0;tw<weeklenth;tw++)    {	if(weekslmt[tw]==gt) {   isweek="Yes";  break; }	}
				var isday="Yes";
				for(var tw=0;tw<daylenth;tw++) {	if(dayshow[tw]==daily) {   isday="No";  break; }	}	

				var frstdt1 = new Date(parseYear , parseMonth ,  daily);
				frstdt=frstdt1.getTime();
			    var expld11 = new Array();
				expld11=  datefirst.split("/");
				var expld12 = new Array();
				expld12 =datelast.split("/");
			    var ckdtf1 =  new Date(expld11[0],parseInt(expld11[1]-1),expld11[2],0,0,0,0);
				ckdtf=ckdtf1.getTime();
				var ckdtt1 =  new Date(expld12[0],parseInt(expld12[1]-1),expld12[2],0,0,0,0);
				ckdtt=ckdtt1.getTime();
				
							
				
				cell.title=daily + "/" + (parseInt(parseMonth)+1) + "/" + parseYear;
				
				
				
				if(vWinCal.document.all)
				{
					if(isweek=="Yes")   {				
							if(isday=="Yes") { 
						
				if((datefirst=="")||(datelast=="")) { cell.innerText = daily++; }
				else {  if((frstdt>=ckdtf)&&(frstdt<=ckdtt)) { cell.innerText = daily++; } else { cell.innerText = '-'; daily++; cell.style.color = (isday=="No") ? "red" : ""; cell.title=cell.title + "\n" + "Out Of Range"; } }
							
							} else { cell.innerText = 'x'; daily++; cell.style.color =  (isday=="No") ? "red" : ""; cell.title=cell.title + "\n" + "Date Not Allowed"; }
										} 
					else 				{ 
					cell.innerText = 'x'; daily++;  cell.style.color =  (isday=="No") ? "red" : ""; cell.title=cell.title + "\n" + "Week Not Allowed"; 
					     				}
				
				
				}
				else
				{
					if(isweek=="Yes") {		
							if(isday=="Yes") { 
							
				if((datefirst=="")||(datelast=="")) { cell.textContent = daily++; }
				else {  if((frstdt>=ckdtf)&&(frstdt<=ckdtt)) { cell.textContent = daily++;  } else { cell.textContent = '-'; daily++; cell.style.color =  (isday=="No") ? "red" : ""; cell.title=cell.title + "\n" + "Out Of Range" } }
							
							} else { cell.textContent = 'x'; daily++; cell.style.color =  (isday=="No") ? "red" : ""; cell.title=cell.title + "\n" + "Date Not Allowed"; }
									  } 
					else 			  { 
					cell.textContent = 'x'; daily++;  cell.style.color =  (isday=="No") ? "red" : "";  cell.title=cell.title + "\n" + "Week Not Allowed";
									  }
				}
			}
			else
			{
				if(vWinCal.document.all)
					cell.innerText = "";
				else
					cell.textContent = "";
			}
	   			 gt++;
	   }
	}
}

//---------------//


function getDate1_lmt(evt) 
{
	// This code executes when the user clicks on a day
	// in the calendar.
	var e = evt ? evt : window.evt;
	var srcElement = e.srcElement ? e.srcElement : e.target;
	
	if ("TD" == srcElement.tagName)
	{
		// Test whether day is valid.
		if(vWinCal.document.all)
			val = srcElement.innerText;
		else
			val = srcElement.textContent;
	}
	if ("" != val)
	{ 
		//var mn =  vWinCal.document.getElementById("month").selectedIndex+1;
		var mn =parseInt(vWinCal.document.getElementById("seldmnt").value) + 1;
		if(mn < 10)
			mn = "0" + mn;
		if(vWinCal.document.all)
			var dt = srcElement.innerText;
		else
			var dt = srcElement.textContent;
		if(dt < 10)
			dt = "0" + dt;
		//var Year = vWinCal.document.getElementById("year") [vWinCal.document.getElementById("year").selectedIndex].text;
		var Year =vWinCal.document.getElementById("seldyr").value;
		
		
		if(dt!='x')
		{
					document.getElementById(element_id).value= dt +"/"+ mn +"/"+ Year;
					document.getElementById(hid_element_id).value= Year +"/"+ mn +"/"+ dt;
					document.getElementById(element_id).focus();
					curyrindex=parseInt(Year)-1900;
					vWinCal.document.getElementById("month").selectedIndex=vWinCal.document.getElementById("seldmntindx").value
					vWinCal.document.getElementById("year").selectedIndex=vWinCal.document.getElementById("seldyrindx").value
					HideCalendar()
		}
	}
}

//-----------------//


function ShowCalendar_lmt(elem_name,hid_elem_name,stlmt)
{

	if (elem_name=="")
	{
		elem_name = element_id;
		hid_elem_name = hid_element_id;
	}
	element_id	= elem_name; // element_id is global variable
	if(!hid_elem_name)
		hid_element_id = "hid" + elem_name
	else
		hid_element_id	= hid_elem_name; // hid_element_id is global variable

	var diffX = document.body.scrollWidth - findPosX(document.getElementById(elem_name))
	if(diffX <= 200)
	{
		diffX = 200 - diffX
		diffX = findPosX(document.getElementById(elem_name)) - diffX
		if(diffX<0)
		{
			n_win = true;
		}
	}
	else
	{
		diffX = findPosX(document.getElementById(elem_name))
	}

	var diffY = document.body.scrollHeight - findPosY(document.getElementById(elem_name))
	if(diffY <= 210)
	{
		diffY = 210 - diffY
		diffY = findPosY(document.getElementById(elem_name)) - diffY
		if(diffY<0)
		{
			n_win = true;
		}
	}
	else
	{
		diffY = findPosY(document.getElementById(elem_name)) + 20
	}

	var parseYear = parseInt(document.getElementById(elem_name).value.substr(document.getElementById(elem_name).value.lastIndexOf("/")+1))-1900
	var parseMonth = Math.round(document.getElementById(elem_name).value.substr(parseInt(document.getElementById(elem_name).value.indexOf("/"))+1,2))-1

				
	if(n_win)
	{
		vWinCal = window.open("about:blank","win11","toolbar=no,directories=no,resize=no,menubar=no,location=no,scrollbars=no,width=189,height=200,maximise=null")
		pp_win = "window.opener";
	
		attachCalendar_lmt(stlmt,elem_name)

		if(document.getElementById(elem_name).value != "")
		{
			parseYear=vWinCal.document.getElementById("seldyrindx").value; parseMonth=vWinCal.document.getElementById("seldmntindx").value;	
			vWinCal.document.getElementById("year").selectedIndex = parseYear;
			vWinCal.document.getElementById("month").selectedIndex = parseMonth;
		}
		newCalendar_lmt('ZZ',stlmt);
	}
	else
	{
		vWinCal = window.frame_Date
		pp_win = "window.parent";
		
		attachCalendar_lmt(stlmt,elem_name)

		if(document.getElementById(elem_name).value != "")
		{
						parseYear=vWinCal.document.getElementById("seldyrindx").value; parseMonth=vWinCal.document.getElementById("seldmntindx").value;	

			vWinCal.document.getElementById("year").selectedIndex = parseYear;
			vWinCal.document.getElementById("month").selectedIndex = parseMonth;
		}
		newCalendar_lmt('XX',stlmt);
		//vWinCal.document.getElementById("calendar").style.display="inline";
		SetCalendarOnElement(element_id);
		document.getElementById("divDate").style.display = "";
	}
}


//--------------//

function selectDate_lmt(elem_name,hid_elem_name,stlmt)
{

var finyr=for_java_financial_year;

		var finyr=for_java_financial_year;
		var finyr=for_java_financial_year;
		var dt1= (parseInt(finyr)-1) + '/04/01';
		var dt2= parseInt(finyr) + '/03/31';
		
		var diff=date_diff12("/",dt1,dt2)
		
if(!stlmt) 	{	stlmt=',,,,' + (parseInt(finyr)-1) + '/04/01-0-' + diff }
else {	if(stlmt=="-") { 		stlmt=",,,,,"; 	}			}
			
	if(vWinCal) HideCalendar()
	//ShowCalendar(elem_name,hid_elem_name);
	ShowCalendar_lmt(elem_name,hid_elem_name,stlmt);
}

//--------------//


function gotoPrev_lmt(sid,stlmt)
{
	
	var mysep=',';
	lmtsplt=stlmt.split(mysep);
	var mysep='-';
			
	
	//monthstart=0; monthend=months.length;
	if(lmtsplt[0]!="")
	{
	var monthslmt=lmtsplt[0].split(mysep);
	var yearslmt=lmtsplt[1].split(mysep);
	var monthstart=parseInt(monthslmt[0])-parseInt(monthslmt[1]) - 1;
	var monthend=parseInt(monthslmt[0])+parseInt(monthslmt[2]) - 1;
	if(monthstart<0) {	monthstart=0;	}
	if(monthend>11)   {	monthend=11;	}
	}
	else
	{
	var monthstart=0; var monthend=months.length-1;
	}
	
	if(lmtsplt[1]!="")
	{
	var yearslmt=lmtsplt[1].split(mysep);
	var yearstart=parseInt(yearslmt[0])-parseInt(yearslmt[1]) ;
	var yearend=parseInt(yearslmt[0])+parseInt(yearslmt[2]);
	}
	else
	{
	var yearstart=1900; var yearend=2099;
	}
	
	
	if(lmtsplt[2]!="")
	{
	var weekslmt=lmtsplt[2].split(mysep);
	}
	else
	{
	weekdys="0-1-2-3-4-5-6-7"
	var weekslmt=weekdys.split(mysep);	
	}

	var weeklenth=weekslmt.length


	
		var datefirst=""; var datelast="";
	if(lmtsplt[4]!="")
	{
	var dateslmt=lmtsplt[4].split(mysep);
	dateslmt[0]=dateslmt[0].replace('-','/');
	var datefirst=(date_from_current("/",dateslmt[0],-dateslmt[1]));
	var datelast=(date_from_current("/",dateslmt[0],dateslmt[2]));
	}
	
	
	if((datefirst!="")&&(datelast!=""))
	{
		dtfsplt=datefirst.split('/');	dtlsplt=datelast.split('/');
		yearstart=parseInt(dtfsplt[0]);	yearend=parseInt(dtlsplt[0]);
		//alert(vWinCal.document.getElementById("month").selectedIndex + " " + (vWinCal.document.getElementById("month").length-1))
		var yearseld=parseInt(vWinCal.document.getElementById("seldyr").value);

		if((sid == "year")||(parseInt(vWinCal.document.getElementById("month").selectedIndex)==0))
		{
		if((parseInt(vWinCal.document.getElementById("seldyr").value)-1)>=yearstart)
			{
		vWinCal.document.getElementById("seldyr").value=parseInt(vWinCal.document.getElementById("seldyr").value)-1;
		vWinCal.document.getElementById("seldyrindx").value=parseInt(vWinCal.document.getElementById("seldyrindx").value)-1;
		vWinCal.document.getElementById("year").selectedIndex =parseInt(vWinCal.document.getElementById("year").selectedIndex) - 1;
			}
		}	
			
			if(yearstart==yearend) {	monthstart=parseInt(dtfsplt[1]-1); monthend=parseInt(dtlsplt[1])-1;		}
			else {		
					if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearstart)
					{
						monthstart=parseInt(dtfsplt[1]-1); monthend=11;	
					}
					else if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearend)
					{
						monthstart=0; monthend=parseInt(dtlsplt[1])-1;	
					}
					else
					{
						monthstart=0; monthend=11;	
					}
				
				}
		
			
		
	var monthseld=parseInt(vWinCal.document.getElementById("month").selectedIndex);

if(sid == "month")
	{ 
	if(monthseld==0)
	{
		if(parseInt(vWinCal.document.getElementById("seldyr").value)!=yearstart)
		{
		vWinCal.document.getElementById("seldmnt").value=parseInt(monthend)	
		}
		//vWinCal.document.getElementById("seldmntindx").value=0;	
	}
	else
	{
		if((yearseld !=yearstart)||((yearseld ==yearstart)&&(parseInt(vWinCal.document.getElementById("seldmnt").value)-1)>=monthstart))
		{
		vWinCal.document.getElementById("seldmnt").value=parseInt(vWinCal.document.getElementById("seldmnt").value)-1;	
		vWinCal.document.getElementById("seldmntindx").value=parseInt(monthseld)-1;	
		}
	}
	}
		
		var monthchnger="<SELECT id=month onchange="+pp_win+".newCalendar_lmt('m','" + stlmt + "')> ";
		for (var intLoop = monthstart; intLoop <= monthend; intLoop++)
		monthchnger+="<OPTION " + (vWinCal.document.getElementById("seldmntindx").value == intLoop ? "Selected" : "") + ">" + months[intLoop] + "</OPTION>";
		monthchnger+="</SELECT>";
		vWinCal.document.getElementById('monthing').innerHTML=monthchnger
		
	if((monthseld==0)||(sid == "year"))
	{
		
		if(parseInt(yearseld) != parseInt(yearstart))
		{
		vWinCal.document.getElementById("seldmnt").value=parseInt(monthend)	
		vWinCal.document.getElementById("seldmntindx").value=parseInt(vWinCal.document.getElementById("month").length)-1;
		vWinCal.document.getElementById("month").selectedIndex=parseInt(vWinCal.document.getElementById("month").length)-1;
		}
		else
		{
			vWinCal.document.getElementById("month").selectedIndex=vWinCal.document.getElementById("seldmntindx").value;
		}
	}
	else
	{
		vWinCal.document.getElementById("month").selectedIndex=vWinCal.document.getElementById("seldmntindx").value;
	}
		newCalendar_lmt('QQ',stlmt);
	}
	//-----ENDS----

	
		//alert(monthstart + " " + monthend + " " +  yearstart + " " + yearend)

	var bkyer=vWinCal.document.getElementById("seldyr").value
	var bkmnt=vWinCal.document.getElementById("seldmnt").value
	
if((datefirst=="")||(datelast==""))
{
	if(sid == "year")
	{
		
		//if(vWinCal.document.getElementById("year").selectedIndex > 0)
		{
			if((parseInt(bkyer)-1) >= yearstart )
			{
			vWinCal.document.getElementById("year").selectedIndex = vWinCal.document.getElementById("year").selectedIndex -1;
			vWinCal.document.getElementById("seldyr").value = (parseInt(bkyer)-1);
			vWinCal.document.getElementById("seldyrindx").value=parseInt(vWinCal.document.getElementById("seldyrindx").value)-1;

			newCalendar_lmt('CC',stlmt);
			}

			else
			{
			alert('YEAR SELETION IS LIMITED TO MINIMUM ' + yearstart)
			}
			
		}
	}
	else if(sid == "month")
	{
		
		if(parseInt(bkmnt)== monthstart)
		{
			
			if((parseInt(bkyer)-1)>= yearstart )
			{
				vWinCal.document.getElementById("month").selectedIndex = (monthend - monthstart);
				vWinCal.document.getElementById("year").selectedIndex = vWinCal.document.getElementById("year").selectedIndex -1;
				vWinCal.document.getElementById("seldyr").value = (parseInt(bkyer)-1);
				vWinCal.document.getElementById("seldyrindx").value=parseInt(vWinCal.document.getElementById("seldyrindx").value)-1;
				vWinCal.document.getElementById("seldmnt").value = monthend;
				vWinCal.document.getElementById("seldmntindx").value=parseInt(vWinCal.document.getElementById("month").length)-1;
				newCalendar_lmt('BB',stlmt);
				
			}
			else
			{
			 	alert('YEAR SELETION IS LIMITED2 TO MINIMUM ' + yearstart)	
			}
		}
		else if(vWinCal.document.getElementById("month").selectedIndex > 0)
		{
			if((parseInt(bkmnt)-1) >= monthstart )
			{
			vWinCal.document.getElementById("month").selectedIndex = vWinCal.document.getElementById("month").selectedIndex -1;
			vWinCal.document.getElementById("seldmnt").value = (parseInt(bkmnt)-1);
			vWinCal.document.getElementById("seldmntindx").value=parseInt(vWinCal.document.getElementById("seldmntindx").value)-1;
			newCalendar_lmt('SS',stlmt);
			}
			else
			{
			 alert('MONTH SELETION IS LIMITED TO MINIMUM ' + monthstart)		
			}
		}
	}
 }
}

//----------//


function gotoNext_lmt(sid,stlmt)
{
	
	//alert(stlmt)
	var mysep=',';
	lmtsplt=stlmt.split(mysep);
	var mysep='-';
			
	
	//monthstart=0; monthend=months.length;
	if(lmtsplt[0]!="")
	{
	var monthslmt=lmtsplt[0].split(mysep);
	var yearslmt=lmtsplt[1].split(mysep);
	var monthstart=parseInt(monthslmt[0])-parseInt(monthslmt[1]) - 1;
	var monthend=parseInt(monthslmt[0])+parseInt(monthslmt[2]) - 1;
	if(monthstart<0) {	monthstart=0;	}
	if(monthend>11)   {	monthend=11;	}
	}
	else
	{
	var monthstart=0; var monthend=months.length-1;
	}
	
	if(lmtsplt[1]!="")
	{
	var yearslmt=lmtsplt[1].split(mysep);
	var yearstart=parseInt(yearslmt[0])-parseInt(yearslmt[1]) ;
	var yearend=parseInt(yearslmt[0])+parseInt(yearslmt[2]);
	}
	else
	{
	var yearstart=1900; var yearend=2099;
	}
	
	
	if(lmtsplt[2]!="")
	{
	var weekslmt=lmtsplt[2].split(mysep);
	}
	else
	{
	weekdys="0-1-2-3-4-5-6-7"
	var weekslmt=weekdys.split(mysep);	
	}

	var weeklenth=weekslmt.length

	
	var datefirst=""; var datelast="";
	if(lmtsplt[4]!="")
	{
	var dateslmt=lmtsplt[4].split(mysep);
	dateslmt[0]=dateslmt[0].replace('-','/');
	var datefirst=(date_from_current("/",dateslmt[0],-dateslmt[1]));
	var datelast=(date_from_current("/",dateslmt[0],dateslmt[2]));
	}
	
	
	if((datefirst!="")&&(datelast!=""))
	{
		dtfsplt=datefirst.split('/');	dtlsplt=datelast.split('/');
		yearstart=parseInt(dtfsplt[0]);	yearend=parseInt(dtlsplt[0]);
		//alert(vWinCal.document.getElementById("month").selectedIndex + " " + (vWinCal.document.getElementById("month").length-1))
		var yearseld=parseInt(vWinCal.document.getElementById("seldyr").value);

		if((sid == "year")||(parseInt(vWinCal.document.getElementById("month").selectedIndex)==(parseInt(vWinCal.document.getElementById("month").length)-1)))
		{
		if((parseInt(vWinCal.document.getElementById("seldyr").value)+1)<=yearend)
			{
		vWinCal.document.getElementById("seldyr").value=parseInt(vWinCal.document.getElementById("seldyr").value)+1;
		vWinCal.document.getElementById("seldyrindx").value=parseInt(vWinCal.document.getElementById("seldyrindx").value)+1;
		vWinCal.document.getElementById("year").selectedIndex =parseInt(vWinCal.document.getElementById("year").selectedIndex) + 1;
			}
		}	
			
			if(yearstart==yearend) {	monthstart=parseInt(dtfsplt[1]-1); monthend=parseInt(dtlsplt[1])-1;		}
			else {		
					if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearend)
					{
						monthstart=0; monthend=parseInt(dtlsplt[1])-1;	
					}
					else if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearstart)
					{
						monthstart=parseInt(dtfsplt[1]-1); monthend=11;	
					}
					else
					{
						monthstart=0; monthend=11;	
					}
				
				}
		
	var monthseld=parseInt(vWinCal.document.getElementById("month").selectedIndex);
	if(sid == "month")
	{

	if(monthseld==(parseInt(vWinCal.document.getElementById("month").length)-1))
	{
		vWinCal.document.getElementById("seldmnt").value=monthstart	
		vWinCal.document.getElementById("seldmntindx").value=0;	
	}
	else
	{
		vWinCal.document.getElementById("seldmnt").value=parseInt(vWinCal.document.getElementById("seldmnt").value)+1;	
		vWinCal.document.getElementById("seldmntindx").value=parseInt(monthseld)+1;	
	}
		
	}
		var monthchnger="<SELECT id=month onchange="+pp_win+".newCalendar_lmt('m','" + stlmt + "')> ";
		for (var intLoop = monthstart; intLoop <= monthend; intLoop++)
		monthchnger+="<OPTION >" + months[intLoop] + "</OPTION>";
		monthchnger+="</SELECT>";
		vWinCal.document.getElementById('monthing').innerHTML=monthchnger
		if(sid == "year")
		{
				
				if((monthseld!=0)&&(yearseld==yearend))
				{
				vWinCal.document.getElementById("month").selectedIndex =monthseld;
				}
				else
				{
				vWinCal.document.getElementById("seldmnt").value=monthstart	
				vWinCal.document.getElementById("seldmntindx").value=0;	
				vWinCal.document.getElementById("month").selectedIndex =0;
				vWinCal.document.getElementById("seldmntindx").value
				}
			
		}
		else
		{
		vWinCal.document.getElementById("month").selectedIndex=	vWinCal.document.getElementById("seldmntindx").value
		}

		newCalendar_lmt('QQ',stlmt);
	}

	
	//-----ENDS----

		//alert(monthstart + " " + monthend + " " +  yearstart + " " + yearend)

	var bkyer=vWinCal.document.getElementById("seldyr").value
	var bkmnt=vWinCal.document.getElementById("seldmnt").value

if((datefirst=="")||(datelast==""))
{
		
	if(sid == "year")
	{
		//if(vWinCal.document.getElementById("year").selectedIndex < 199)
		{
			if((parseInt(bkyer)+1) <= yearend )
			{
			vWinCal.document.getElementById("year").selectedIndex = vWinCal.document.getElementById("year").selectedIndex + 1;
			vWinCal.document.getElementById("seldyr").value=(parseInt(bkyer)+1)
			vWinCal.document.getElementById("seldyrindx").value=parseInt(vWinCal.document.getElementById("seldyrindx").value)+1;
			}
			else
			{
			alert('YEAR SELETION IS LIMITED TO MAXIMUM ' + yearend)	
			}
			newCalendar_lmt('AA',stlmt);
		}
	}
	else if(sid == "month")
	{
		if(parseInt(bkmnt)== monthend)
		{
			if((parseInt(bkyer)+1)<= yearend )
			{
				
				vWinCal.document.getElementById("month").selectedIndex = 0;
				vWinCal.document.getElementById("year").selectedIndex = vWinCal.document.getElementById("year").selectedIndex + 1;
				vWinCal.document.getElementById("seldyr").value = (parseInt(bkyer)+1);
				vWinCal.document.getElementById("seldyrindx").value=parseInt(vWinCal.document.getElementById("seldyrindx").value)+1;
				vWinCal.document.getElementById("seldmnt").value = monthstart;
				vWinCal.document.getElementById("seldmntindx").value=0;
				newCalendar_lmt('QQ',stlmt);
				
			}
			else
			{
				alert('YEAR SELETION IS LIMITED TO MAXIMUM ' + yearend)		
			}
		}
		else if(vWinCal.document.getElementById("month").selectedIndex < (months.length-1))
		{
			if((parseInt(bkmnt)+1) <= monthend )
			{
			vWinCal.document.getElementById("month").selectedIndex = vWinCal.document.getElementById("month").selectedIndex + 1;
			vWinCal.document.getElementById("seldmnt").value = (parseInt(bkmnt)+1);
			vWinCal.document.getElementById("seldmntindx").value=vWinCal.document.getElementById("seldmntindx").value+1;
			newCalendar_lmt('EE',stlmt);
			}
			else
			{
				alert('MONTH SELETION IS LIMITED TO MAXIMUM ' + monthend)			
			}
		}
	}
	
	}
}

//-------------//

//-------------//

function attachCalendar_lmt(stlmt,elem_name)
{
	
	vWinCal.document.open();
	vWinCal.document.writeln("<html>");
	vWinCal.document.writeln("<head><title>:: System :: - Calendar</title>");
	vWinCal.document.writeln("<style type='text/css'>");
	vWinCal.document.writeln("<!--");
	vWinCal.document.writeln("@import '../calender.css';");
	vWinCal.document.writeln("-->");
	vWinCal.document.writeln("</style>");
	
	vWinCal.document.writeln("</head>");
	vWinCal.document.writeln("<body oncontextmenu='return false;' topmargin='0' leftmargin='0'>");
	vWinCal.document.writeln("<form>");
	vWinCal.document.writeln("<TABLE class='tr1' border=1 cellPadding=0 cellSpacing=3 id=calendar style='DISPLAY: inline; POSITION: absolute; Z-INDEX: 4' >");
	vWinCal.document.writeln("  <TBODY>");
	vWinCal.document.writeln("  <TR>");
	vWinCal.document.writeln("    <TD colSpan=7 vAlign=center >");
	
	
	var mysep=',';
	lmtsplt=stlmt.split(mysep);
	var mysep='-';
			
	
	//monthstart=0; monthend=months.length;
	if(lmtsplt[0]!="")
	{
	var monthslmt=lmtsplt[0].split(mysep);
	var yearslmt=lmtsplt[1].split(mysep);
	var monthstart=parseInt(monthslmt[0])-parseInt(monthslmt[1]) - 1;
	var monthend=parseInt(monthslmt[0])+parseInt(monthslmt[2]) - 1;
	if(monthstart<0) {	monthstart=0;	}
	if(monthend>11)   {	monthend=11;	}
	}
	else
	{
	var monthstart=0; var monthend=months.length-1;
	}
	
	if(lmtsplt[1]!="")
	{
	var yearslmt=lmtsplt[1].split(mysep);
	var yearstart=parseInt(yearslmt[0])-parseInt(yearslmt[1]) ;
	var yearend=parseInt(yearslmt[0])+parseInt(yearslmt[2]);
	}
	else
	{
	var yearstart=1900; var yearend=2099;
	}
	
	
	if(lmtsplt[2]!="")
	{
	var weekslmt=lmtsplt[2].split(mysep);
	}
	else
	{
	weekdys="0-1-2-3-4-5-6-7"
	var weekslmt=weekdys.split(mysep);	
	}

	var weeklenth=weekslmt.length
	
	
	
	var datefirst=""; var datelast="";
	if(lmtsplt[4]!="")
	{
	var dateslmt=lmtsplt[4].split(mysep);
	dateslmt[0]=dateslmt[0].replace('-','/');
	var datefirst=(date_from_current("/",dateslmt[0],-dateslmt[1]));
	var datelast=(date_from_current("/",dateslmt[0],dateslmt[2]));
	}
	
	
	if((datefirst!="")&&(datelast!=""))
	{
		dtfsplt=datefirst.split('/');	dtlsplt=datelast.split('/');
		yearstart=parseInt(dtfsplt[0]);	yearend=parseInt(dtlsplt[0]);
		if(yearstart==yearend) {	monthstart=parseInt(dtfsplt[1]-1); monthend=parseInt(dtlsplt[1]-1);		}
		else {		monthstart=parseInt(dtfsplt[1]-1); monthend=11;		}
	}

	
	//-----ENDS----
	
	
	//vWinCal.document.writeln("    <TD colSpan=7 vAlign=center>");
	
			// Output months into the document.
			// Select current month.
	vWinCal.document.writeln('<input name="seldyr" id="seldyr" type="hidden" value="' + yearstart + '">');
	vWinCal.document.writeln('<input name="seldmnt" id="seldmnt" type="hidden" value="' + monthstart + '">');
	vWinCal.document.writeln('<input name="seldyrindx" id="seldyrindx" type="hidden" value="' + '0' + '">');
	vWinCal.document.writeln('<input name="seldmntindx" id="seldmntindx" type="hidden" value="' + '0' + '">');

	var already=(document.getElementById(elem_name).value);
	if(already!="")
	{
		var alreadysp=already.split('/');
		var currmonth=parseInt(alreadysp[1]-1);
		var curryear=alreadysp[2];
	}
	else
	{
		var currmonth=today.month;
		var curryear=today.year;
	}
	
	
	if((curryear>=yearstart)&&(curryear<=yearend))
	{
		
		vWinCal.document.getElementById("seldyr").value=curryear;
	
	var gotinx=0;
	for(var inx=yearstart;inx<=yearend;inx++) {	if(curryear==inx)	{	vWinCal.document.getElementById("seldyrindx").value=gotinx; }	gotinx++; }

		
	if((datefirst!="")&&(datelast!=""))
	{

		if(yearstart==yearend) {	monthstart=parseInt(dtfsplt[1]-1); monthend=parseInt(dtlsplt[1]-1);		}
		else {		
				if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearend)
				{
					monthstart=0; monthend=parseInt(dtlsplt[1]-1);	
				}
				else if((parseInt(vWinCal.document.getElementById("seldyr").value))==yearstart)
				{
					monthstart=parseInt(dtfsplt[1]-1); monthend=11;
				}
				else
				{
					monthstart=0; monthend=11;	
				}
			
			}
	}
		
			
		if((currmonth>=monthstart)&&(currmonth<=monthend))
		{

		vWinCal.document.getElementById("seldmnt").value=currmonth
	var gotinx=0;
	for(var inx=monthstart;inx<=monthend;inx++) {	if(currmonth==inx)	{	vWinCal.document.getElementById("seldmntindx").value=gotinx; break; }	gotinx++; }
		}
		else
		{
		var gotinx=0;
		vWinCal.document.getElementById("seldmnt").value=monthstart	
		vWinCal.document.getElementById("seldmntindx").value=0;	
		}
	
}
else
{
			curryear=yearstart;	
			vWinCal.document.getElementById("seldyr").value=curryear;
			vWinCal.document.getElementById("seldyrindx").value=0;
}

	
	vWinCal.document.writeln("<label id='monthing' ><SELECT id=month onchange="+pp_win+".newCalendar_lmt('m','" + stlmt + "') > ");
	for (var intLoop = monthstart; intLoop <= monthend; intLoop++)
	vWinCal.document.writeln("<OPTION >" + months[intLoop] + "</OPTION>");
	vWinCal.document.writeln("	</SELECT></label>");
	vWinCal.document.getElementById("month").selectedIndex=gotinx;
			// Output years into the document.
			// Select current year.
	
	vWinCal.document.writeln("	<SELECT id=year onchange="+pp_win+".newCalendar_lmt('y','" + stlmt + "')> ");
	for (var intLoop = yearstart; intLoop <= yearend; intLoop++)
	vWinCal.document.writeln(" <OPTION >" + intLoop + "</OPTION>");
	vWinCal.document.writeln("	</SELECT>");
	vWinCal.document.getElementById("year").selectedIndex=vWinCal.document.getElementById("seldyrindx").value;

	vWinCal.document.writeln("	</TD>");
	vWinCal.document.writeln("  </TR>");
	
	vWinCal.document.writeln("<TR>");
	vWinCal.document.writeln("<td colspan='7' align='center' ><input title='Previous Year' type='button' value='<<'");
	vWinCal.document.writeln("onclick=\""+pp_win+".gotoPrev_lmt('year','" + stlmt + "')\"");
	vWinCal.document.writeln(">&nbsp;&nbsp;&nbsp;");
	vWinCal.document.writeln("<input title='Previous Month' type='button' value='<'");
	vWinCal.document.writeln("onclick=\""+pp_win+".gotoPrev_lmt('month','" + stlmt + "')\"");
	vWinCal.document.writeln(">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	vWinCal.document.writeln("<input title='Next Month' type='button' value='>'");
	vWinCal.document.writeln("onclick=\""+pp_win+".gotoNext_lmt('month','" + stlmt + "')\"");
	vWinCal.document.writeln(">&nbsp;&nbsp;&nbsp;");
	vWinCal.document.writeln("<input title='Next Year' type='button' value='>>'");
	vWinCal.document.writeln("onclick=\""+pp_win+".gotoNext_lmt('year','" + stlmt + "')\"");
	vWinCal.document.writeln("></td>");
	vWinCal.document.writeln("</TR>");
		
	vWinCal.document.writeln("  <TR class=tableSubHead>");
		// Output days.
		for (var intLoop = 0; intLoop < days.length; intLoop++)
		{
				var isweek="No";
				for(var tw=0;tw<weeklenth;tw++)    {	if((weekslmt[tw]-1)==intLoop) {   isweek="Yes";  break; }	}
				if(isweek=="Yes")
				{
				vWinCal.document.writeln("<TD >" + days[intLoop] + "</TD>");
				}
				else
				{
				vWinCal.document.writeln("<TD >" + days[intLoop] + "</TD>");
				}
				
		}
	
	vWinCal.document.writeln("  </TR>");
	
	
	vWinCal.document.writeln("  <TBODY class=tr1 id=dayList onclick='"+pp_win+".getDate1_lmt(event)' vAlign=center>");
		for (var intWeeks = 0; intWeeks < 6; intWeeks++)
		{
	vWinCal.document.writeln("		<TR>");
			for (var intDays = 0; intDays < days.length; intDays++)
	vWinCal.document.writeln("			<TD align='center' style='cursor:pointer'  ></TD>");
	vWinCal.document.writeln("		</TR>");
		}
	
	vWinCal.document.writeln("  <TBODY>");
	vWinCal.document.writeln("  <TR>");
	vWinCal.document.writeln("    <TD style='cursor:pointer' class=tableSubHead colSpan=5 id=todayday onclick="+pp_win+".getTodayDay() >Today: " + (today.day + "/" + (today.month < 10 ? ("0"+(today.month+1)) : (today.month+1)) + "/" + today.year) +	" </TD>");
	vWinCal.document.writeln("    <TD align=center colSpan=2 title='Closes Calendar' ><A href='javascript:"+pp_win+".HideCalendar();' ><SPAN style='COLOR: black; FONT-SIZE: 11px; cursor:hand'><B>Close</B></SPAN></A></TD>");
	vWinCal.document.writeln("  </TR>");
	
	//vWinCal.document.writeln("<TR><td colspan='7' align='center'><table align='center' width='100%'><tr><td align='center'><img src='../deepavali_lamp.gif' height='50'></td><td align='center'><font  color='#FF0000'><b>HAPPY DIPAWALI</b></font><br><font size='-2'><b>FROM JA SOLUTIONS</b></font></td><td align='center'><img src='../deepavali_lamp.gif' height='50'></td></table></td></TR>");
	
	vWinCal.document.writeln("  </TBODY>");
	
	vWinCal.document.writeln("</TABLE>");
	vWinCal.document.writeln("</form></body></html>");	
	vWinCal.focus();
	vWinCal.document.close();
}
//-------------//


function number_format1 (number, decimals, dec_point, thousands_sep)
{
	if (isNaN(number) || number=='') number = 0;

	var decimals 		= decimals != undefined ? decimals : 2,
		dec_point		= dec_point != undefined ? dec_point : '.',
		thousands_sep	= thousands_sep != undefined ? thousands_sep : ' ',
		negative		= number<0;

	if (negative) number *= -1;

	var left 	= parseInt(number, 10),
		right	= Math.round(parseFloat(number.toString().replace(/^\d+./, '0.')) * Math.pow(10, decimals));

	left  = left.toString().split('').reverse().join('')
			.match(/\d{3}|\d{1,2}/g)
			.join(thousands_sep)
			.split('').reverse().join('');

	right = (right / Math.pow(10,decimals)).toString().replace(/^\d+./, '').toString();

	if (right.length < decimals) for (var iRight=right.length; iRight < decimals; iRight++) right += '0';

	return (negative?'-':'')+left+dec_point+right;
}


//----funcn  s jadhav for Pdf generation from HTML

function writeout(x,y,z) {

 	// get documentElement content

 	var iframe = document.getElementById(x+"ifrm"); 

	

	if(y=="filenm_external")

	{

	var generatedhtml = iframe.contentWindow.document.documentElement.innerHTML

	}

	else

	{

 	var generatedhtml = document.documentElement.innerHTML

	}



	// multiline flag does not seem to work in all browsers... workaround

 	generatedhtml = generatedhtml.replace(/[\r\n]+/g,"###")

 	// remove all script tags

 	generatedhtml = generatedhtml.replace(/<script.*?<\/script>/gi,"")

 	// write back newlines (multiline flag)

 	generatedhtml = generatedhtml.replace(/#{3,}/g,"\n")

 	// get rid of element generating this..

 	generatedhtml = generatedhtml.replace(/<div id=["']?writeoutdiv["']? onclick=["']?writeout\(\)["']?>writeout<\/div>/i,"")

	generatedhtml = generatedhtml.replace(/..\//i,"../../")

	generatedhtml = "<LINK HREF='" + "../../css/" + z + "/css.css' REL='stylesheet' TYPE='text/css'>" + generatedhtml;

 	document.getElementById(x+"hiddn").value="<html>\n"+generatedhtml+"\n</html>"; 

	//alert ("<html>\n"+generatedhtml+"\n</html>")

}
function resizeIframe() {
    var height = document.documentElement.clientHeight;
    height -= document.getElementById('frame').offsetTop;

    // not sure how to get this dynamically
    height -= 20; /* whatever you set your body bottom margin/padding to be */

    document.getElementById('frame').style.height = height +"px";

};
//document.getElementById('frame').onload = resizeIframe;
//window.onresize = resizeIframe;

