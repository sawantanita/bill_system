 <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#"><b>AGRO </b></a>
          <div class="nav-collapse collapse">
            <ul class="nav pull-right">
              <li><a><i class="icon-user icon-large"></i> Welcome:<strong> <?php echo $_SESSION['SESS_LAST_NAME'];?></strong></a></li>
			 <li><a> <i class="icon-calendar icon-large"></i>
								<?php
								$Today = date('y:m:d',mktime());
								$new = date('l, F d, Y', strtotime($Today));
								echo $new;
								?>

				</a></li>
				 <li>
				 <script language="javascript" type="text/javascript">
/* Visit http://www.yaldex.com/ for full source code
and get more free JavaScript, CSS and DHTML scripts! */
<!-- Begin
var timerID = null;
var timerRunning = false;
function stopclock (){
if(timerRunning)
clearTimeout(timerID);
timerRunning = false;
}
function showtime () {
var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds()
var timeValue = "" + ((hours >12) ? hours -12 :hours)
if (timeValue == "0") timeValue = 12;
timeValue += ((minutes < 10) ? ":0" : ":") + minutes
timeValue += ((seconds < 10) ? ":0" : ":") + seconds
timeValue += (hours >= 12) ? " P.M." : " A.M."
document.clock.face.value = timeValue;
timerID = setTimeout("showtime()",1000);
timerRunning = true;
}
function startclock() {
stopclock();
showtime();
}
window.onload=startclock;
// End -->
</SCRIPT>	

				  <div class="hero-unit-clock">
		
			<form name="clock">
			<font color="white">Time: </font>&nbsp;<input style="width:150px;" type="submit" class="trans" name="face" value="">
			</form>
			  </div>
</li>
              <li><a href="../index.php"><font color="red"><i class="icon-off icon-large"></i></font> Log Out</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
	<div class="navbar navbar-inverse navbar-fixed-top" style="width:100%; height:100%">
	<br /><br /><br />
	<table width="100%" height="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
<tr height="3%" ><td bgcolor="#CA95FF" style="color:#000000"><b><?=tbl_sel_field("tbl_user_login","id",$_SESSION[userid],"comp_name")?> </b></td></tr>

  <tr>
    <td align="left" height="8%"><ul id="css3menu1" class="topmenu">
        
      <li class="topmenu"><a href="../blank.php" target="event_frm" style="height:16px;line-height:16px;"><span>MASTER</span></a>
            <ul>
			<?
			$SQLMENU = "select distinct tbl_user_view.* from tbl_user_view left join tbl_user_assign on tbl_user_assign.menuid=tbl_user_view.id  where tbl_user_assign.menuid is not null and login_flag='$_SESSION[login_flag]' and link_flag='Master' and roleid='$_SESSION[userid]' order by sequence";
			$RESMENU=mysql_query($SQLMENU);
			while($RS_MENU=mysql_fetch_array($RESMENU))
			{
			
			?>
              <li><a href="../<?=$RS_MENU[url]?>" target="event_frm"><?=$RS_MENU[name]?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>               </li>
			   
			   <?
			   }
			   ?>
             </ul>
      </li>
      <li class="topmenu"><a href="../blank.php" target="event_frm" style="height:16px;line-height:16px;"><span>TRANSACTION</span></a>   
	   <ul>
			<?
			$SQLMENU = "select distinct tbl_user_view.* from tbl_user_view left join tbl_user_assign on tbl_user_assign.menuid=tbl_user_view.id  where tbl_user_assign.menuid is not null and login_flag='$_SESSION[login_flag]' and link_flag='Transaction' and roleid='$_SESSION[userid]' order by sequence";
			$RESMENU=mysql_query($SQLMENU);
			while($RS_MENU=mysql_fetch_array($RESMENU))
			{
			
			?>
              <li><a href="../<?=$RS_MENU[url]?>" target="event_frm"><?=$RS_MENU[name]?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>          </li>
			   
			   <?
			   }
			   ?>
        </ul>
      </li>
      <li class="topmenu"><a href="../blank.php" target="event_frm" style="height:16px;line-height:16px;">REPORT</a>
	  <ul>
			<?
			$SQLMENU = "select distinct tbl_user_view.* from tbl_user_view left join tbl_user_assign on tbl_user_assign.menuid=tbl_user_view.id  where tbl_user_assign.menuid is not null and login_flag='$_SESSION[login_flag]' and link_flag='Report' and roleid='$_SESSION[userid]' order by sequence";
			$RESMENU=mysql_query($SQLMENU);
			while($RS_MENU=mysql_fetch_array($RESMENU))
			{
			
			?>
              <li><a href="../<?=$RS_MENU[url]?>" target="event_frm"><?=$RS_MENU[name]?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>          </li>
			   
			   <?
			   }
			   ?>
        </ul>
	  </li>
	 
     
</td>
  </tr>
   <tr>
			<td><iframe name="event_frm" src="../blank.php" width="100%" height="80%" frameborder="0"  scrolling="Yes"> </iframe></td></tr>
 
 
 
</table>	</div>