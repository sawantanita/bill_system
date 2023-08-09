<?php
session_start();
include '../sqlExecute.php';
$style="../css.css"; 

?>
<? 
$strMessage = $strMsg;
$execFlag = "true";
if ($execFlag)
{
	$objExec = new sqlExecute();
	$objExec->execute();        // execute query
}
$sql="update  item_quantity set qty=qty-'$_POST[qty]' where purchaser_no='$_POST[purchaser_no]' and product_code='$_POST[product_code]'";
$res=mysql_query($sql);
?>
<html>
<head>
<title><?php echo $_SESSION[proj_title];?></title>
<link href="<?=$style?>" rel="stylesheet" type="text/css">
<script language="JavaScript" src="../all_script_function.js"></script>   <? // include script file ?>


</head>
<body>
<form>

</form>
<script language="javascript">

document.location = "sales_bill.php"   // redirect next page 
</script>

</body>
</html>