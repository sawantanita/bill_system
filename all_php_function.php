<?php
session_start();
date_default_timezone_set('Asia/Calcutta');
include 'connection.php';
//include 'hr_all_php_function.php';
$con = connect_to();

       
		echo '<script language="JavaScript">var for_java_financial_year="'.date('Y').'"</script>';		
		

$isreport="YES";		
echo '<script language="JavaScript">var for_whether_report="'.$isreport.'"</script>';	

?>
<script language="JavaScript">
<?php
$DtToday = date("d") . "/" . date("m") . "/" . date("Y");
?>
</script>
 <script language="JavaScript" src="../json.js"></script>

<script language="JavaScript" src="../zxml.js"></script>
<script language="JavaScript" src="../autosuggest.js"></script>

<script language="JavaScript" src="../pop2.js"></script>
<script language="JavaScript" src="../pop3.js"></script>
<script language="JavaScript" src="../all_script_function.js"></script>
<script language="JavaScript" src="../calendar.js"></script>
<div style="position:absolute;display:none;z-index:100" id="divDate">
<iFrame src="about:blank" width="160" height="180" name="frame_Date" frameborder="0" scrolling="no"></iframe>
</div>
<?
	$strMsg = "Transaction successfully completed";
	$strerrmsg = "Some Problem in Operation";
	$stremptylist = "List is Empty";
	$strnorecsel = "No Record has been Selected";
/* ...............................FUNCTIONS WHICH ARE MOSTLY USED................................ */
function retrivemax($tabname,$key)
{
/*
	retrivemax -
		It is used for getting largest Pkey field from table
	sytax:
		retrivemax($tabname,$key)
	Explanation:
		$tabname=it is table name in which we want Pkey field.	
		$key=it is PKEY field from the table.
	e.g.
		$Cust_id=retrivemax("customer","Cust_id");
*/
	$sql = "SELECT max($key) AS maxid, count(*) as cnt FROM $tabname"; 
    $result1=mysql_query($sql);
	if ($row=mysql_fetch_object($result1)) 
	{
			$maxid=(($row->maxid) + "1");
	}
	else
	{
			$maxid="1";
	}
	return $maxid;
}
function tbl_max_field1($tabname,$key,$prefix)
{	
/*
	tbl_max_field1:
		It is used for getting largest Pkey field with prefix from table
	syntax:
		tbl_max_field1($tabname,$key,$prefix)
	Explanation:
		$tabname=it is table name in which we want Pkey field.	
		$key=it is PKEY field from the table.
		$prefix=it is string or character  which is to prefixed to $key.
	e.g.:
		$Cust_id=tbl_max_field1("customer","Cust_id","V");
*/
	$sqlStatement = "";
	$lenPrefix = 0;
	$maxNO = 0;
	$sql= "select count(*) as cnt from $tabname";
	$result=mysql_query($sql);
	$rstab=mysql_fetch_array($result);
	if ($rstab["cnt"] > 0)
	{
		$lenPrefix = strlen($prefix) + 1;
		$sqlStatement = "SELECT mid($key,$lenPrefix) AS maxid FROM $tabname"; 
		$result1=mysql_query($sqlStatement);
		 if (mysql_num_rows($result1)==0)
		{
				$maxid = ($prefix). "1";
		}
		 else
		{
			while ($row=mysql_fetch_array($result1))
			{
				if ($row["maxid"] > $maxNO)
				{
					 $maxNO = $row["maxid"];
				}
		 	}
			$maxNO = $maxNO + 1;
			$maxid = ($prefix). $maxNO;
		}
	}
	else
	{
		$maxid = ($prefix). "1";
	}
	return $maxid;
}
function tbl_max_field12($tabname,$key,$prefix)
{	
/*
	tbl_max_field12:
		It is used for getting largest Pkey field with prefix from table
	syntax:
		tbl_max_field12($tabname,$key,$prefix)
	Explanation:
		$tabname=it is table name in which we want Pkey field.	
		$key=it is PKEY field from the table.
		$prefix=it is string or character  which is to prefixed to $key.
		
	e.g.:
		$Cust_id=tbl_max_field12("customer","Cust_id","V");
*/
	$sqlStatement = "";
	$lenPrefix = 0;
	$maxNO = 0;

	$sql= "select count(*) as cnt from $tabname";
	$result=mysql_query($sql);
	$rstab=mysql_fetch_array($result);
	if ($rstab["cnt"] > 0)
	{
		$lenPrefix = strlen($prefix) + 1;
		$sqlStatement = "SELECT mid($key,$lenPrefix) AS maxid FROM $tabname where $key like '%$prefix%'"; 
		$result1=mysql_query($sqlStatement);
		 if (mysql_num_rows($result1)==0)
		{
				$maxid = ($prefix). "1";
		}
		 else
		{
			while ($row=mysql_fetch_array($result1))
			{
				if ($row["maxid"] > $maxNO)
				{
					 $maxNO = $row["maxid"];
				}
		 	}
			$maxNO = $maxNO + 1;
			$maxid = ($prefix). $maxNO;
		}
		
	}
	else
	{
		$maxid = ($prefix). "1";
	}
	return $maxid;
}

function tbl_max_field($tabname,$key,$prefix)
{
/*
	tbl_max_field:
		It is used for getting largest Pkey field with prefix from table
	syntax:
		tbl_max_field($tabname,$key,$prefix)
	Explanation:
		$tabname=it is table name in which we want Pkey field.	
		$key=it is PKEY field from the table.
		$prefix=it is string or character  which is to prefixed to $key.
	e.g.:
		$Cust_id=tbl_max_field("customer","Cust_id","V");
*/
	$lenPrefix = strlen($prefix) + 1;
	$sql = "SELECT max(abs(mid($key,$lenPrefix))) AS maxid FROM $tabname"; 
	$result1=mysql_query($sql);
	if ($row = mysql_fetch_object($result1))
    {
		$maxid=$prefix.(($row->maxid) + "1");
	}
	else
    {
		$maxid=$prefix.("1");
	}
	return $maxid;
}
function tbl_sel_field($tabname,$key,$value,$data)
{
/*
	tbl_sel_field:
		This Fuctions usefull for retriew related field name from field id.
	syntax:
		tbl_sel_field($tabname,$key,$value,$data)
	Explanation of function:
		$tabname= Table name from which table if you want data
		$key= It is a Primery Key of patrticular table from which you want match with value
		$value= It is a field which carry from form.
		$data= It actual value.
	e.g.:
		tbl_sel_field("customer","cust_id",$row["cust_id"],"cust_name")
*/
    $sqlstr1="select ".$data." from ". $tabname." where ".$key."='".$value."'";
//echo "****".$sqlstr1;
    $result1=mysql_query($sqlstr1);
	$rstab=mysql_fetch_array($result1);
    if (mysql_num_rows($result1)==0)
    {
        $tbl_sel_field = "#empty#";
    }
	else
    {
        if (strpos($data,",")>0)
        {
            $arr = Split($data,",");
            for ($i= 0;$i<=ubound($arr);$i++)
			{
                if ($strtbl_sel_field=="")
				{
                    $strtbl_sel_field=$rstab[$arr($i)];
                }
				else
                {
                    $strtbl_sel_field=$strtbl_sel_field . "#" . $rstab[$arr($i)];
                }
			   $tbl_sel_field=$strtbl_sel_field;
			}
		}
		else
		{
			 $tbl_sel_field=$rstab[$data];
			 return $tbl_sel_field;
		}  
	}
}
function tbl_sel_fielddata($tabname,$cond,$data)
{
/*
	tbl_sel_fielddata:
		It is used for getting multiple data from table.
	syntax:
		tbl_sel_fielddata($tabname,$cond,$data)
	Explanation:
		$tabname=table name
		$cond=condition
		$data=data from table
	e.g.:
		tbl_sel_fielddata("customer","cust_id='1'",*)
*/
    $sqlstr1="select ".$data." from ". $tabname." where ".$cond;
    $result1=mysql_query($sqlstr1);
	$rstab=mysql_fetch_array($result1);
    if (mysql_num_rows($result1)==0)
    {
        $tbl_sel_fielddata = "";
    }
	else
    {
        if (strpos($data,",")>0)
        {
            $arr = Split($data,",");
            for ($i= 0;$i<=ubound($arr);$i++)
			{
                    $tbl_sel_fielddata=$strtbl_sel_field . "#" . $rstab[$arr($i)];
			}
		}
		else
		{
			 $tbl_sel_fielddata=$rstab[$data];
			 return $tbl_sel_fielddata;
		}  
	}
}
function tbl_list_dataselect($tableName,$fldName,$fldValue,$condtion,$sel)
{
/*
	tbl_list_data:
		This Fuctions usefull for retriew related field value in combo box.
	syntax:
		tbl_list_data($tableName,$fldName,$fldValue,$condtion)
	Explanation of function:
		$tabname= Table name from which table if you want data
		$fldName= It is a filed of patrticular table which you want to store in database
		$$fldValue= Value display in Combo box.
		$condition= write condition in where clause.
	e.g.:
		tbl_list_data ("customer","Cust_name","Cust_id","where Cust_id='5'")
*/
	$qr1="select ". $fldName . ", " . $fldValue ." from ". $tableName . " " . $condtion;
	$result1 = mysql_query($qr1); 
	while ($row = mysql_fetch_array($result1))
	{
			if($row[$fldValue]==$sel)
				echo "<option value= $row[$fldValue] selected>$row[$fldName]</option>";
			else
			echo "<option value= $row[$fldValue] >$row[$fldName]</option>";
	}
}

function tbl_list_data($tableName,$fldName,$fldValue,$condtion)
{
/*
	tbl_list_data:
		This Fuctions usefull for retriew related field value in combo box.
	syntax:
		tbl_list_data($tableName,$fldName,$fldValue,$condtion)
	Explanation of function:
		$tabname= Table name from which table if you want data
		$fldName= It is a filed of patrticular table which you want to store in database
		$$fldValue= Value display in Combo box.
		$condition= write condition in where clause.
	e.g.:
		tbl_list_data ("customer","Cust_name","Cust_id","where Cust_id='5'")
*/
	$qr1="select ". $fldName . ", " . $fldValue ." from ". $tableName . " " . $condtion;
	$result1 = mysql_query($qr1); 
	while ($row = mysql_fetch_array($result1))
	{
			echo "<option value= $row[$fldValue]>$row[$fldName]</option>";
	}
}
function tbl_list_dataDis($tableName,$fldName,$fldValue,$condtion)
{
/*
	tbl_list_dataDis:
		This Fuctions usefull for retriew related distict field value in combo box.
	syntax:
		tbl_list_dataDis($tableName,$fldName,$fldValue,$condtion)
	Explanation of function:
		$tabname= Table name from which table if you want data
		$fldName= It is a filed of patrticular table which you want to store in database
		$$fldValue= Value display in Combo box.
		$condition= write condition in where clause.
	e.g.:
		tbl_list_dataDis("customer","Cust_name","Cust_id","")
*/
	$qr1="select distinct(". $fldName . "), " . $fldValue ." from ". $tableName . " " . $condtion;
	//echo $qr1;
	$result1 = mysql_query($qr1); 
	while ($row = mysql_fetch_array($result1))
	{
			echo "<option value= $row[$fldValue]>$row[$fldName]</option>";
	}
}
function disDate($dte)
{
/*
	disDate:
		If we want to retrive arbitratray date , month ,and year then use this function
	syntax:
		disDate($dte)
	Discription:
	 $date = the date which retrive from database.
*/
	if ($dte != "" )
	{
		$disDate = strftime("%d",strtotime($dte))."/".strftime("%m",strtotime($dte))."/".strftime("%Y",strtotime($dte));
	}
	else
	{
		$disDate = "";
	}
	return $disDate;
}
function dbDate($dte)
{
/*
	dbDate:
		If we want to retrive arbitratray date , month ,and year then use this function
	syntax:
		disDate($dte)
	Discription:
	 	$date = the date which retrive from database.
*/
	if ($dte != "" )
	{
		$dbDate =strftime("%Y",strtotime($dte)) ."/".strftime("%m",strtotime($dte))."/".strftime("%d",strtotime($dte));
	}
	else
	{
		$dbDate = "";
	}
	return $dbDate;
}
function ExactdbDate($dte)
{
/*
	dbDate:
		If we want to retrive arbitratray date , month ,and year then use this function
	syntax:
		disDate($dte)
	Discription:
	 	$date = the date which retrive from database.
*/
	
	
		$dbDate =strftime("%Y",strtotime($dte)) ."-".strftime("%d",strtotime($dte))."-".strftime("%m",strtotime($dte));
	
	
		//echo $dbDate;
	return $dbDate;
}
/*function DateAdd($dte)
{
	$dte=strftime("%Y",strtotime($dte))."-".strftime("%m",strtotime($dte))."-".strftime("%d",strtotime($dte));
    $date_add1=date("m-d-Y", mktime (0,0,0,strftime("%m",strtotime($dte)),strftime("%d",strtotime($dte))-1,strftime("%Y",strtotime($dte))));
	$dated=substr($date_add1,3,2);
	$datem=substr($date_add1,0,2);
	$datey=substr($date_add1,-4);
	$date_add=$datey."/".$datem."/".$dated;
	return $date_add;
}*/

function IsLeapYear($intYear)
{
/*
	The trick here is make sure that we get an integer
	The 3 Golden rules are:
	True if it is divisible by 4
	False if it is divisible by 100
	TRUE if it is divisble by 400
*/
	$IsLeapYear = (($intYear % 4 == 0) && ($intYear % 100 != 0) 	|| ($intYear % 400 == 0));
	return $IsLeapYear;
}
function towords($TXTIN)
{
/*
	towords:
		This function use to display integer numbers in word
	syntax:
		towords($TXTIN)
	Discription:
	 	$TXTIN = the interger value which you want to convert into word.
	e.g:
		towords(100) result - Hundred.
*/
  $leftpad = "0";
  $TXTINN = $TXTIN;
  for ($i=strlen($TXTINN)+1; $i<=9; $i++)
  {
  	$TXTINN = $leftpad . $TXTINN;
  }
  print $TXTINN;
  $TXTINN = $TXTINN & ",00";
	settype($TXTINN, "integer");
	If ( substr($TXTINN,0,2) > 0)
	 {
  		settype($TXTINN, "integer");		
		$rstr=word(substr($TXTINN,0,2));
        $TXTOUT = $TXTOUT + $rstr + "Crores ";
	}
    If (substr($TXTINN,2,2) > 0 )
	{
        settype($TXTINN, "integer");
		$rstr=word(substr($TXTINN,2,2));
        $TXTOUT = $TXTOUT + $rstr + "Lakhs ";
	}
    If (substr($TXTINN,4,2) > 0) 
	{
      	settype($TXTINN, "integer");	
		$rstr=word(substr($TXTINN,4,2));
        $TXTOUT = $TXTOUT + $rstr + "Thousands ";
	}
    If (substr($TXTINN,6,1) > 0 )
	{	
		settype($TXTINN, "integer");
        $rstr=word(substr($TXTINN,6,1));
        $TXTOUT = $TXTOUT + $rstr + "Hundred ";
	}
    If (substr($TXTINN,7,2) > 0 )
	{
		$rstr=word(substr($TXTINN,7,2));
        $TXTOUT = $TXTOUT + $rstr;
	}
	 	settype($TXTINN, "integer");
		$rstr=word(substr($TXTINN,10,2));
		$TXTOUT = $TXTOUT ;
		$TOWords = $TXTOUT;
		return $TOWords;
}
function word($mynum)
{

   $x1[0] = "Zero ";
   $x1[1] = "One ";
   $x1[2] = "Two ";
   $x1[3] = "Three ";
   $x1[4] = "Four ";
   $x1[5] = "Five ";
   $x1[6] = "Six ";
   $x1[7] = "Seven ";
   $x1[8] = "Eight ";
   $x1[9] = "Nine ";

   $x2[1] = "Ten ";
   $x2[2] = "Twenty ";
   $x2[3] = "Thirty ";
   $x2[4] = "Fourty ";
   $x2[5] = "Fifty ";
   $x2[6] = "Sixty ";
   $x2[7] = "Seventy ";
   $x2[8] = "Eighty ";
   $x2[9] = "Ninty ";

   $x3[1] = "Eleven ";
   $x3[2] = "Twelve ";
   $x3[3] = "Thirteen ";
   $x3[4] = "Fourteen ";
   $x3[5] = "Fifteen ";
   $x3[6] = "Sixteen ";
   $x3[7] = "Seventeen ";
   $x3[8] = "Eighteen ";
   $x3[9] = "Ninteen ";;

   $rstr = "";
   if ($mynum < 10)
  {
      $rstr = $x1[$mynum];
  }
   else
  {
      if ($mynum % 10 == 0)
      {
		   $rstr = $x2[($mynum / 10)];
	  } 	      
	 else
      {
         if (($mynum / 10) == 1 && $mynum % 10 != 0)
		 {
            $rstr = $x3[$mynum % 10];
         }
		else
         {
		    if (($mynum / 10) > 1 && $mynum % 10 != 0)
            { 
				  $rstr = $x2[($mynum / 10)] + $x1[$mynum % 10];
            }
			else
            {
				  $rstr = "NIL";
            }
         }
      }
  }
}
function PCase($strInput)
{
/*
	PCase:
		used to dispaly first character of word in upper case i.e. Proper case.
	syntax:
		PCase($strInput)
	Discription:
	 	$strInput = the string value which you want to convert into Proper Case.
	e.g:
		
*/
	$iPosition = 0;
	While(strpos($iPosition, $strInput) != 0)
	{
		$iSpace = strpos($iPosition, $strInput);
		$strOutput = $strOutput . strtoupper(substr($strInput, $iPosition, 1));
		$strOutput = $strOutput . strtolower(substr($strInput, $iPosition + 1, $iSpace - $iPosition));
		$iPosition = $iSpace + 1;
	}
	$strOutput = $strOutput . strtoupper(substr($strInput, $iPosition, 1));
	$strOutput = $strOutput . strtolower(substr($strInput, $iPosition + 1));
	$PCase = $strOutput;
	return $PCase;
}
function dateDiff($dformat, $endDate, $beginDate) 
{ 
           $date_parts1=explode($dformat, $beginDate); 
           $date_parts2=explode($dformat, $endDate); 
           $start_date=gregoriantojd($date_parts1[0], $date_parts1[1], $date_parts1[2]); 
           $end_date=gregoriantojd($date_parts2[0], $date_parts2[1], $date_parts2[2]); 
           return $end_date - $start_date; 
} 

function item_existing_qty($tab,$qty,$cond)
{
	$sql="";
	$sql="select sum($qty) as $qty from $tab  $cond";
	//echo "select sum($qty) as $qty from $tab  $cond";
	$resqty=mysql_query($sql);
	if($rsqty=mysql_fetch_array($resqty))
	{
		$a_qty=$rsqty[$qty];
	}
	return $a_qty;
}

function datetimediff($interval, $datefrom, $dateto, $using_timestamps = false) 
{ 
	 /*    $interval can be: 
	yyyy - Number of full years  
	q - Number of full quarters  
	m - Number of full months  
	y - Difference between day numbers 
	
		 (eg 1st Jan 2004 is "1", the first day. 2nd Feb 2003 is "33". The datediff is "-32".)  
	d - Number of full days 
	w - Number of full weekdays  
	ww - Number of full weeks  
	h - Number of full hours   
	n - Number of full minutes   
	s - Number of full seconds (default)  */  
  	 if (!$using_timestamps)
	 {    
		 $datefrom = strtotime($datefrom, 0); 
  		 $dateto = strtotime($dateto, 0);
     } 
	 $difference = $dateto - $datefrom; 
	// Difference in seconds 
  
  	switch($interval) 
	{     
		 case 'yyyy': // Number of full years     
					 $years_difference = floor($difference / 31536000);     
 					 if (mktime(date("H", $datefrom), date("i", $datefrom), date("s", $datefrom), date("n", $datefrom), date("j", $datefrom), date("Y", $datefrom)+$years_difference) > $dateto) 
					 {        $years_difference--;      }    
  					 if (mktime(date("H", $dateto), date("i", $dateto), date("s", $dateto), date("n", $dateto), date("j", $dateto), date("Y", $dateto)-($years_difference+1)) > $datefrom)
 					 {        $years_difference++;      }   
   					 $datediff = $years_difference;  
					 break; 
	    case "q": // Number of full quarters     
					 $quarters_difference = floor($difference / 8035200); 
					 while (mktime(date("H", $datefrom), date("i", $datefrom), date("s", $datefrom), date("n", $datefrom)+($quarters_difference*3), date("j", $dateto), date("Y", $datefrom)) < $dateto)
					 {        $months_difference++;      }    
					 $quarters_difference--;    
					  $datediff = $quarters_difference;
					  break; 
        case "m": // Number of full months  
				    $months_difference = floor($difference / 2678400);
					while (mktime(date("H", $datefrom), date("i", $datefrom), date("s", $datefrom), date("n", $datefrom)+($months_difference), date("j", $dateto), date("Y", $datefrom)) < $dateto)
 					{        $months_difference++;      }      
					$months_difference--;    
  					$datediff = $months_difference;     
					 break; 
		case 'y': // Difference between day numbers    
  					$datediff = date("z", $dateto) - date("z", $datefrom); 
     				break;  
  		case "d": // Number of full days     
 					$datediff = floor($difference / 86400);    
  					break; 
   		case "w": // Number of full weekdays  
        			 $days_difference = floor($difference / 86400); 
    				 $weeks_difference = floor($days_difference / 7); // Complete weeks  
   					 $first_day = date("w", $datefrom); 
    				 $days_remainder = floor($days_difference % 7);   
  					 $odd_days = $first_day + $days_remainder; // Do we have a Saturday or Sunday in the remainder?
   					 if ($odd_days > 7) 
					 { // Sunday    
				    	$days_remainder--; 
					 }   
   					 if ($odd_days > 6) 
					 { 
						// Saturday 
					    $days_remainder--;
				     }    
  					 $datediff = ($weeks_difference * 5) + $days_remainder; 
     				 break;   
 		case "ww": // Number of full weeks 
    				 $datediff = floor($difference / 604800); 
     				  break; 
   		case "h": // Number of full hours  
   					 $datediff = floor($difference / 3600); 
		 			 break;  
  		case "n": // Number of full minutes 
					 $datediff = floor($difference / 60); 
					 break; 
   		default: // Number of full seconds (default)  
    				$datediff = $difference;     
					 break; 
	 }    
  return $datediff;
}
function fNumToStr($wNum)
{
//echo "<br>Given Number =".$wNum;
$wNum1 = number_format(floatval($wNum),2,".","");
//echo "<br>Round Number =".$wNum1;
$wNumlf = substr($wNum1,0,(strlen($wNum1)-3));
$wNumld = substr($wNum1,(strlen($wNum1)-2));
//echo "<br>Int number =".$wNumlf;
//echo "<br>Int number =".$wNumld;
$wStr = " ";
if (strlen($wNumlf) == 8)
{
    if(is_null(fNum1(substr($wNumlf,0,1))) or substr($wNumlf,0,1)=="0")
		{ $wStr = $wStr.""; }
	else { $wStr = $wStr.fNum1(substr($wNumlf,0,1)) . " Crore"; }
    $wNumlf = substr($wNumlf,-7);
}
if (strlen($wNumlf) == 7)
{
    if(is_null(fNum1(substr($wNumlf,0,1))) or substr($wNumlf,0,1)=="0")
		{ $wStr = $wStr."";}
	else { $wStr = $wStr.fNum2(substr($wNumlf,0,2)) . " Lac"; }
    $wNumlf = substr($wNumlf,-5);
}
if (strlen($wNumlf) == 6)
{
    if(is_null(fNum1(substr($wNumlf,0,1))) or substr($wNumlf,0,1)=="0")
		{ $wStr = $wStr."";}
	else { $wStr = $wStr.fNum1(substr($wNumlf,0,1)) . " Lac"; }
    $wNumlf = substr($wNumlf,-5);
}
if (strlen($wNumlf) == 5)
{
    if(is_null(fNum1(substr($wNumlf,0,1))) or substr($wNumlf,0,1)=="0" and substr($wNumlf,1,1)=="0")
		{ $wStr = $wStr."";}
	else { $wStr = $wStr.fNum2(substr($wNumlf,0,2))." Thousand"; }
    $wNumlf = substr($wNumlf,-3);
}
if (strlen($wNumlf) == 4)
{
    if(is_null(fNum1(substr($wNumlf,0,1))) or substr($wNumlf,0,1)=="0")
		{ $wStr = $wStr."";}
	else { $wStr = $wStr.fNum1(substr($wNumlf,0,1))." Thousand"; }
    $wNumlf = substr($wNumlf,-3);
}
if (strlen($wNumlf) == 3)
{
    if(is_null(fNum1(substr($wNumlf,0,1))) or substr($wNumlf,0,1)=="0")
		{ $wStr = $wStr."";}
	else {$wStr = $wStr.fNum1(substr($wNumlf,0,1))." Hundred"; }
	$wNumlf = substr($wNumlf,-2);
}

if (strlen($wNumlf) == 2)
{
    $wStr = $wStr.fNum2(substr($wNumlf,0,2));
    $wNumlf = "";
}

If (strlen($wNumlf) == 1)
{
    $wStr = $wStr.fNum1(substr($wNumlf,0,1));
}

if (substr($wNumld,0,2) == "00")
{ $wStr = $wStr." And Paise Zero Only" ; }
else
{ $wStr = $wStr." And ".fNum2($wNumld)." Paise Only" ; }

return $wStr;
}

function fNum2($ws2)
{
	$wlfs2 = trim(substr($ws2,0,1));
	if ($wlfs2 == "1")
	{
	   switch ($ws2)
	   {
		   case "11" :
				 return (" Eleven");
				 break;
		   case "12" :
				 return (" Twelve");
				 break;
		   case "13" :
				 return (" Thirteen");
				 break;
		   case "14" :
				 return (" Fourteen");
				 break;
		   case "15" :
				 return (" Fifteen");
				 break;
		   case "16" :
				 return (" Sixteen");
				 break;
		   case "17" :
				 return (" Seventeen");
				 break;
		   case "18" :
				 return (" Eighteen");
				 break;
		   case "19" :
				 return (" Ninteen");
				 break;
		   case "10" :
				 return (" Ten");
				 break;
		}
	}

	$wRts2 = substr($ws2,-1);
	switch ($wlfs2)
	{
	   case "0" :
			return(fNum1($wRts2));
			break;
	   case "2" :
			return(" Twenty".fNum1($wRts2));
			break;
	   case "3" :
			return(" Thirty".fNum1($wRts2));
			break;
	   case "4" :
			return(" Fourty".fNum1($wRts2));
			break;
	   case "5" :
			return(" Fifty".fNum1($wRts2));
			break;
	   case "6" :
			return(" Sixty".fNum1($wRts2));
			break;
	   case "7" :
			return(" Seventy".fNum1($wRts2));
			break;
	   case "8" :
			return(" Eighty".fNum1($wRts2));
			break;
	   case "9" :
			return(" Ninty".fNum1($wRts2));
			break;
	}
}

function fNum1($ws1)
{
	switch ($ws1)
	{
	   case "0" :
			return("");
			break;
	   case "1" :
			return(" One");
			break;
	   case "2" :
			return(" Two");
			break;
	   case "3" :
			return(" Three");
			break;
	   case "4" :
			return(" Four");
			break;
	   case "5" :
			return(" Five");
			break;
	   case "6" :
			return(" Six");
			break;
	   case "7" :
			return(" Seven");
			break;
	   case "8" :
			return(" Eight");
			break;
	   case "9" :
			return(" Nine");
			break;
	}
}
/*************************************************************************************************************************/

function construct_path($conpath) //Function to construct file folder path 
 {
		$conpathx=explode("/",$conpath);
		$lenconpath=count($conpathx);
		$actlen=$lenconpath-1;									
		$firstdir="";
		
		for($i=0;$i<=$actlen;$i++)
		{
			if($conpathx[$i]=="..")
			{
						if($i==0)
						{
						$firstdir=$conpathx[$i];
						}
						else
						{
						$firstdir=$firstdir."/".$conpathx[$i];
						}
							//echo $i."a ".$firstdir."<br>";
			}
			else
			{							
						if($i==0)
						{
							$firstdir=$conpathx[$i];
						}
						else
						{
							$firstdir=$firstdir."/".$conpathx[$i];	
						}						
											if(!is_dir($firstdir))
											{
											  mkdir($firstdir, 0777);
											}
							//echo $i."b ".$firstdir."<br>";		
			}
		}

				$retpath=$conpath."/";
				return $retpath;
}

/*************************************************************************************************************************/
/*************************************************************************************************************************/

function uploadinput($passarr) //Function to Upload file using ajax  
{			
	
		/*	
			As soon as any file is selected for upload all its details are displayed instantly
		
			show_photo--------          Photo path to be displayed by default
			conpathh----------			Folder Path where file is to be stored
			newfilenm---------			New name of file for storing
			filenameup--------			Name of upload file input
			divupload---------			Name of DIV tag where loading is to be done
			storetable--------			Name of database table to save file path
			storefield--------			Name of database field of table to save path
			storecondn--------			Condition in datanbase for saving file path
			uploadbuttonname--			Title Name of button for upload
			message-----------			Message to be diplayed below
			browsecolspan-----			Colspan of table cell for browese functionality
			loadcolspan-------			Colspan of table cell where uploading is to be done
			filesupport-------			Supported file Extensions separated by comma
			horisize----------			Horizontal pixel size of image 
			vertisize---------			Vertical pixel size of image  .. if Both sizes are empty then size not checked
			resize------------			When set to 'Yes' then image is resized to give size using Checkbox status
			showaspect--------			When set to 'Yes' displays imge i proportion of ( 120 width : Whatever calculated height or shows original or specified)
			sizeswap--------			When set to 'Yes' allows to swap image size between horizontal size and vertical size
			specialprocess--------		When set to 'Yes' Provides panel for more image procesing options
										Like Black white Image, Image Rotate, Image Flip horizontal and vertical
										Providing Upload time image processing
										
			formnm----------------		This can be set to form no in document where upload component is defined.							
		*/
				
				 if($passarr['formnm']=="")
				 {
				 	$formnm=0;
				 }
				 else
				 {
				 	$formnm=$passarr['formnm'];
				 }
				 
				 
				 echo'<script type="text/javascript" src="../uploaderscripts/scripts/ajaxupload.js"></script>';
				 echo '<script language="JavaScript">if(!document.forms['.$formnm.']) { alert("Upload Msg...HTML <FORM></FORM> MUST BE DEFINED ON PAGE") }</script>';
					
					$filenameup=$passarr['filenameup'];
					$filenamckbx=$filenameup."ckbx";
					$filenamswap=$filenameup."swap";
					$filenamhid=$filenameup."hid";
					$filenamhidsp=$filenameup."hidsp";
					
					$filenamblwh=$filenameup."blwh";
					$filenamhidbw=$filenameup."hidbw";
					$filenamrot=$filenameup."rot";
					$filenamhidrot=$filenameup."hidrot";
					
					$filenamflop=$filenameup."flop";
					$filenamhidflop=$filenameup."hidflop";

					
					$filenamflip=$filenameup."flip";
					$filenamhidflip=$filenameup."hidflip";
					
					$filenamreturn=$passarr['newfilenm']."ret";
					$forreturnfl='<br><input name="'.$filenamreturn.'"  type="text" value="UPLOADED FILE NAME IN document.forms['.$formnm.'].'.$filenamreturn.'" style="width:400"  readonly><br>';
				
				
				echo '<input name="'.$filenamhid.'"  type="hidden" value="No">' ;
				echo '<input name="'.$filenamhidsp.'"  type="hidden" value="No">' ;
				echo '<input name="'.$filenamhidbw.'"  type="hidden" value="No">' ;
				echo '<input name="'.$filenamhidrot.'"  type="hidden" value="No">' ;
				echo '<input name="'.$filenamhidflop.'"  type="hidden" value="No">' ;
				echo '<input name="'.$filenamhidflip.'"  type="hidden" value="No">' ;


				
				$rotater=$filenameup.'rotdeg';
				
				$horizontal=$passarr['horisize'];
				$vertical=$passarr['vertisize'];
				$show_photo=$passarr['show_photo'];
//  				echo "**".$show_photo;
				$aspect=$passarr['showaspect'];
				if($show_photo!="") {	$extension=explode(".",$show_photo); 
						if(substr_count("jpg,jpeg,gif,png,bmp",strtolower($extension[count($extension)-1]))>0)
						{	
							//if(($horizontal=="")and($vertical==""))	
							{ 
								if(file_exists($show_photo))
								{
								$imagesize=getimagesize($show_photo); 
								$horizontal=$imagesize[0]; $vertical=$imagesize[1];
								
								}
							}
								
								if($aspect=="Yes")
								{	if(file_exists($show_photo))
									{
									$imagesize=getimagesize($show_photo);
									$horizontal=120;	$vertical=((120 * $imagesize[1])/$imagesize[0]);
									}
								}
						
						
						$showw="<img  src='".$show_photo."' width='".$horizontal."' height='".$vertical."' border='1' onClick='forwin(\"$show_photo\")' style='cursor:hand'>".$forreturnfl;	}
					else{	$showw="<img src='../uploaderscripts/images/edit.gif' width='45' height='45' border='0' style='marin-bottom: -4px;' onClick='forwin(\"$show_photo\")' style='cursor:hand'/>.".strtolower($extension[count($extension)-1])."&nbsp;&nbsp;<label onClick='forwin(\"$show_photo\")' style='cursor:hand'><font color='#AA0000'><b><i>VIEW FILE</i></b></font></label>".$forreturnfl;} //"<b>.".strtolower($extension[count($extension)-1])." FILE"."</b>";	}
									}
							else    {	$showw="<b><i>UPLOAD IMAGE/FILE...</i></b>".$forreturnfl;				}
?>	
<?
						
						$conpth=$passarr['conpathh'];
						$pathh=construct_path($conpth);
						
						$newfilenm=$passarr['newfilenm'];
				
				//Variables for file path database storage ----
				$storetable=$passarr['storetable'];		$storefield=$passarr['storefield'];	$storecondn=$passarr['storecondn'];
				$storecondn=str_replace("'","\'",$storecondn);
				//----
				$browsecolspan=$passarr['browsecolspan'];
				$filenameup=$passarr['filenameup'];
				$loadcolspan=$passarr['loadcolspan'];
				$divupload=$passarr['divupload'];
				$uploadbuttonname=$passarr['uploadbuttonname'];
				$filesupport=$passarr['filesupport'];
				$message=$passarr['message'];
// 				echo "**".$show_photo;
				
				$horizontal=$passarr['horisize'];
				$vertical=$passarr['vertisize'];
				$resize=$passarr['resize'];
				if($resize=="Yes") {	$resizemsg="<br>(Check For Resize while Upload- <input name='".$filenamckbx."' id='".$filenamckbx."' type='checkbox' checked value='' onClick='checkforresize(\"$filenamhid\",\"$filenamckbx\",\"$formnm\")'>)";	} else {	$resizemsg="";		}
				
				$sizeswap=$passarr['sizeswap'];
				if($sizeswap=="Yes")
				{
				$swapper="<input name='".$filenamswap."' id='".$filenamswap."' type='checkbox' value='' onClick='checkforswap(\"$filenamhidsp\",\"$filenamswap\",\"$formnm\")'>";
	if(($horizontal<=500)or($vertical<=500)){ $sizemsg2="<br>(Allow Swap Image Size ".$vertical." X ".$horizontal." ".$swapper.")"; } else { $sizemsg2=""; }
				}

	if(($horizontal<=500)or($vertical<=500)){ $sizemsg="Image Size ".$horizontal." X ".$vertical." ".$sizemsg2." ".$resizemsg; } else { //$sizemsg="Image Size Upto 600 x 400";
if($resize=="Yes") {	$sizemsg="Image Size Upto 600 x 400<br>(Check For Resize while Upload- <input name='".$filenamckbx."' id='".$filenamckbx."' type='checkbox' checked value='' onClick='checkforresize(\"$filenamhid\",\"$filenamckbx\",\"$formnm\")'>)";	} else {	$resizemsg="";		}
				
 }
				
				
				$btnid=$divupload."btn";
				$delbtn=$divupload."del";
				$funcncc=	'onchange="imagesizex(this.form,\'../uploaderscripts/scripts/retrnsize.php?filename='.$filenameup.'&tagg='.$divupload.'\',\''.$divupload.'\',\'............\',\'\')"';

				echo '<tr class="tr1"><td width="40%" colspan="'.$browsecolspan.'"><input type="file" name="'.$filenameup.'" id="'.$filenameup.'" size="40"   '.$funcncc.'/></td>'; 
				$filenameup=$filenameup;
				echo '<td rowspan="4" align="center" colspan="'.$loadcolspan.'" valign="center"  >
			<div id="'.$divupload.'" name="'.$divupload.'" valign="center">'.$showw.'</div></td></tr>';
				$divupload=$divupload;
				echo '<tr class="tr1"><td height="10" colspan="'.$browsecolspan.'" align="center">* Browse,Select a file and click button below</td></tr>';
				echo '<tr class="tr1"><td align="center" colspan="'.$browsecolspan.'">';
?><input name="<?=$btnid?>" id="<?=$btnid?>" type="button" class="button" onClick="ajaxUpload(this.form,'../uploaderscripts/scripts/imageupload.php?filename=<?=$filenameup?>&amp;maxSize=9999999999&amp;maxW=200&amp;fullPath=../php_ajax_image_upload/uploads/&amp;relPath=../<?=$pathh?>&amp;showPath=<?=$pathh?>&amp;storetab=<?=$storetable?>&amp;storefld=<?=$storefield?>&amp;storecond=<?=$storecondn?>&amp;newfilenm=<?=$newfilenm?>&amp;support=<?=$filesupport?>&amp;tagg=<?=$divupload?>&amp;hori=<?=$horizontal?>&amp;verti=<?=$vertical?>&amp;resize=<?=$resize?>&amp;aspect=<?=$aspect?>&amp;colorR=255&amp;colorG=255&amp;colorB=255&amp;maxH=300','<?=$divupload?>','File Uploading Please Wait...&lt;br /&gt;&lt;img src=\'../uploaderscripts/images/loader_light_blue.gif\' width=\'128\' height=\'15\' border=\'0\' /&gt;','&lt;img src=\'../uploaderscripts/images/error.gif\' width=\'16\' height=\'16\' border=\'0\' /&gt; Error in Upload, check settings and path info in source code or Simultaneous Upload Process Error.','<?=$filenamhid?>','<?=$filenamhidsp?>','<?=$filenamhidbw?>','<?=$filenamhidrot?>','<?=$rotater?>','<?=$filenamhidflop?>','<?=$filenamhidflip?>','<?=$formnm?>');  settarg('<?=$formnm?>'); return false; " value="<?=$uploadbuttonname?>" style="width:250;cursor:hand"> 
	<input name="<?=$delbtn?>" id="<?=$delbtn?>" type="button" class="button" onClick="ajaxUpload(this.form,'../uploaderscripts/scripts/imageupload.php?filename=<?=$filenameup?>&amp;maxSize=9999999999&amp;maxW=200&amp;fullPath=../php_ajax_image_upload/uploads/&amp;relPath=../<?=$pathh?>&amp;showPath=<?=$pathh?>&amp;storetab=<?=$storetable?>&amp;storefld=<?=$storefield?>&amp;storecond=<?=$storecondn?>&amp;newfilenm=<?=$newfilenm?>&amp;support=<?=$filesupport?>&amp;tagg=<?=$divupload?>&amp;hori=<?=$horizontal?>&amp;verti=<?=$vertical?>&amp;resize=<?=$resize?>&amp;aspect=<?=$aspect?>&amp;deletion=del&amp;colorR=255&amp;colorG=255&amp;colorB=255&amp;maxH=300','<?=$divupload?>','File Uploading Please Wait...&lt;br /&gt;&lt;img src=\'../uploaderscripts/images/loader_light_blue.gif\' width=\'128\' height=\'15\' border=\'0\' /&gt;','&lt;img src=\'../uploaderscripts/images/error.gif\' width=\'16\' height=\'16\' border=\'0\' /&gt; Error in Upload, check settings and path info in source code or Simultaneous Upload Process Error.','<?=$filenamhid?>','<?=$filenamhidsp?>','<?=$filenamhidbw?>','<?=$filenamhidrot?>','<?=$rotater?>','<?=$filenamhidflop?>','<?=$filenamhidflip?>','<?=$formnm?>');  settarg('<?=$formnm?>'); return false; " value="Delete" style="width:50;cursor:hand"> 
	<?
	echo '<br><br><font color="#BB0000"><b>'.$sizemsg.'<br>Supported File Types: '.$filesupport.'</b></font><br>'; 	
	if($passarr['specialprocess']=="Yes")
	{
	echo '<table class="sample" width="100%"><tr><td>&nbsp;<b>(B/W)=</b>'."<input name='".$filenamblwh."' id='".$filenamblwh."' type='checkbox' value='' onClick='checkforbw(\"$filenamhidbw\",\"$filenamblwh\",\"$formnm\")'> <b> | Rotate=</b> ";
	echo "<input name='".$filenamrot."' id='".$filenamrot."' type='checkbox' value='' onClick='checkforrot(\"$filenamhidrot\",\"$filenamrot\",\"$formnm\")'>".'<input name="'.$rotater.'" id="'.$rotater.'" type="text" style="width:80" value="90"/>(+/-Deg)';
	echo "</td></tr><tr><td>&nbsp;<b>FLIP HORI=</b><input name='".$filenamflop."' id='".$filenamflop."' type='checkbox' value='' onClick='fliphori(\"$filenamhidflop\",\"$filenamflop\",\"$formnm\")'>&nbsp;<b> | FLIP VERTI=</b><input name='".$filenamflip."' id='".$filenamflip."' type='checkbox' value='' onClick='flipverti(\"$filenamhidflip\",\"$filenamflip\",\"$formnm\")'>";
	echo '</td></tr></table></td></tr>'; 	
	}
	else
	{
	echo '</td></tr>';
	}			

		if(($horizontal<>"")or($vertical<>"")) {	$aspectratio=($vertical/$horizontal);		} else {	$aspectratio="";		}
echo '<script language="JavaScript"> function view_img_cropper'.$filenameup.'() { winMain = open("","commonimgcropper","height=800,width=1500,directories=no,location=no,menubar=no,minimize=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no"); winMain.location="../uploaderscripts/cropimages/cropper_index.php?storetable='.$storetable.'&storefield='.$storefield.'&storecondn='.$storecondn.'&conpth='.$conpth."/".$newfilenm.'&aspectratio='.$aspectratio.'&filesupport='.$filesupport.'"; } </script>';
echo'<tr class="tr1"><td  colspan="'.$ttclspn.'" align="center"><input name="" type="button" class="button" onclick="view_img_cropper'.$filenameup.'(\''.$storetable.'\',\''.$storefield.'\',\''.$storecondn.'\',\''.$conpth.'\',\''.$aspectratio.'\',\''.$filesupport.'\')" value="CROPPER" /></td></tr>';	
				
				$ttclspn=$browsecolspan + $loadcolspan;
				if($message<>"") {		$message='<font color="#FF0000">*</font><b>'.$message.'</b>'; } else {	$message="";	}
				echo'<tr class="tr1"><td  colspan="'.$ttclspn.'" align="center">'.$message.'</td></tr>';			
				
	}

/*************************************************************************************************************************/

function show_html_pdf($vars)

{

	/*

	matter an array as follows

	[0] name of file name if filename called or HTML DATA

	[1] Method by which external file will be called POST or GET

	[2] Post or get paramaters to be passed to called file [[[Again and Associated array with name value pairs]]]

	

	btn_nm Name of Button appearing for Pdf print popup

	paper_size PAPER SIZES PARAM Values

4a0,2a0,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,c0,c1,c2,c3

c4,c5,c6,c7,c8,c9,c10,ra0,ra1,ra2,ra3,ra4,sra0,sra1,sra2,sra3,sra4,letter,legal,ledger,

tabloid,executive,folio,commercial #10 envelope,catalog #10 1/2 envelope,8.5x11,8.5x14,

11x1

	orient ORIENTATION PARAM Values

	portrait , landscape

	mode MODE PARAM Values

	Button , Redirect

	page_nm PARAM Values

	if Empty No Downloadable attachment if specified then Downloadable format

	pass_type PARAM Values filenm_self , filenm_external , matter

			// if filenm_self then page under process

			// if filenm_external then page stated in matter 

			// if matter then passed HTML in $matter

	*/	

	$subpass=""; 

	if($_GET[html_pdf_subpass]=="YES") 

	{ $subpass="YES";	} 

	elseif($_POST[html_pdf_subpass]=="YES") 

	{ $subpass="YES";	}

	

	if($subpass=="")

	{

	$matter=$vars['matter'][0];

	$btn_nm=$vars['btn_nm'];

	$paper_size=$vars['paper_size'];

	$orient=$vars['orient'];

	$mode=$vars['mode'];

	$page_nm=$vars['page_nm'];

	$pass_type=$vars['pass_type'];

	$css=$vars['css'];

							

	$mx="";	

	$varsx="";

	$i=1;

	foreach($vars['matter'][2] as $var1 => $var2)

	{

		if($i<count($vars['matter'][2])) { $varsx.=$var1."@".$var2."@"; } else {  $varsx.=$var1."@".$var2;	}

		$i++;

	}

	

	if($pass_type!="matter")

	{	
		$mx.='<iframe id="'.str_replace(" ","_",$btn_nm).'ifrm" src="../dompdf/www/file_exect.php?filenm='.$matter.'&grtpost='.$vars['matter'][1].'&vars='.$varsx.'" style="visibility:hidden"  height="0" width="0" ></iframe>';

	}

		

		$mx.="<script language='JavaScript'>";

		$mx.=" function ".str_replace(" ","_",$btn_nm)."_isfuncn() { ";

	

	if($pass_type!="matter")

	{	

		//$mx.=" document.getElementById('".str_replace(" ","_",$btn_nm)."ifrm').src='../dompdf/www/file_exect.php?filenm=".$matter."&grtpost=".$vars['matter'][1]."&vars=".$varsx."'; ";

		$mx.=" writeout('".str_replace(" ","_",$btn_nm)."','".$pass_type."','".$css."');"; 

	}

		

		//$mx.= 'winSel = winOpen("../dompdf/www/demo1.php?paper='.$paper_size.'&orient='.$orient.'&page_nm='.$page_nm.'&fld_nm='.str_replace(" ","_",$btn_nm).'hiddn","oWin","900","400");';

		$mx.='open("../dompdf/www/demo1.php?paper='.$paper_size.'&orient='.$orient.'&page_nm='.$page_nm.'&fld_nm='.str_replace(" ","_",$btn_nm).'hiddn","commontyup","height=400,width=900,directories=no,location=no,menubar=no,minimize=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toolbar=no")';

		$mx.= "}";

		

		$mx.=" function ".str_replace(" ","_",$btn_nm)."_isldhtmlfuncn() { ";

		

		$mx.= "}";

		$mx.= "</script>";

		echo $mx;

	if($mode=="Button")

	{	

		echo '<input type="button" class="button" id="'.str_replace(" ","_",$btn_nm).'btn" name="'.str_replace(" ","_",$btn_nm).'btn" value="'.$btn_nm.'" onClick="'.str_replace(" ","_",$btn_nm).'_isfuncn()" style="width:150" >';

	}
	elseif($mode=="Link")
	{
		echo '<label  style="cursor:hand" id="'.str_replace(" ","_",$btn_nm).'btn" name="'.str_replace(" ","_",$btn_nm).'btn"  onClick="'.str_replace(" ","_",$btn_nm).'_isfuncn()"  ><font color="#0000FF" >'.$btn_nm.'</font></label>';

	}	

		echo '<label style="visibility:hidden"><textarea name="'.str_replace(" ","_",$btn_nm).'hiddn" id="'.str_replace(" ","_",$btn_nm).'hiddn" cols="0" rows="0">'.$matter.'</textarea></label>';

	

	if($mode=="Redirect")

	{

		$mx=  "<script language='JavaScript'> ";

		$mx.=  str_replace(" ","_",$btn_nm)."_isfuncn(); ";

		$mx.= "</script>";

		echo $mx;

	}	

	}



}
function getcalendar_limit($calend_month_lmt,$calend_year_lmt,$calend_week_lmt,$calend_day_lmt,$calend_day_range,$date_field)
{
	//Returns Ready Date Input in required format & Limits. FUNCTION  $erroroccured="";
	if($date_field=="")
	{  	
		echo "<script language='JavaScript'>alert('DATE FIELD NAME REQUIRED(Param[6])')</script>"; $erroroccured="ERROR OCCURED";
	}
	else
	{
		echo "<script language='JavaScript'>if(document.getElementById('".$date_field."'))alert('".$date_field." DATE FIELD REPEATED(Param[6])')</script>";
	}
	$date_fieldnm1=$date_field;
	$date_fieldnm2='non'.'$'.$date_field;
	
	$disame=strtoupper($date_field)." DATE";
	$btnnme=$date_field."_btn";

if($calend_day_range!="-")
{	
	
	if($calend_day_range<>"")
	{
		$calend_month_lmt=""; $calend_year_lmt=""; 
		$caledrngrevdt=""; $caledrngrevprev=""; $caledrngrevnxt="";
		  if(count(explode('-',$calend_day_range))<>3) 
		  {	
echo "<script language='JavaScript'>alert('PLEASE CHECK CALENDAR DAY RANGE PARAMATER FOR $date_field DATE(Param[5])')</script>";	$erroroccured="ERROR OCCURED";
		  }
		
		  $expldrng=explode('-',$calend_day_range);
		  if($expldrng[0]<>"TODAY")
		  {
			  if(count(explode('/',$calend_day_range))<>3) 
			  {	
	echo "<script language='JavaScript'>alert('PLEASE CHECK CALENDAR DAY RANGE PARAMATER FOR $date_field DATE(Param[5])')</script>";	$erroroccured="ERROR OCCURED";
				
			  }
			  else
			  {
			  	
				$ckexp=explode("/",$expldrng[0]);
				if(strlen($ckexp[0])<>4) 
						{			
	echo "<script language='JavaScript'>alert('PLEASE CHECK CALENDAR DAY RANGE PARAMATER FOR $date_field DATE \\nDate should be in YYYY\/MM\/DD format(Param[5])')</script>";	$erroroccured="ERROR OCCURED";
						}
			  
			  }
		 		
				$caledrngrevdt=$expldrng[0];
		  }
		  else
		  {
		  $caledrngrevdt=date('Y/m/d');	
		  }

		$beginDate=($_SESSION[fyr]-1)."/04/01"; $endDate=$_SESSION[fyr]."/03/31";
		if(($expldrng[1]=='FIN')or($expldrng[2]=='FIN'))
		{
			if((dateDiff11("/",$beginDate,$caledrngrevdt)<0)or(dateDiff11("/",$caledrngrevdt,$endDate)<0))
			{
	echo "<script language='JavaScript'>alert('PLEASE CHECK CALENDAR DAY RANGE PARAMATER FOR $date_field DATE \\n REFERENCE DATE IS NOT IN FINANCIAL YEAR(Param[5])')</script>"; $erroroccured="ERROR OCCURED";
			}
		}
		if($expldrng[1]<>'FIN') { $caledrngrevprev=$expldrng[1]; } else {	$caledrngrevprev=dateDiff11("/",$beginDate,$caledrngrevdt) ; }
		if($expldrng[2]<>'FIN') { $caledrngrevnxt=$expldrng[2]; } else {	$caledrngrevnxt=dateDiff11("/",$caledrngrevdt,$endDate) ;	 }
				$calend_day_range=$caledrngrevdt."-".$caledrngrevprev."-".$caledrngrevnxt;
	}
	else 
	{
		if($calend_month_lmt<>"") 
		{	 
		  if(count(explode('-',$calend_month_lmt))<>3) 
		  {	
echo "<script language='JavaScript'>alert('PLEASE CHECK CALENDAR MONTH LIMIT PARAMATER FOR $date_field DATE(Param[1])')</script>";	$erroroccured="ERROR OCCURED";	
		  }
		}
	
		if($calend_year_lmt<>"") 
		{	 
		  if(count(explode('-',$calend_year_lmt))<>3) 
		  {	
echo "<script language='JavaScript'>alert('PLEASE CHECK CALENDAR YEAR LIMIT PARAMATER FOR $date_field DATE(Param[2])')</script>";	$erroroccured="ERROR OCCURED";	
		  }
		}
	}
	
	if($calend_week_lmt<>"")
	{
		$wexp=explode("-",$calend_week_lmt);
		foreach($wexp as $wexp1) 
		{	
		if(($wexp1<1)or($wexp1>7)) {	echo "<script language='JavaScript'>alert('PLEASE CHECK CALENDAR WEEK LIMIT PARAMATER FOR $date_field DATE\\nWeeks should be between 1 & 7(Param[3])')</script>";	$erroroccured="ERROR OCCURED";	
								   }				
		}
	}
	
	if($calend_day_lmt<>"")
	{
		$wexp=explode("-",$calend_day_lmt);
		foreach($wexp as $wexp1) 
		{	
		if(($wexp1<1)or($wexp1>31)) {	echo "<script language='JavaScript'>alert('PLEASE CHECK CALENDAR DAY LIMIT PARAMATER FOR $date_field DATE\\n days should be between 1 & 31(Param[4])')</script>";	$erroroccured="ERROR OCCURED";	
								   }				
		}
	}
	$calend_limit=$calend_month_lmt.','.$calend_year_lmt.','.$calend_week_lmt.','.$calend_day_lmt.','.$calend_day_range;
}
else
{
	$calend_limit="-";
}	
	
if(($calend_month_lmt=="")and($calend_year_lmt=="")and($calend_week_lmt=="")and($calend_day_lmt=="")and($calend_day_range==""))
	{
	$retcalend= '<input type="text" id="'.$date_fieldnm2.'" name="'.$date_fieldnm2.'" value=""  disname="'.$disame.'" readonly>
	<input name="'.$btnnme.'" type="button" class="button" onClick="selectDate_lmt(\''.$date_fieldnm2.'\',\''.$date_fieldnm1.'\')" value="Select Date..." style="width:100" > 
	<input type="hidden" id="'.$date_fieldnm1.'" name="'.$date_fieldnm1.'" value="" >';
	}
	else
	{
	$retcalend= '<input type="text" id="'.$date_fieldnm2.'" name="'.$date_fieldnm2.'" value=""  disname="'.$disame.'" readonly>
	<input name="'.$btnnme.'" type="button" class="button" onClick="selectDate_lmt(\''.$date_fieldnm2.'\',\''.$date_fieldnm1.'\',\''.$calend_limit.'\')" value="Select Date..." style="width:100" > 
	<input type="hidden" id="'.$date_fieldnm1.'" name="'.$date_fieldnm1.'" value="" >';
	}
		if($erroroccured!="") { return $erroroccured; } else { return $retcalend; }
}
?>