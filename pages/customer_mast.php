<?php
session_start();
include'../all_php_function.php';
$style="../css.css"; 

?>
<script language="JavaScript">
<?php
$TABLENAME = "customer_master";                          // define table name
$CHILDTABLENAME = "";  					            // child table name if any
$PKEY = "id";						           // primary key

$FIELDLIST = "id,cust_name,cust_address,cust_gstin,prepared_by,prepared_date";		          // table fields 


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
			$cust_type =$row[cust_type];
			$cust_name =$row[cust_name];
			$cust_address=$row[cust_address];
			$cust_gstin=$row[cust_gstin];
			$prepared_by=$row[prepared_by];
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
	winSel = winOpen("customer_mast_list.php","oWin","500","200")
}
function newRecord()
{
	restoreFrm(document.forms[0])
	document.forms[0].<?=$PKEY?>.value ="<?=tbl_max_field($TABLENAME, $PKEY, "")?>"
	document.forms[0].cust_name.focus();
	document.forms[0].prepared_by.value="<?=$_SESSION[userid]?>"
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
		document.forms[0].action = "customer_mast_store.php"
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
			document.forms[0].operation.value = 'delete'
			document.forms[0].action ="customer_mast_store.php"
			document.forms[0].submit()
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
<input type="hidden" name="prepared_date" value="<?=$prepared_date?>">

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
                  <td height="25" colspan="3" align="center"><strong>Seller/Purchaser/Customer MASTER</strong> </td>
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
                  <td>Type</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td>
				<select id="cust_type" name="cust_type">
				<option value="Seller">Seller</option>
				<option value="Purchaser">Purchaser</option>
				<option value="Customer">Customer</option>
				</select>
                  </td>
                </tr>
                <tr> 
                  <td>Name</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  name="cust_name" value="<?=$cust_name?>" validate="isNotNull" disName="cust_name" onFocus="gonext('btnSave')"> 
                  </td>
                </tr>
				<tr> 
                  <td>Address</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  name="cust_address" value="<?=$cust_address?>" validate="isNotNull" disName="cust_address" onFocus="gonext('btnSave')"> 
                  </td>
                </tr>
				<tr> 
                  <td>GSTIN No</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  name="cust_gstin" value="<?=$cust_gstin?>" validate="isNotNull" disName="cust_gstin" onFocus="gonext('btnSave')"> 
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