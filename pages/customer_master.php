<?php
session_start();
include'../all_php_function.php';
$style="../css.css"; 
if($_GET[cust_type]!="")
$_SESSION[cust_type]=$_GET[cust_type];

?>
<script language="JavaScript">
<?php
$TABLENAME = "cust_master";                          // define table name
$CHILDTABLENAME = "";  					            // child table name if any
$PKEY = "id";						           // primary key

$FIELDLIST = "id,cust_name,cust_addr,area_sel,ph_no,alter_ph_no,plan_type,plan_amount,cable_no,stb_no,prepared_by,date_format(prepared_date, '%d/%c/%Y') prepared_date,advance,stb_charges,other_charges,fta,starter,popular,premium_plus,hd,aadhar_card,ele_gas_bill,tel_bill,passport,bank_statement,voter_id,ration_card,lease_agmt,driving_license,other,status,node_sel,none_sel,date_format(birth_date, '%d/%c/%Y') as birth_date,net1_mbps,net2_mbps,net4_mbps,net6_mbps,old_payment,date_format(final_date, '%d/%c/%Y') final_date";		          // table fields 


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
			$cust_name =$row[cust_name];
			$cust_addr=$row[cust_addr];
			$prepared_by=$row[prepared_by];
			$prepared_date=$row[prepared_date];
			$area_sel=$row[area_sel];
			$ph_no=$row[ph_no];
			$alter_ph_no=$row[alter_ph_no];
			$plan_type=$row[plan_type];
			$plan_amount=$row[plan_amount];
			$cable_no=$row[cable_no];
			$stb_no=$row[stb_no];
			$advance=$row[advance];
			$stb_charges=$row[stb_charges];
			$other_charges=$row[other_charges];
			$fta=$row[fta];
			$starter=$row[starter];
			$popular=$row[popular];
			$premium_plus=$row[premium_plus];
			$hd=$row[hd];
			$aadhar_card=$row[aadhar_card];
			$ele_gas_bill=$row[ele_gas_bill];
			$tel_bill=$row[tel_bill];
			$passport=$row[passport];
			$bank_statement=$row[bank_statement];
			$voter_id=$row[voter_id];
			$ration_card=$row[ration_card];
			$lease_agmt=$row[lease_agmt];
			$driving_license=$row[driving_license];
			$other=$row[other];
			$status=$row[status];
			$node_sel=$row[node_sel];
			$none_sel=$row[none_sel];
			   $birth_date=$row[birth_date];
			$net1_mbps=$row[net1_mbps];
			$net2_mbps=$row[net2_mbps];
			$net4_mbps=$row[net4_mbps];
			$net6_mbps=$row[net6_mbps];
			$old_payment=$row[old_payment];
			$final_date=$row[final_date];
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
	winSel = winOpen("customer_listA.php","oWin","600","400")
}
function newRecord()
{
	restoreFrm(document.forms[0])
	document.forms[0].<?=$PKEY?>.value ="<?=tbl_max_field($TABLENAME, $PKEY, "")?>"
	document.forms[0].cust_name.focus();
	document.forms[0].prepared_by.value="<?=$_SESSION[userid]?>"
	document.forms[0].non$prepared_date.value="<?=date("d/m/Y")?>"
	document.forms[0].prepared_date.value="<?=date("Y-m-d")?>"
	document.forms[0].non$final_date.value="<?=date("d/m/Y")?>"
	document.forms[0].final_date.value="<?=date("Y-m-d")?>"

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
		document.forms[0].action = "customer_store.php"
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
			document.forms[0].action ="customer_store.php"
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



function setaddr()
{
winSel = winOpen("customer_list_addr.php","oWin","500","200")
}
function gotochkavail(val)
{
//alert("okok")
	var http = getXMLHTTPRequest();
	http.open("GET", 'find_val_exists1.php?fieldvar='+val+'&fieldval='+document.getElementById(val).value, true);
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
		//alert(req.responseText)
		var tt =req.responseText.split('##')
		//alert(tt[1])
		if(tt[1]=="Y")
		{ 
		alert("Already Exists in System")
		document.getElementById(val).value=""
		document.getElementById(val).focus()
		}
		
		}
	}
	http.send(null);
	return;

}
function gotoaddamt()
{
winSel = winOpen("customer_plan_amount.php","oWin","500","200")
}

function gotoamtset(val)
{
//alert("okok")
	var http = getXMLHTTPRequest();
	http.open("GET", 'find_plan_amt.php?fieldvar='+val+'&fieldval='+document.getElementById(val).value, true);
	http.onreadystatechange = function() {
		if (http.readyState == 4) {
		//alert(req.responseText)
		var tt =req.responseText.split('##')
		//alert(tt[1])
		if(tt[1]=="Y")
		{ 
		document.getElementById("plan_amount").value=tt[2]
		document.getElementById("plan_amount").focus()
		}
		
		}
	}
	http.send(null);
	return;

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
<!--input type="hidden" name="prepared_date" value="<?=$prepared_date?>"-->
<input type="hidden" name="cust_type" value="<?=$_SESSION[cust_type]?>">

<?php if ($selValue==NULL){ ?>
<input type="hidden" name="bEditMode" value="false">
<?php } 
else{?>
<input type="hidden" name="bEditMode" value="true">
<?php }?>

<?php /// ?>

 <table width="70%" border="0" align="center">
                <tr class="tablehead"> 
                  <td height="25" colspan="3" align="center"><strong>CUSTOMER MASTER</strong> </td>
                </tr>
                <tr height="8"> 
                  <td colspan="3" align="center"></td>
                </tr>
                <tr> 
                  <td>ID</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td width="80%"><input type="text"  name="id" value="<?=$id?>" validate="isNotNull" disName="id" readonly></td>
                </tr>
				<tr> 
      <td><label for"freight">Start Date</label></td>
      <td><div align="center">:</div></td>
      <td colspan="3">
	  <input type="text"  id="non$prepared_date" name="non$prepared_date" value="<?=$prepared_date?>"  validate="isNotNull" onFocus="selectDate('non$prepared_date','prepared_date');"  readonly="" disname="birth_date Date"> 
<!--              <input name="btndate" id="btndate" type="button" class="button" onClick="selectDate('non$join_date','join_date');gonext('btndate')" value="Select Date"> 
-->            <input type="hidden"id="prepared_date" name="prepared_date" value="">
	  </td>
    </tr>
				<tr> 
                  <td>Customer Id</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  name="cable_no" id="cable_no" value="<?=$cable_no?>" onBlur="gotochkavail('cable_no')" validate="isNotNull" disName="cable_no" onFocus="gonext('cust_addr')">
                  </td>
                </tr>

                <tr> 
                  <td>Customer Name</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  name="cust_name" value="<?=$cust_name?>" validate="isNotNull" disName="cust_name" onFocus="gonext('cust_addr')"> 
                  </td>
                </tr>
				<tr> 
                  <td>Address</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><textarea id="cust_addr" name="cust_addr" onFocus="setaddr();gonext('btnSave')"><?=$cust_addr?></textarea> 
                  </td>
                </tr>
				<tr> 
      <td><label for"freight">Birth Date</label></td>
      <td><div align="center">:</div></td>
      <td colspan="3">
	  <input type="text"  id="non$birth_date" name="non$birth_date" value="<?=$birth_date?>"  validate="isNotNull" onFocus="selectDate('non$birth_date','birth_date');"  readonly="" disname="birth_date Date"> 
<!--              <input name="btndate" id="btndate" type="button" class="button" onClick="selectDate('non$join_date','join_date');gonext('btndate')" value="Select Date"> 
-->            <input type="hidden"id="birth_date" name="birth_date" value="">
	  </td>
    </tr>
				<tr> 
                  <td>Area</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><select id="area_sel" name="area_sel">
				  <option value="">-Select-</option>
				  <?  tbl_list_data ("area_master","area_name","id","") ?>
				  </select>
                  </td>
                </tr>
				 <tr> 
                  <td>Mobile No.</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text" maxlength="10"  name="ph_no" id="ph_no" value="<?=$ph_no?>" onBlur="gotochkavail('ph_no')" validate="isNotNull" disName="Mobile No" onFocus="gonext('alter_ph_no')"> 
                  </td>
                </tr>
				 <tr> 
                  <td>Alternate Mobile No.</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  maxlength="10" name="alter_ph_no" value="<?=$alter_ph_no?>"  disName="cust_name" onFocus="gonext('cust_addr')"> 
                  </td>
                </tr>
				 <tr> 
                  <td>Plan</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><select id="plan_type" name="plan_type">
				  <option value="">-Select-</option>
				  <option value="1">Monthly</option>
				  <option value="3">3 Month</option>
				   <option value="6">6 Month</option>
				    <option value="12">Yearly</option>
				  </select>
                  </td>
                </tr>
				 <?
				 if($_SESSION[cust_type]=="cust_type_cable")
				 {
				 ?>
				 <tr> 
                  <td>Packages</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td>
				   <input type="checkbox" <? if ($fta=="FTA") { ?> checked <? } ?> onClick="gotoamtset('fta')" id="fta" name="fta" value="FTA"> FTA &nbsp;&nbsp;&nbsp;
				  <input type="checkbox" <? if ($starter=="STARTER") { ?> checked <? } ?>onClick="gotoamtset('starter')"  id="starter" name="starter" value="STARTER"> STARTER &nbsp;&nbsp;
				  <input type="checkbox" <? if ($popular=="POPULAR") { ?> checked <? } ?> onClick="gotoamtset('popular')" id="popular" name="popular" value="POPULAR"> POPULAR &nbsp;&nbsp;&nbsp;
				  <input type="checkbox" <? if ($premium_plus=="PREMIUM PLUS") { ?> checked <? } ?> onClick="gotoamtset('premium_plus')" id="premium_plus" name="premium_plus" value="PREMIUM PLUS"> PREMIUM PLUS &nbsp;
				  <input type="checkbox" <? if ($hd=="HD") { ?> checked <? } ?> onClick="gotoamtset('hd')" id="hd" name="hd" value="HD"> HD &nbsp;&nbsp;&nbsp;
				   <input type="checkbox" <? if ($node_sel=="NODE") { ?> checked <? } ?> onClick="gotoamtset('node_sel')" id="node_sel" name="node_sel" value="NODE"> NODE &nbsp;&nbsp;&nbsp;
				    <input type="checkbox" <? if ($none_sel=="NONE") { ?> checked <? } ?> onClick="gotoamtset('none_sel')" id="none_sel" name="none_sel" value="NONE"> NONE &nbsp;&nbsp;&nbsp;
				  <input type="button" class="button" id="btnchk11" name="btnchk11" value="Package Amt" onClick="gotoaddamt()">
                  </td>
                </tr>
				<?
				}
				else
				{
				 ?>
				 <tr> 
                  <td>Packages</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td>
				   <input type="checkbox" <? if ($net1_mbps=="net1_mbps") { ?> checked <? } ?> onClick="gotoamtset('net1_mbps')" id="net1_mbps" name="net1_mbps" value="net1_mbps"> 1 MBPS &nbsp;&nbsp;&nbsp;
				  <input type="checkbox" <? if ($net2_mbps=="net2_mbps") { ?> checked <? } ?>onClick="gotoamtset('net2_mbps')"  id="net2_mbps" name="net2_mbps" value="net2_mbps"> 2 MBPS &nbsp;&nbsp;
				  <input type="checkbox" <? if ($net4_mbps=="net4_mbps") { ?> checked <? } ?> onClick="gotoamtset('net4_mbps')" id="net4_mbps" name="net4_mbps" value="net4_mbps"> 4 MBPS &nbsp;&nbsp;&nbsp;
				 <input type="checkbox" <? if ($net6_mbps=="net6_mbps") { ?> checked <? } ?> onClick="gotoamtset('net6_mbps')" id="net6_mbps" name="net6_mbps" value="net6_mbps"> 6 MBPS &nbsp;&nbsp;&nbsp;
				  <input type="button" class="button" id="btnchk11" name="btnchk11" value="Package Amt" onClick="gotoaddamt()">
                  </td>
                </tr>
				<?
				}
				?>
				<tr> 
                  <td>Plan Amount</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text" id="plan_amount"  name="plan_amount" value="<?=$plan_amount?>" validate="isNotNull" disName="plan_amount" onFocus="gonext('cust_addr')">
                  </td>
                </tr>
				
				 	 <tr> 
                  <td valign="top">Address Proof</td>
                  <td valign="top"><div align="center">&nbsp;:&nbsp;</div></td>
                  <td>
				   
				  <input type="checkbox" id="aadhar_card" name="aadhar_card" <? if ($aadhar_card=="Aadhar card") { ?> checked <? } ?> value="Aadhar card"> Aadhar card &nbsp;&nbsp;&nbsp;
				  <input type="checkbox" id="ele_gas_bill" name="ele_gas_bill" <? if ($ele_gas_bill=="Elec./Gas Bill") { ?> checked <? } ?> value="Elec./Gas Bill"> Elec./Gas Bill &nbsp;&nbsp;&nbsp;
				  <input type="checkbox" id="tel_bill" name="tel_bill" <? if ($tel_bill=="Tel. Bill") { ?> checked <? } ?> value="Tel. Bill"> Tel. Bill &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  <input type="checkbox" id="passport" name="passport" <? if ($passport=="Passport") { ?> checked <? } ?> value="Passport"> Passport &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  <input type="checkbox" id="bank_statement" name="bank_statement" <? if ($bank_statement=="Bank Statement") { ?> checked <? } ?> value="Bank Statement"> Bank Statement &nbsp;&nbsp;&nbsp;<br>
				   <input type="checkbox" id="voter_id" name="voter_id" <? if ($voter_id=="Voter Id") { ?> checked <? } ?> value="Voter Id"> Voter Id &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				    <input type="checkbox" id="ration_card" name="ration_card" <? if ($ration_card=="Ration card") { ?> checked <? } ?> value="Ration card"> Ration card &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 <input type="checkbox" id="lease_agmt" name="lease_agmt" <? if ($lease_agmt=="Lease Agmt./Society Letter") { ?> checked <? } ?> value="Lease Agmt./Society Letter"> Lease Agmt./Society Letter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					  <input type="checkbox" id="driving_license" name="driving_license" <? if ($driving_license=="Driving License") { ?> checked <? } ?> value="Driving License"> Driving License &nbsp;&nbsp;&nbsp;
					   <input type="checkbox" id="other" name="other" value="Other" <? if ($other=="Other") { ?> checked <? } ?>> Other &nbsp;&nbsp;&nbsp;
                  </td>
                </tr>
						
						<?
						 if($_SESSION[cust_type]=="cust_type_cable")
{

						?>	
								 <tr> 
                  <td>Set Top Box No.</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="text"  name="stb_no" id="stb_no" onBlur="gotochkavail('stb_no')" value="<?=$stb_no?>" validate="isNotNull" disName="Set Top Box No." onFocus="gonext('cust_addr')">
                  </td>
                </tr>
				<?
				}
				
				?>
				 <tr> 
                  <td>Status</td>
                  <td><div align="center">&nbsp;:&nbsp;</div></td>
                  <td><input type="radio" id="status1" name="status" <? if($status!='In Active' && $status!='Transfer') { ?>checked<? }?> value="Active">Active&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  <input type="radio" id="status11" name="status" <? if($status=='In Active') { ?>checked<? }?> value="In Active">In Active&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				  <input type="radio" id="status21" name="status" <? if($status=='Transfer') { ?>checked<? }?>  value="Transfer">Transfer
                  &nbsp; <input type="text"  id="non$final_date" name="non$final_date" value="<?=$final_date?>"  validate="isNotNull" onFocus="selectDate('non$final_date','final_date');"  readonly="" disname=""> 
           <input type="hidden"id="final_date" name="final_date" value=""></td>
                </tr>
				
				
				<tr class="tablehead"> 
                  <td height="25" colspan="3" align="center"><strong>CUSTOMER PAYMENT DETAILS</strong> </td></tr>
				  
                </tr>
				<tr height="8"> 
				 <td  align="center">Previous Amount</td>
                  <td  align="center">:</td>
				  <td  align="center"><input type="text" id="old_payment" name="old_payment" value="<?=$old_payment?>"></td>
				  
				  
                </tr>
				<!--tr height="8"> 
                  <td  align="center">Advance</td>
				  <td  align="center">:</td>
				  <td  align="center"><input type="text" id="advance" name="advance" value="<?=$advance?>"></td>
				  
                </tr-->
				<?
				if($_SESSION[cust_type]=="cust_type_cable")
{
				?>
				 <tr height="8"> 
                  <td  align="center">Set Top Box</td>
				  <td  align="center">: </td>
				  <td  align="center"><input type="text" id="stb_charges" name="stb_charges" value="<?=$stb_charges?>"></td>
				  
                </tr>
				<?
				}
				?>
				 <tr height="8"> 
				 <td  align="center">Other Charges</td>
                  <td  align="center">:</td>
				  <td  align="center"><input type="text" id="other_charges" name="other_charges" value="<?=$other_charges?>"></td>
				  
				  
                </tr>
                <tr align="center"> 
                  <td colspan="3"> <!--<input type="button" name="btnNew" class="button" value="New/Add" onClick="newRecord()"> -->
                    &nbsp; <input type="button" id="btnSave" name="btnSave" value="Save" class="button" onClick="saveRecord()"> 
                    &nbsp; <input type="button" id="btnDelete" name="btnDelete" value="Delete" class="button" onClick="deleteRecord()"> 
                    &nbsp; <input type="button" id="btnSelect" name="btnSelect" value="Select" onClick="getSelection1()" class="button"> 
                  </td>
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
	
	echo("tbl_sel_date('".$prepared_date."', 'non$prepared_date', 'prepared_date') \n");
	echo("tbl_sel_date('".$final_date."', 'non$final_date', 'final_date') \n");
	
	echo("tbl_sel_date('".$birth_date."', 'non$birth_date', 'birth_date') \n");
	echo("listValue(document.forms[0].area_sel, '" . $area_sel . "') \n" );
	echo("listValue(document.forms[0].plan_type, '" . $plan_type . "') \n" );
		?>
		
		document.forms[0].btnSave.focus();
		document.forms[0].old_payment.readOnly=true
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