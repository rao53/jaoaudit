<?php
    //ini_set('display_errors', '1');
	require_once('conn.php');

	$vusername=$_REQUEST['username'];
	$vpassword=md5($_REQUEST['password']);

	session_start();
	$_SESSION['userid']=$vusername;
	$_SESSION['password']=$vpassword;

    if (($_SESSION['userid']!='') && ($_SESSION['password']!=''))
    {
		$rs = mysql_query("select * from users where vUserName='$vusername'",$theConn);
		if (!$rs)
			die('SYSTEM ERROR: '.mysql_error());
		$row =mysql_fetch_array($rs,MYSQL_ASSOC);
		if (!$row)
		{
		  require_once('jaoheader.php');
		  echo "<font color=white size=4><br>Invalid User Name or Password, contact the Administrator ...<br><br>";
		  echo "<center><br><br>";
		  echo '<a href="login.php"><b><i><font color=red size=2>Click Here to Return</a><br><br><br>';
		  require_once('jaofooter.php');
		  exit;
		 }
		 else
		  {
			if (($vUserName==$row['username']) && ($vPassword==$row['password']))
			{
				require_once('menu.php');
			}
			else
			{
			  require_once('jaoheader.php');
			  echo "<font color=red size=4><b>Invalid User Name or Password ...<br><br>";
			  echo "<center><br><br>";
			  echo '<a href="login.php"><b><i><font color=red size=2>Click Here to Return</a><br><br><br>';
			  require_once('jaofooter.php');
			  exit;
			}
		  }
     }
    else
      {
       require_once('jaoheader.php');
       echo "<font color=white size=4><br>You need to login to use this application ...<br><br>";
       echo '<a href="login.php"><b><i><font color=red size=2>Click Here to Login</a><br><br><br>';
       require_once('jaofooter.php');
	   exit;
	  }
?>




