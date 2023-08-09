<?php
session_start();
include'../all_php_function.php';
$style="../css.css"; 
?>
<script language="JavaScript">
<?php
$TABLENAME = "pur_bill";                          // define table name
$CHILDTABLENAME = "";  					            // child table name if any
$PKEY = "id";						           // primary key

$FIELDLIST = "id,prepared_date,seller_no,purchaser_no,product_code,product_name,qty,rate,basic_tot,gst_rate,gst_val,gross_total";		          // table fields 


$DISABLE_EDIT = "FALSE";
$DISABLE_PARTIAL = "FALSE";
$EDIT_PAGE = "TRUE";

$selValue="";
// ****************retriving value from query strin******************** 
	$selValue=$_GET[selValue];           // select id from selection page
	if ($_GET[edit] == "noEdit")
	{
		$EDIT_PAGE = "FALSE";
	}
	else
	{
		$EDIT_PAGE = "TRUE";
	}
	if($selValue != NULL)
	{	
		$sql="select $FIELDLIST  from $TABLENAME where $PKEY='$selValue'";               //fetch record  from table
		$result=mysql_query($sql);
		if ($row=mysql_fetch_array($result))
		{
										// assign value to variable
			$id =$row[id];
			$seller_no =$row[seller_no];
			$purchaser_no=$row[purchaser_no];
			$product_code=$row[product_code];
			$product_name=$row[product_name];
			$qty=$row[qty];
			$rate=$row[rate];
			$basic_tot=$row[basic_tot];
			$gst_rate=$row[gst_rate];
			$gst_val=$row[gst_val];
			$gross_total=$row[gross_total];
			$prepared_date=$row[prepared_date];

			
			                           // assign value to variable
            $CONDITION = " $PKEY = $id";                      // define condition for fetch record
			$CHILDCONDITION = "";
		}
	}
?>
</script>
<html>
<head>
<title><?php echo $_SESSION[proj_title];?></title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link href="<?=$style?>" rel="stylesheet" type="text/css">
<script language="JavaScript" src="../all_script_function.js"></script>

<script language="JavaScript">

function getSelection1()
{
	winSel = winOpen("pur_bill_list.php","oWin","500","200")
}
function newRecord()
{
	restoreFrm(document.forms[0])
	document.forms[0].<?=$PKEY?>.value ="<?=tbl_max_field($TABLENAME, $PKEY, "")?>"
	document.forms[0].prepared_by.value="<?=$_SESSION[userid]?>"
	document.forms[0].non$prepared_date.value="<?=date("d/m/Y")?>"
	document.forms[0].prepared_date.value="<?=date("Y-m-d")?>"
	disableEdit()
}
function saveRecord()
{
	if(document.forms[0].bEditMode.value == "true")
	{
		document.forms[0].operation.value = 'update'

	}
	else
	{
		document.forms[0].operation.value = 'save'
		document.forms[0].condition.value = ""
	}


	if(checkFrm(document.forms[0]))
	{	
		document.forms[0].action = "pur_bill_store.php"
		document.forms[0].submit()
	}

}
function deleteRecord()
{
	var delFlag = false;
	delFlag=confirm("Do you want to delete this record")
	
	if(delFlag)
	{
		if(document.forms[0].bEditMode.value == "true")
		{
			//document.forms[0].operation.value = 'delete'
			//document.forms[0].action ="customer_mast_store.php"
			//document.forms[0].submit()
		}
	}	
	
}
function enableEdit()
{	
	
	document.forms[0].bEditMode.value = true
	document.forms[0].btnDelete.disabled = false
	document.forms[0].operation.value = 'update'
	document.forms[0].btnSave.disabled = false
	//document.forms[0].btnNew.disabled = false
	document.forms[0].btnSelect.disabled = false
}

function disableEdit()
{
	document.forms[0].bEditMode.value = false
	//document.forms[0].btnNew.disabled = true
	document.forms[0].btnDelete.disabled = true
	document.forms[0].operation.value = 'save'
	document.forms[0].btnSave.disabled = false
	document.forms[0].btnSelect.disabled = false
}

function disableForm()
{
	//document.forms[0].btnNew.disabled = false
	document.forms[0].btnDelete.disabled = true
	document.forms[0].btnSave.disabled = true
	document.forms[0].btnSelect.disabled = false
}

function freezeForm()
{
	document.forms[0].bEditMode.value = false
	//document.forms[0].btnNew.disabled = true
	document.forms[0].btnDelete.disabled = true
	document.forms[0].operation.value = 'none'
	document.forms[0].btnSave.disabled = true
	document.forms[0].btnSelect.disabled = true
}
var next_field=null;
function gonext(val) 
{ 
	next_field = val; 
}
var prev_field=null;
var selBack=false;
function goprev(val) 
{ 
	prev_field = val; 
}
document.onkeydown = function (e) 
{	
//alert(next_field)
	if (!e) {
        e = window.event;
	}
	if (e.keyCode==13)
	{ 
		if(next_field!=null)
		{
			document.getElementById(next_field).focus(); 
		}
	}
	if(e.keyCode==8)
	{	
		if(selBack==true)
		{
			return false;
		}
		//document.getElementById(prev_field).focus(); 
	}
}

function autoprod_nm()
{

	var oTextbox = new AutoSuggestControl(document.getElementById("product_name"), new SuggestionProvider(),"product_master","product_name","");  
	//gotochkavail('product_name');
}

function gotochkavail(val)
{
//alert("okok")
	var http = getXMLHTTPRequest();
	http.open("GET", 'find_val_exists1.php?fieldvar='+val+'&fieldval='+document.getElementById(val).value+'&seller_no='+document.getElementById('non$seller_no').value+'&purchaser_no='+document.getElementById('non$purchaser_no').value, true);
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
		//alert(req.responseText)
		var tt =req.responseText.split('##')
		//alert(tt[1])
		if(tt[1]=="N")
		{ 
			alert("Item Not Found In System")
			document.getElementById(val).value=""
			document.getElementById(val).focus()
		}
		else
		{
			document.getElementById('gst_rate').value=tt[1]
			document.getElementById('product_code').value=tt[2]
			document.getElementById('seller_no').value=tt[3]
			document.getElementById('purchaser_no').value=tt[4]
		}
		}
	}
	http.send(null);
	return;

}
function  setamt_toall()
{
	if(document.getElementById("qty").value>0 && document.getElementById("rate").value>0)
	{
		
		var qty=document.getElementById('qty').value
		var rate=document.getElementById('rate').value
		var gst_rate=document.getElementById('gst_rate').value
		document.getElementById('basic_tot').value=qty*rate;
		var gstval=(((qty*rate)*gst_rate)/100);
		document.getElementById('gst_val').value=gstval;
		document.getElementById('gross_total').value=(qty*rate)+gstval;
		
	}	
}
function autosell_nm()
{

	var oTextbox = new AutoSuggestControl(document.getElementById("non$seller_no"), new SuggestionProvider(),"customer_master","cust_name","cust_type ='Seller'");  
	//gotochkavail('product_name');
}
function autopurch_nm()
{

	var oTextbox = new AutoSuggestControl(document.getElementById("non$purchaser_no"), new SuggestionProvider(),"customer_master","cust_name","cust_type ='Purchaser'");  
	//gotochkavail('product_name');
}
</script>

</head>
<body>
<form name="form1" method="post" action="">
<?php
	///  assign values to form variable it is necessary to define all  below fields
?>
<input type="hidden" name="table" value="<?=$TABLENAME?>">
<input type="hidden" name="childTable" value="<?=$CHILDTABLENAME?>">
<input type="hidden" name="operation" value="">
<input type="hidden" name="condition" value="<?=$CONDITION?>">
<input type="hidden" name="chdCondition" value="<?=$CHILDCONDITION?>">
<input type="hidden" name="grouping" value="">
<input type="hidden" name="pkey" value="<?=$PKEY?>">
<input type="hidden" name="prepared_by" value="<?=$prepared_by?>">


<?php if ($selValue==NULL){ ?>
<input type="hidden" name="bEditMode" value="false">
<?php } 
else{?>
<input type="hidden" name="bEditMode" value="true">
<?php }?>

<?php /// ?>

  <table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">
    <tr> 
      <td colspan="2" height="2" valign="middle" align="center"></td>
    </tr>
    <tr> 
      <td width="10"></td>
      <td align="center" valign="top"> <table width="100%" border="0" cellpadding="0">
          <tr> 
            <td height="107"> <table width="500" border="0" align="center">
                <tr class="tablehead"> 
                  <td height="25" colspan="3" align="center"><strong>PURCHASE BILL</strong> </td>
                </tr>
                <tr height="8"> 
                  <td colspan="3" align="center"></td>
                </tr>
                <tr> 
                  <td>ID</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td width="264"><input type="text"  name="id" value="<?=$id?>" validate="isNotNull" disName="id" readonly></td>
                </tr>
				 <tr> 
                  <td>Date</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td>
				   <input type="text"  id="non$prepared_date" name="non$prepared_date" value="<?=date("d/m/Y")?>"  validate="isNotNull" readonly="" disname="frm_date Date"> 
              <input name="btndate"type="button" class="button" onClick="selectDate('non$prepared_date','prepared_date')" value="Select Date"> 
            <input type="hidden"id="prepared_date" name="prepared_date" value="<?=date("Y/m/d")?>">
                  </td>
                </tr>
                <tr> 
                  <td>Seller Name</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><!--select id="seller_no" name="seller_no">
				  <option value="">-Select-</option>
				  <?  tbl_list_data ("customer_master","cust_name","id"," where cust_type ='Seller'") ?>
				  </select-->
				  <input type="text"  id="non$seller_no" name="non$seller_no" value="<?=$seller_no?>" onKeyPress="autosell_nm('');"   validate="isNotNull" disName="purchaser_no" > 
				   <input type="hidden"  id="seller_no" name="seller_no" value="<?=$seller_no?>">
                  </td>
                </tr>
				<tr> 
                  <td>Purchaser Name</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                 <td><!--select id="purchaser_no" name="purchaser_no">
				  <option value="">-Select-</option>
				  <?  tbl_list_data ("customer_master","cust_name","id"," where cust_type ='Purchaser'") ?>
				  </select-->
				  <input type="text"  id="non$purchaser_no" name="non$purchaser_no" value="<?=$purchaser_no?>" onKeyPress="autopurch_nm('');"   validate="isNotNull" disName="purchaser_no" > 
				   <input type="hidden"  id="purchaser_no" name="purchaser_no" value="<?=$purchaser_no?>">
                  </td>
                </tr>
				<tr> 
                  <td>Product Name</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td>
				  <input type="text"  id="product_name" name="product_name" value="<?=$product_name?>" onKeyPress="autoprod_nm('');"   validate="isNotNull" disName="product_name" > 
				  <input type="hidden"  id="product_code" name="product_code" value="<?=$product_code?>"> 
                  
				  </td>
                </tr>
				<tr> 
                  <td>Qty</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  id="qty" name="qty" value="<?=$qty?>" onBlur="setamt_toall()"  validate="isNotNull" onFocus="gotochkavail('product_name')" disName="qty" > 
                  </td>
                </tr>
				<tr> 
                  <td>rate</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  id="rate" name="rate" value="<?=$rate?>" onBlur="setamt_toall()" validate="isNotNull" disName="rate" > 
                  </td>
                </tr>
				<tr> 
                  <td>GSTIN Rate</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td>
				  <input type="text" readonly  id="gst_rate" name="gst_rate" value="<?=$gst_rate?>" validate="isNotNull" disName="gst_rate" > 
				  %<br><input type="text" readonly id="gst_val" name="gst_val" value="<?=$gst_val?>" validate="isNotNull" disName="gst_val" > 
				  
                  </td>
                </tr>
				<tr> 
                  <td>Gross Total</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td>
				  <input type="hidden" readonly id="basic_tot" name="basic_tot" value="<?=$basic_tot?>" validate="isNotNull" disName="gross_total" > 
				  <input type="text" readonly id="gross_total" name="gross_total" value="<?=$gross_total?>" validate="isNotNull" disName="gross_total" > 
                  </td>
                </tr>
				
                <tr align="center"> 
                  <td colspan="3"> <input type="button" name="btnNew" class="button" value="New/Add" onClick="newRecord()"> 
                    &nbsp; <input type="button" id="btnSave" name="btnSave" value="Save" class="button" onClick="saveRecord()"> 
                    &nbsp; <input type="button" id="btnDelete" name="btnDelete" value="Delete" class="button" onClick="deleteRecord()"> 
                    &nbsp; <input type="button" id="btnSelect" name="btnSelect" value="Select" onClick="getSelection1()" class="button"> 
                  </td>
                </tr>
              </table></td>
          </tr>
        </table>
        `</td>
    </tr>
    <tr>
      <td></td>
      <td align="center" valign="top">&nbsp;</td>
    </tr>
  </table>
</form>
<script language="JavaScript" class="buttonOver">
<!--
<?php
// **************** END FUNCTION CALLS used for button disable and enable ******************** '

	if ($selValue == "")
	{
		echo("disableForm() \n");
		echo("newRecord() \n");
	}
	else
	{	
		?>
		document.forms[0].btnSave.focus();
		 <?
		if ( ! $EDIT_PAGE )
		{
			echo("freezeForm() \n" );
		}
	}
?>
-->
</script>
</body>
</html>