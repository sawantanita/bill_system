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
	document.location = "stock_report.php"
	
}

-->
</script>
</head>

<body bgcolor="#FFFFFF">
<form method="post">
  <table width="95%"  class="hoverTable" id="resultTable" data-responsive="table" style="text-align: left;" border="1">
    <tr class="tableHead"> 
                  <td height="25" colspan="26" align="center"><center>STOCK REPORT</center></td>
                </tr>  
    <tr> 
      <td colspan="2">&nbsp;</td>
    </tr>
	<tr class="tableSubSubHead"> 
	<td>Sr No</td>
	<td>Product Code</td>
	<td>Product Name</td>
	<td>Opening</td>		
	<td>Purchase</td>		
	<td>Sale</td>		
	<td>Closing Stock</td>		
	</tr>
  <?
  $cond="";
  if($_POST[product_name]!="")
  {
	  $cond=" and product_name='$_POST[product_name]'";
  }
 $i=0;
  $sql="select * from pur_bill where prepared_date between '$_POST[frm_date]' and '$_POST[to_date]'  $cond group by product_code";
  $res=mysql_query($sql);
  $row=mysql_num_rows($res);
  if($row>0)
  {
  	while($rs=mysql_fetch_array($res))
	{
		$sql1="select sum(qty) as qty from pur_bill where prepared_date <'$_POST[frm_date]' and product_code='$rs[product_code]' group by product_code";
		$res1=mysql_query($sql1);
		$rs1=mysql_fetch_array($res1);
		$sql2="select sum(qty) as qty from sale_bill where prepared_date <'$_POST[frm_date]' and product_code='$rs[product_code]' group by product_code";
		$res2=mysql_query($sql2);
		$rs2=mysql_fetch_array($res2);
		$op_qty=$rs1[qty]-$rs2[qty];
		
		$sql3="select sum(qty) as qty from pur_bill where prepared_date between '$_POST[frm_date]' and '$_POST[to_date]' and product_code='$rs[product_code]' group by product_code";
		$res3=mysql_query($sql3);
		$rs3=mysql_fetch_array($res3);
		$pur_qty=$rs3[qty];
		
		$sql4="select sum(qty) as qty from sale_bill where prepared_date between '$_POST[frm_date]' and '$_POST[to_date]' and product_code='$rs[product_code]' group by product_code";
		$res4=mysql_query($sql4);
		$rs4=mysql_fetch_array($res4);
		$sale_qty=$rs4[qty];
		$cl_qty=$op_qty+$pur_qty-$sale_qty;
		$i++;
		?>
		<tr> 
		<td><?=$i?></td>
		<td><?=$rs[product_code]?></td>
		<td><?=$rs[product_name]?></td>
		<td><?=number_format($op_qty,'2','.','')?></td>		
		<td><?=number_format($pur_qty,'2','.','')?></td>		
		<td><?=number_format($sale_qty,'2','.','')?></td>		
		<td><?=number_format($cl_qty,'2','.','')?></td>		
		</tr>
		<?
	}
  }
  ?>
	
	<tr id="showtr"> 
                <td height="24" align="center" colspan="26">
				
               &nbsp;&nbsp;<center> <input name="button2" type="button" class="button" onClick="gotopage()" value="Back">&nbsp;&nbsp;<input name="Print" type="button" class="button" onClick="settr();" value="Print"></center></td>
          </tr>
    </table>
      <div align="center"></div>
      </form>
</body>
</html>