<?php
	//Start session
	session_start();
	
	//Array to store validation errors
	$errmsg_arr = array();
	
	//Validation error flag
	$errflag = false;
	
	//Connect to mysql server
	$link = mysql_connect('localhost','root',"");
	if(!$link) {
		die('Failed to connect to server: ' . mysql_error());
	}
	
	//Select database
	$db = mysql_select_db('j_cable', $link);
	if(!$db) {
		die("Unable to select database");
	}
	
	//Function to sanitize values received from the form. Prevents SQL injection
	function clean($str) {
		$str = @trim($str);
		if(get_magic_quotes_gpc()) {
			$str = stripslashes($str);
		}
		return mysql_real_escape_string($str);
	}
	
	//Sanitize the POST values
	$login = clean($_POST['username']);
	$password = clean($_POST['password']);
	
	//Input Validations
	if($login == '') {
		$errmsg_arr[] = 'Username missing';
		$errflag = true;
	}
	if($password == '') {
		$errmsg_arr[] = 'Password missing';
		$errflag = true;
	}
	
	//If there are input validations, redirect back to the login form
	if($errflag) {
		$_SESSION['ERRMSG_ARR'] = $errmsg_arr;
		session_write_close();
		header("location: index.php");
		exit();
	}
	
	//Create query
	/*$qry="SELECT * FROM tbl_user_login WHERE login_id='$login' AND password='$password'";
	$result=mysql_query($qry);
	
	//Check whether the query was successful or not
	if($result) {
		if(mysql_num_rows($result) > 0) {
			//Login Successful
			session_regenerate_id();
			$member = mysql_fetch_assoc($result);
			/*$_SESSION['SESS_MEMBER_ID'] = $member['id'];
			$_SESSION['SESS_FIRST_NAME'] = $member['name'];
			$_SESSION['SESS_LAST_NAME'] = $member['position'];*/
			/*$_SESSION[login_flag]=$rs1[flag];
			$_SESSION[person_initial]=$rs1[person_initial];
			$_SESSION[person_id]=$rs1[person_id];
			$_SESSION[login_id]=$rs1[login_id];
			$_SESSION[person_name]=$rs1[person_name];
			$_SESSION[flag]=$rs1[flag];
			$_SESSION[userid]=$rs1[id];
			$_SESSION[parent_initial]=$rs1[parent_initial];
			$_SESSION["theme"]=$rs1[styletheme];
			//$_SESSION['SESS_PRO_PIC'] = $member['profImage'];
			session_write_close();
			header("location: project_main.php");
			exit();
		}else {
			//Login failed
			header("location: index.php");
			exit();
		}
	}else {
		die("Query failed");
	}*/
	$sql1="select * from tbl_user_login where login_id='". $login ."' and password='" .$password . "' ";
		//echo $sql1;
		$result1 = mysql_query($sql1);
		$rs1=mysql_fetch_array($result1);
		$row1=mysql_num_rows($result1);
		if ($row1 > 0)
		{
			
			$_SESSION[login_flag]=$rs1[flag];
			$_SESSION[person_initial]=$rs1[person_initial];
			$_SESSION[person_id]=$rs1[person_id];
			$_SESSION[login_id]=$rs1[login_id];
			$_SESSION[person_name]=$rs1[person_name];
			$_SESSION[flag]=$rs1[flag];
			$_SESSION[userid]=$rs1[id];
			$_SESSION[parent_initial]=$rs1[parent_initial];
			$_SESSION[office_id]=$rs1[office_id];
			$_SESSION["theme"]=$rs1[styletheme];
		session_write_close();
			header("location: index_main.php");
			exit();		
		}
		else
		{
			$stsMesg="Login Incorrect";
		}

?>