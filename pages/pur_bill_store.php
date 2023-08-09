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
$sqlk="select * from item_quantity where purchaser_no='$_POST[purchaser_no]' and product_code='$_POST[product_code]' and product_name='$_POST[product_name]'";
$resk=mysql_query($sqlk);
$rowk=mysql_num_rows($resk);
if($rowk==0)
{
	$sql="insert into item_quantity (purchaser_no,product_code,product_name,qty) values ('$_POST[purchaser_no]','$_POST[product_code]','$_POST[product_name]','$_POST[qty]')";
	$res=mysql_query($sql);
}
else
{
	$sql="update  item_quantity set qty=qty+'$_POST[qty]' where purchaser_no='$_POST[purchaser_no]' and product_code='$_POST[product_code]'";
	$res=mysql_query($sql);
}
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

document.location = "purchase_bill.php"   // redirect next page 
</script>

</body>
</html>