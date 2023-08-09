<?php
session_start();
include'../all_php_function.php';

echo "##";

$sql="select * from product_master where $_GET[fieldvar] = '$_GET[fieldval]'  ";
$res=mysql_query($sql);
$row=mysql_num_rows($res);

if($row>0)
{
	$rs=mysql_fetch_array($res);
	echo $rs[product_gst]."##".$rs[product_code]."##".tbl_sel_field("customer_master","cust_name",$_GET[seller_no],"id")."##".tbl_sel_field("customer_master","cust_name",$_GET[purchaser_no],"id");
}
else
	echo "N";


	?>