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
                  <td height="25" colspan="26" align="center"><center>TRNSACTION  REPORT</center></td>
                </tr>  
    <tr> 
      <td colspan="2">&nbsp;</td>
    </tr>
	<tr class="tableSubSubHead"> 
	<td>Sr No</td>
	<td>Date</td>
	<td>Seller</td>
	<td>Buyer</td>
	<td>Type</td>
	<td>Qty</td>
	<td>Rate</td>
	<td>Amt</td>		
	<td>GST</td>		
	<td>Total</td>		
	</tr>
  <?
  
  $sqlk="TRUNCATE TABLE stock_rpt";
  $resk=mysql_query($sqlk);
  
  $sqlk="insert into stock_rpt (prepared_date,seller_no,purchaser_no,product_code,product_name,qty,rate,basic_tot,gst_rate,gst_val,gross_total) select prepared_date,seller_no,purchaser_no,product_code,product_name,qty,rate,basic_tot,gst_rate,gst_val,gross_total from pur_bill where prepared_date between '$_POST[frm_date]' and '$_POST[to_date]' ";
  $resk=mysql_query($sqlk);
  
  $sqlk="update stock_rpt set pre_type='Purchase'";
  $resk=mysql_query($sqlk);
  
  $sqlk="insert into stock_rpt (prepared_date,seller_no,purchaser_no,product_code,product_name,qty,rate,basic_tot,gst_rate,gst_val,gross_total) select prepared_date,purchaser_no,customer_no,product_code,product_name,qty,rate,basic_tot,gst_rate,gst_val,gross_total from sale_bill where prepared_date between '$_POST[frm_date]' and '$_POST[to_date]' ";
  $resk=mysql_query($sqlk);
  
  $sqlk="update stock_rpt set pre_type='Sales' where pre_type=''";
  $resk=mysql_query($sqlk);
  
  $i=0;
  $sql="select * from stock_rpt order by prepared_date asc";
  $res=mysql_query($sql);
  $row=mysql_num_rows($res);
  if($row>0)
  {
  	while($rs=mysql_fetch_array($res))
	{
		$i++;
		?>
		<td><?=$i?></td>
		<td><?=disdate($rs[prepared_date])?></td>
		<td><?=tbl_sel_field("customer_master","id",$rs[seller_no],"cust_name")?></td>
		<td><?=tbl_sel_field("customer_master","id",$rs[purchaser_no],"cust_name")?></td>
		<td><?=$rs[pre_type]?></td>	
		<td><?=number_format($rs[qty],'2','.','')?></td>		
		<td><?=number_format($rs[rate],'2','.','')?></td>		
		<td><?=number_format($rs[basic_tot],'2','.','')?></td>		
		<td><?=number_format($rs[gst_val],'2','.','')?></td>		
		<td><?=number_format($rs[gross_total],'2','.','')?></td>		
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