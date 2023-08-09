<?php
session_start();
include'../all_php_function.php';
$style="../css.css"; 
?>

<html>
<head>
<title><?php echo $_SESSION[proj_title];?></title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link href="<?=$style?>" rel="stylesheet" type="text/css">
<script language="JavaScript" src="../all_script_function.js">
</script>
<script language="JavaScript">
<!--


function gotopage()
{
	document.forms[0].action = "stock_report1.php"
	document.forms[0].submit()
}
function gotopageAA()
{
	document.forms[0].action = "stock_report2.php"
	document.forms[0].submit()
}


function autoprod_nm()
{

	var oTextbox = new AutoSuggestControl(document.getElementById("product_name"), new SuggestionProvider(),"product_master","product_name","");  
	//gotochkavail('product_name');
}

-->
</script>
</head>

<body bgcolor="#FFFFFF">
<form method="post">
<table width="50%" align="center">
<tr><td colspan="2" height="8"></td></tr>
<tr><td width="10"></td><td>
  <table width="95%" border="0" align="center" cellpadding="2" cellspacing="2">
    <tr class="tableHead"> 
                  <td height="25" colspan="3" align="center">Stock REPORT</td>
                </tr>  
    <tr> 
      <tr><td>Product Name</td><td>:</td><td>
    <input type="text"  id="product_name" name="product_name" value="<?=$product_name?>" onKeyPress="autoprod_nm('');"   validate="isNotNull" disName="product_name" > 
		 </td></tr>		 
   
    <tr><td>From Date</td><td>:</td><td>
   <input type="text"  id="non$frm_date" name="non$frm_date" value="<?=date("d/m/Y")?>"  validate="isNotNull" readonly="" disname="frm_date Date"> 
              <input name="btndate"type="button" class="button" onClick="selectDate('non$frm_date','frm_date')" value="Select Date"> 
            <input type="hidden"id="frm_date" name="frm_date" value="<?=date("Y/m/d")?>">
   </td></tr>
    <tr><td>To Date</td><td>:</td><td>
   <input type="text"  id="non$to_date" name="non$to_date" value="<?=date("d/m/Y")?>"  validate="isNotNull" readonly="" disname="to_date Date"> 
              <input name="btndate"type="button" class="button" onClick="selectDate('non$to_date','to_date')" value="Select Date"> 
            <input type="hidden"id="to_date" name="to_date" value="<?=date("Y/m/d")?>">
   </td></tr>
     <tr> 
      <td colspan="2">&nbsp;</td>
    </tr>
          <tr > 
                <td height="24" align="center" colspan="3">
				
               &nbsp;&nbsp; <input name="button2" type="button" class="button" onClick="gotopage()" value="Show">
               &nbsp;&nbsp; <input name="button2" type="button" class="button" onClick="gotopageAA()" value="Show Detail">
			   
			   </td>
          </tr>
	<tr> 
       <td colspan="2">&nbsp;</td>
    </tr>
    </table></td>
    </tr>
    
     
  </table>
      <div align="center"></div>
      </form>
</body>
</html>