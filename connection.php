<?php
function connect_to()
{
   $con = mysql_connect("localhost", "root", "")
   or die ("Could not connect to MySQL");
   mysql_select_db ("j_cable")
   or die ("Error! Could not select database");
   return $con;
}
?>