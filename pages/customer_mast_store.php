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

document.location = "customer_mast.php"   // redirect next page 
</script>

</body>
</html>