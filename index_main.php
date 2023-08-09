<?php
session_start();
include 'all_php_function.php';
$style="../css.css";
$curr_date=date("Y-m-d");
$display="Yes";
if(tbl_sel_field("tbl_user_login","id",$_SESSION[userid],"type_emp")=="Employee")
{
$sqlA="select * from tbl_sim_activation where prepared_by='$_SESSION[userid]' and curr_date='$curr_date'";
$resA=mysql_query($sqlA);
$rowA=mysql_num_rows($resA);
$sqlA1="select * from tbl_sim_act_limit order by id";
$resA1=mysql_query($sqlA1);
$rowA1=mysql_num_rows($resA1);
$rsA1=mysql_fetch_array($resA1);
if($rowA>=$rsA1[sim_limit])
{
	$display="Yes";
}
else
{
	$display="No";
}
}
?>
<html>
 <link href="css/bootstrap.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="css/DT_bootstrap.css">
  
  <link rel="stylesheet" href="css/font-awesome.min.css">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
      .sidebar-nav {
        padding: 9px 0;
      }
    </style>
    <link href="css/bootstrap-responsive.css" rel="stylesheet">

<link href="../style.css" media="screen" rel="stylesheet" type="text/css" />
<!--sa poip up-->
<script src="jeffartagame.js" type="text/javascript" charset="utf-8"></script>
<script src="js/application.js" type="text/javascript" charset="utf-8"></script>
<link href="src/facebox.css" media="screen" rel="stylesheet" type="text/css" />
<script src="lib/jquery.js" type="text/javascript"></script>
<script src="src/facebox.js" type="text/javascript"></script>
<script type="text/javascript">
  jQuery(document).ready(function($) {
    $('a[rel*=facebox]').facebox({
      loadingImage : 'src/loading.gif',
      closeImage   : 'src/closelabel.png'
    })
  })
</script>

<head>
<title></title><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<LINK HREF="<?=$style?>" REL="stylesheet" TYPE="text/css">
<LINK HREF="css.css" REL="stylesheet" TYPE="text/css">

</style>
<script language="JavaScript" src="all_script_function.js">
</script>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />

	<!-- Start css3menu.com HEAD section -->
	<link rel="stylesheet" href="n_files/css3menu1/style.css" type="text/css" />
	<style>
	._css3m{display:none}
	</style>
	<!-- End css3menu.com HEAD section -->
<!-- Start css3menu.com BODY section -->
<body >
<?php include('navfixed.php');?>

<form>

</form>
<br>
<br>
<p class="_css3m"><a href="http://css3menu.com/"></a></p>


<?
if($_SESSION[login_flag]=='D')
{
?>
<script language="JavaScript">

document.onmousedown = md;
function md(e)
{
//alert("coumt")
	try 
	{ 
		if (event.button==2||event.button==3) 
		{
			//alert("okok");
			return false; 
		}
	}
	catch (e) 
	{ 
		if (e.which == 3) 
		{
			//alert("okok1");
			return false; 
		}
	}
}
document.oncontextmenu = function() { alert("No right click, please."); return false; }
document.ondragstart = function() { return false; }
document.onmousedown = md;
</script>
<?
}
?>

<script language="JavaScript">
function logout()
{
	document.location = "index.php"
}
	

</script>

</body>
</html>