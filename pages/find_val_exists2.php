<?php
session_start();
include'../all_php_function.php';

echo "##";
$purchaser_no=tbl_sel_field("customer_master","cust_name",$_GET[purchaser_no],"id");
$sql="select * from product_master where $_GET[fieldvar] = '$_GET[fieldval]'  ";
$res=mysql_query($sql);
$row=mysql_num_rows($res);

if($row>0)
{
	$rs=mysql_fetch_array($res);	
	$sqlk="select * from item_quantity where purchaser_no='$purchaser_no' and product_name='$rs[product_name]' and qty>0";
	$resk=mysql_query($sqlk);
	$rowk=mysql_num_rows($resk);
	if($rowk>0)
	{
		$rsk=mysql_fetch_array($resk);
		echo $rs[product_gst]."##".$rs[product_code]."##".$rsk[qty]."##".tbl_sel_field("customer_master","cust_name",$_GET[purchaser_no],"id")."##".tbl_sel_field("customer_master","cust_name",$_GET[customer_no],"id");;
	}
	else
	{
		echo "S";
	}
}
else
	echo "N";


	?>