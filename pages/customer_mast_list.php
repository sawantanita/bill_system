<?php
session_start();
include'../all_php_function.php';
$style="../css.css"; 


?>
<?php
$TABLENAME = "customer_master";            // define table name
$PKEY = "id";                    // define primary key
$FIELDLIST = "id,cust_name,cust_address,cust_gstin";    // define feild list
$FIELDNAME = "Id,Seller/Purchaser/Customer Name,Address,GSTIN NO ";    // Heading Name list
$sql="select $FIELDLIST from $TABLENAME ";
//echo $sql;
$result=mysql_query($sql); 
$arrFIELDLIST=explode(",",$FIELDLIST);
$arrFIELDNAME =explode(",",$FIELDNAME);
$pickValue="False";
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
function cSel(val)
{
//alert(val)
	var url = "";
	if(val!='')
	{
		
				opener.window.location = opener.window.location.pathname + "?selValue=" + val   //redirect on original page with id as querystring
				self.close()
				opener.window.focus()
				return;
			
	}
	else
	{
		self.close()
		opener.window.focus()
	}
}


function ignore()
{
	self.close()
	opener.window.focus()
}

-->
</script>
</head>

<body bgcolor="#FFFFFF">
<form>
 <table width="100%" class="hoverTable" id="resultTable" data-responsive="table" style="text-align: left;">
                <tr class="tablehead"> 
                  <td>&nbsp;&nbsp;</td>
<?php
					$cnt=0;
					foreach($arrFIELDNAME as $head)
					{
						echo "<td><strong>$head</strong></td>";         //display headings  
					}
					echo "</tr>";
						
					$row=mysql_num_rows($result);
				
					if ($row > 0)
					{
						while($rs=mysql_fetch_array($result))
						{
							?><tr><td><img src="edit.png" onClick="cSel('<?=$rs[id]?>')"></td><?
							foreach($arrFIELDLIST as $fieldvar =>$fieldval)
							{	
								if ($fieldvar=="0")
								{ 
									$cnt=$cnt+1;
									echo "<td>$cnt</td>";                         //display counter srno
								}
								else
								{	
								   echo "<td>$rs[$fieldvar]</td>";                //display field value
								}
							}
							echo "</tr>";
						}
					}
					else
					{
							echo"<tr>
								<td colspan='count ($arrFIELDNAME)'>List is empty</td>
								</tr>";
					}

?>		
		  
          <tr> 
                <td height="24" align="center" colspan="10"><center>
			<!--	<input name="button2" type="button" class="button" onClick="cSel('<?=$pickValue?>')" value="Select"> -->
              &nbsp;&nbsp; <input name="button2" type="button" class="button" onClick="ignore()" value="Close"></center></td>
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