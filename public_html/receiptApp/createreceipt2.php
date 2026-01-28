
<html>
<head>
<title>JaoAudit Receipt Application</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" type="text/css" href="inc/odsfmStyle.css">
<script language ="JavaScript" type="text/javascript">
<!--
//

function popupReceipt(){
	wt=810;
	ht=1900;
	var optionListing = "HEIGHT="+ht+",WIDTH="+wt+",innerHeight="+ht+",innerWidth="+wt+",left=50,top=15,modal=yes,resizable=no,copyhistory=yes,menubar=yes";
	remote = window.open("receipts/receipt.html",target="_blank",optionListing);
	if (remote != null) {
	  remote.focus();
	}
}

-->
</script>
</head>
<body>
<?php
  //session_start();
  //if (($_SESSION['userid']!='') && ($_SESSION['password']!=''))
  //{
	require_once('conn.php');

	$ydate=$_REQUEST['tdate'];
	$yreceivedfrom=$_REQUEST['receivedfrom'];
	$ycompanyrepresented=$_REQUEST['companyrepresented'];
	$yemail=$_REQUEST['email'];
	$ysumof=$_REQUEST['sumof'];
	$ypaymentfor=$_REQUEST['paymentfor'];
	$yamountinvolved=$_REQUEST['amountinvolved'];

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
	 	 $kk='<br>
		 <br>
		 <img src="../images/jaoreceiptheader.jpg">
		 <br>
          <b><font size=4 color=red face="Arial">RECEIPT</font></b>
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  No:'.$yid.'<br><br>
		 <b>Received with thanks from:</b>'.'&nbsp;&nbsp;
		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 '.$yreceivedfrom. '<br><br>
		 <b>Of: </b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;'.$ycompanyrepresented.'<br><br>
		 <b>The Sum of:</b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$ysumof.'<br><br>
		 <b>Being Payment For:</b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;'.$ypaymentfor.'<br><br>
		 <b>Cash/Cheque No: </b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;'.$yamountinvolved.'<br><br>
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  <img src="../images/signs.jpg">';
		  $kk=$kk;
		  $somecontent=$kk;


		  $kmail='<br>
		  <br>
          <b><font size=4 color=red face="Arial">RECEIPT</font></b>
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  No:'.$yid.'<br><br>
		 <b>Received with thanks from:</b>'.'&nbsp;&nbsp;
		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 '.$yreceivedfrom. '<br><br>
		 <b>Of: </b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;'.$ycompanyrepresented.'<br><br>
		 <b>The Sum of:</b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$ysumof.'<br><br>
		 <b>Being Payment For:</b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;'.$ypaymentfor.'<br><br>
		 <b>Cash/Cheque No: </b>'.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;'.$yamountinvolved.'<br><br>
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

		 $receiptname=$yreceivedfrom."00".$yid.".html";
		 $fp = fopen("receipts/".$receiptname, 'w');
		 $fp2=fopen("receipts/receipt.html",'w');

		 fwrite($fp, $somecontent);

         fwrite($fp2, $somecontent);

	     fclose($fp);

         echo'<script language="javascript">JavaScript:popupReceipt(); </script> ';
         // now send the mail

            require("class.phpmailer.php");
		 	$mail = new PHPMailer();$mail = new PHPMailer();
		 	$mail->IsSMTP();
		 	$mail->Host = "mail.jaoaudit.com";
		 	$mail->SMTPAuth = true;
		 	$mail->Username = 'jaoaudit';
		 	$mail->Password = 'I4o1iUqzST';

		 	$mail->From="info@jaoaudit.com";
		 	$mail->FromName="J.A Olawin & Co.(Chartered Accountants)";
		 	$mail->Sender="info@jaoaudit.com";
		 	$mail->AddReplyTo("info@falasoftconsulting-ng.com", "Replies for my mail");

		 	$mail->AddAddress($yemail);
		 	$mail->Subject = "This is your Receipt";

		 	$mail->IsHTML(true);
		 	$mail->AddEmbeddedImage('jaoreceiptheader.jpg', 'logoimg', 'jaoreceiptheader.jpg'); // attach file logo.jpg, and later link to it using identfier logoimg
		 	$mail->AddEmbeddedImage('signs.jpg', 'signsimg', 'signs.jpg'); // attach file signature.jpg, and later link to it using identfier logoimg
		 	$mail->Body = "<h4>Bellow is your Receipt</h4>
		 	    <p><img src=\"cid:logoimg\" /></p>".$kmail."<p>
		 	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 	    <img src=\"cid:signsimg\" /></p>";
		 	//$mail->AltBody="This is text only alternative body.";

		 	if(!$mail->Send())
		 	{
		 	   echo "Error sending mail, There may not be internet connection at this moment!" . $mail->ErrorInfo;
		 	   //echo'<script language="javascript">JavaScript:popupReceipt(); </script> ';
               echo'<script language="javascript">JavaScript:history.back(); </script> ';
		 	}
		 	else
		 	{
		 	   echo'<script language="javascript">JavaScript: alert("The Receipt Mail has been sent"); </script> ';
		 	   echo'<script language="javascript">JavaScript:popupReceipt(); </script> ';
               echo'<script language="javascript">JavaScript:history.back(); </script> ';
	        }

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
<?php
  //}
  // else
  //    {
  //     require_once('jaoheader.php');
  //     echo "<font color=white size=4><br>You need to login to use this application ...<br><br>";
  //     echo '<a href="login.php"><b><i><font color=red size=2>Click Here to Login</a><br><br><br>';
  //     require_once('jaofooter.php');
  //	   exit;
  //	  }
?>