
<html>
<head>
<title>JaoAudit Receipt Application</title>

</head>
<body>
<?php
    //ini_set('display_errors', '1');
    require_once('conn.php');

    $ydate=$_REQUEST['tdate'];
	$yreceivedfrom=$_REQUEST['receivedfrom'];
	$yreceivedfrom=addslashes($yreceivedfrom);
	$ycompanyrepresented=addslashes($_REQUEST['companyrepresented']);
	$ycompanyrepresented2=addslashes($_REQUEST['companyrepresented2']);
	$yemail=$_REQUEST['email'];
	$ysumof=addslashes($_REQUEST['sumof']);
	$ysumof2=addslashes($_REQUEST['sumof2']);
	$ypaymentfor=addslashes($_REQUEST['paymentfor']);
	$yamountinvolved=addslashes($_REQUEST['amountinvolved']);

	if ($yreceivedfrom !='')
	{
        $result = mysql_query("select * from receiptinfo",$theConn);
		$no_fields=mysql_num_rows($result);
		$yid=$no_fields;
		if  ($yid=='0')
		   $yid='1';
		 else
		   $yid++;

		$yid='000'.$yid;

    	$rs = mysql_query("insert into receiptinfo set receiptID='$yid', vdate=now(), receivedfrom='$yreceivedfrom', companyrep='$ycompanyrepresented', emailaddress='$yemail', inthesumof='$ysumof', beingpaymentfor='$ypaymentfor', amountinvolved='$yamountinvolved'",$theConn);

	 if (!$rs)
	  die('SYSTEM ERROR: '.mysql_error().'</a>');
	 else
        {
	 	  $space1='
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;';
		  if(strlen($ycompanyrepresented2)>0)
		  {
           $str1=stripslashes($ycompanyrepresented);
           $str2=stripslashes($ycompanyrepresented2);
           $str2='<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$str2;
		   $ycompanyrepresented=$str1.$str2;
		  }

		  if(strlen($ysumof2)>0)
		  {
			 $tstr1=$ysumof;
			 $tstr2=$ysumof2;
			 $tstr2='<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$tstr2;
		   $ysumof=$tstr1.$tstr2;
		  }

	 	 $kk='<br>
		 <br>
		 <img src="images/jaoreceiptheader.jpg">
		 <br>
          <b><font size=4 color=red face="Arial">RECEIPT</font></b>
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  No:'.$yid.'
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$ydate.'
		  <br><br>
		 <b>Received from:</b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 '.stripslashes($yreceivedfrom). '<br><br>
		 <b>Of: </b>'.$space1.stripslashes($ycompanyrepresented).'<br><br>
		 <b>The Sum of:</b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$ysumof.'<br><br>
		 <b>Being Payment for:</b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;'.stripslashes($ypaymentfor).'<br><br>
		 <b>Cheque no/Cash: </b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;'.$yamountinvolved.'<br><br>
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  <img src="images/signs.jpg">';

		  @session_start();
		  $_SESSION['htmlfile']=$kk;

		  echo'<form method="POST" action="Receipt.php">

		  </form>
	      <script language="javascript">
	       var form = document.forms[0];form.submit();</script>';
	    }
    }
    else
     {
       require_once('jaoheader.php');
       echo "<font color=white size=4>Access Denied, contact the Administrator ...<br><br>";
	   echo "<center><br><br>";
       echo '<a href="login.php"><b><i><font color=red size=3>Click Here to Return</a><br><br><br>';
       require_once('jaofooter.php');
     }
  ?>
</body>
</html>
