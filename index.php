<?php
	//Start session
	session_start();
	
	//Unset the variables stored in session
	unset($_SESSION['SESS_MEMBER_ID']);
	unset($_SESSION['SESS_FIRST_NAME']);
	unset($_SESSION['SESS_LAST_NAME']);
?>
<html>
<head>
<title>
PRODUCT</title>
    <!--link rel="shortcut icon" href="main/images/pos.jpg"-->

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

<link href="style.css" media="screen" rel="stylesheet" type="text/css" />
</head>

    
<?php
if( isset($_SESSION['ERRMSG_ARR']) && is_array($_SESSION['ERRMSG_ARR']) && count($_SESSION['ERRMSG_ARR']) >0 ) {
	foreach($_SESSION['ERRMSG_ARR'] as $msg) {
		echo '<div style="color: red; text-align: center;">',$msg,'</div><br>'; 
	}
	unset($_SESSION['ERRMSG_ARR']);
}
?>
<body onLoad="slideit();regenerate2()">	
			
<form action="login.php" method="post">

	
<div id="login" >
			<font style=" font:bold 22px 'Aleo'; text-shadow:1px 1px 15px #000; color:#fff;"><center>PRODUCT</center></font>
			<font style=" font:bold 22px 'Aleo'; text-shadow:1px 1px 15px #000; color:#fff;"><center>PROJECT</center></font>
		<br>

		
<div class="input-prepend">
		<span style="height:30px; width:25px;" class="add-on"><i class="icon-user icon-2x"></i></span><input style="height:40px;" type="text" name="username" Placeholder="Username" required/><br>
</div>
<div class="input-prepend">
	<span style="height:30px; width:25px;" class="add-on"><i class="icon-lock icon-2x"></i></span><input type="password" style="height:40px;" name="password" Placeholder="Password" required/><br>
		</div>
		<div class="qwe">
		 <button class="btn btn-large btn-primary btn-block pull-right" href="dashboard.html" type="submit"><i class="icon-signin icon-large"></i> Login</button>
</div></div>
		 </form>

</div>
</div>
</body>
</html>