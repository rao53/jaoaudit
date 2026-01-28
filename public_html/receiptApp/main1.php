<?php
 @session_start();
 if (($_SESSION['userid']!='') && ($_SESSION['password']!=''))
   {
   ?>
	<html>

	<head>
	<meta http-equiv="Content-Language" content="en-us">
	<meta name="GENERATOR" content="Microsoft FrontPage 6.0">
	<meta name="ProgId" content="FrontPage.Editor.Document">
	<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
	<title>&nbsp;Welcome to J.A. Olawin &amp; Co. (Chartered Accountants)</title>
	<style type="text/css">

	td img {display: block;}td img {display: block;}
	A:link {
		TEXT-DECORATION: none
	}
	a:visited {
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	a:active {
		text-decoration: none;
	}
	.style58 {color: #FF0000}
    </style>
	<script type="text/JavaScript">
	<!--


	function submitForms()  {
	//if (isReceivedFrom()  && isCompanyRep()  && isEmail() && isSumOff()  && isPaymentFor() && isAmountInvolved())
	if (isReceivedFrom() && isCompanyRep() && isEmail()  && isSumOff() && isPaymentFor() && isAmountInvolved())
	 {
	   //document.forms[0].elements[8].value=yyyy + "/" + mm + "/" + dd;
	   return true;
	 }
	else
	 return false;
	}

	function isReceivedFrom() {
	if (document.myform.receivedfrom.value == '')
	{
	alert ("\n The Received From  field is blank. \n\n Please enter the Received From.")
	document.myform.receivedfrom.focus();
	return false;
	}
	return true;
	}

	function isCompanyRep() {
	if (document.myform.companyrepresented.value == '')
	{
	alert ("\n The Company Represented field is blank, \n\n Please enter the Company Represented")
	document.myform.companyrepresented.focus();
	return false;
	}
	return true;
	}

	function isEmail()
	{
	if (document.myform.email.value == '')
	{
	alert ("\n The E-Mail field is blank. \n\n Please enter your E-Mail address.")
	document.myform.email.focus();
	return false;
	}
	if (document.myform.email.value.indexOf ('@',0) == -1 ||
	document.myform.email.value.indexOf ('.',0) == -1)
	{
	alert ("\n The E-Mail field requires a \"@\" and a \".\"be used. \n\nPlease re-enter your E-Mail address.")
	document.myform.email.select();
	document.myform.email.focus();
	return false;
	}
	return true;
	}

	function isSumOff() {
	if (document.myform.sumof.value == '') {
	alert ("\n The Sum Off field is blank. \n\nPlease enter sum off in words.")
	document.myform.sumof.focus();
	return false;
	}
	return true;
	}

	function isPaymentFor() {
	if (document.myform.paymentfor.value == '') {
	alert ("\n The Payment For field is blank. \n\nPlease enter the description of what is being paid for.")
	document.myform.paymentfor.focus();
	return false;
	}
	return true;
	}

	function isAmountInvolved() {
	if (document.myform.amountinvolved.value == '') {
	alert ("\n The Amount involved field is blank. \n\nPlease enter the amount involved in figure.")
	document.myform.amountinvolved.focus();
	return false;
	}
	if (! eval((document.myform.amountinvolved.value))) {
	alert ("\n The Amount involved field must be Numbers. \n\nPlease enter the amount involved in figure.");
	document.myform.amountinvolved.focus();
	return false;
	}
	return true;
	}

	function MM_preloadImages() { //v3.0
	  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}

	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}

	function MM_nbGroup(event, grpName) { //v6.0
	  var i,img,nbArr,args=MM_nbGroup.arguments;
	  if (event == "init" && args.length > 2) {
		if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
		  img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
		  if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
		  nbArr[nbArr.length] = img;
		  for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
			if (!img.MM_up) img.MM_up = img.src;
			img.src = img.MM_dn = args[i+1];
			nbArr[nbArr.length] = img;
		} }
	  } else if (event == "over") {
		document.MM_nbOver = nbArr = new Array();
		for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
		  if (!img.MM_up) img.MM_up = img.src;
		  img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);
		  nbArr[nbArr.length] = img;
		}
	  } else if (event == "out" ) {
		for (i=0; i < document.MM_nbOver.length; i++) {
		  img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
	  } else if (event == "down") {
		nbArr = document[grpName];
		if (nbArr)
		  for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
		document[grpName] = nbArr = new Array();
		for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
		  if (!img.MM_up) img.MM_up = img.src;
		  img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;
		  nbArr[nbArr.length] = img;
	  } }
	}
	//-->
	</script>
	</head>

	<body bgcolor="#FFFFFF" onLoad="MM_preloadImages('images/links_r1_c2_f3.jpg','images/links_r1_c2_f2.jpg','images/links_r1_c2_f4.jpg','images/links_r1_c4_f3.jpg','images/links_r1_c4_f2.jpg','images/links_r1_c4_f4.jpg','images/links_r1_c6_f3.jpg','images/links_r1_c6_f2.jpg','images/links_r1_c6_f4.jpg','images/links_r1_c7_f3.jpg','images/links_r1_c7_f2.jpg','images/links_r1_c7_f4.jpg','images/links_r1_c8_f3.jpg','images/links_r1_c8_f2.jpg','images/links_r1_c8_f4.jpg','images/links_r1_c9_f3.jpg','images/links_r1_c9_f2.jpg','images/links_r1_c9_f4.jpg','images/links_r1_c11_f3.jpg','images/links_r1_c11_f2.jpg','images/links_r1_c11_f4.jpg')" topmargin="0" leftmargin="0" background="../images/bg.jpg">

	<div align="center">
	  <center>
	  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="951" id="AutoNumber1" height="386">
		<tr>
		  <td width="951" height="48" valign="top"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="950" height="95">
			<param name="movie" value="images/movie1.swf">
			<param name="quality" value="high">
			<embed src="images/movie1.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="950" height="95"></embed></object></td>
		</tr>
		<tr>
		  <td width="951" height="1" valign="top">
		  <table border="0" cellpadding="0" cellspacing="0" width="941">
			<!-- fwtable fwsrc="links.png" fwbase="links.jpg" fwstyle="Dreamweaver" fwdocid = "705803484" fwnested="0" -->
			<tr>
			  <td width="8">
				<img src="../images/spacer.gif" width="1" height="1" border="0" alt="" /></td>
			  <td width="135">
				<img src="../images/spacer.gif" width="135" height="1" border="0" alt="" /></td>
			  <td width="8">
				<img src="../images/spacer.gif" width="1" height="1" border="0" alt="" /></td>
			  <td width="135">
				<img src="../images/spacer.gif" width="135" height="1" border="0" alt="" /></td>
			  <td width="8">
				<img src="../images/spacer.gif" width="1" height="1" border="0" alt="" /></td>
			  <td width="135">
				<img src="../images/spacer.gif" width="135" height="1" border="0" alt="" /></td>
			  <td width="135">
				<img src="../images/spacer.gif" width="135" height="1" border="0" alt="" /></td>
			  <td width="135">
				<img src="../images/spacer.gif" width="135" height="1" border="0" alt="" /></td>
			  <td width="135">
				<img src="../images/spacer.gif" width="135" height="1" border="0" alt="" /></td>
			  <td width="8">
				<img src="../images/spacer.gif" width="1" height="1" border="0" alt="" /></td>
			  <td width="135">
				<img src="../images/spacer.gif" width="135" height="1" border="0" alt="" /></td>
			  <td width="8">
				<img src="../images/spacer.gif" width="1" height="1" border="0" alt="" /></td>
			  <td width="1">
				<img src="../images/spacer.gif" width="1" height="1" border="0" alt="" /></td>
			</tr>
		  </table></td>
		</tr>
		<tr>
		  <td width="951" bgcolor="#000000" height="16">&nbsp;
		  </td>
		</tr>
		<tr>
		  <td width="951" bgcolor="#000000" height="232" valign="top">
		  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="103%" id="AutoNumber4" height="198">
			<tr>
			  <td width="103%" valign="top" bgcolor="#000080" colspan="3">
			  <p align="left"></td>
			</tr>
			<tr>
			  <td width="100%" valign="top" bgcolor="#FFFFFF" colspan="3" height="18">
				<hr color="#808000" size="4"></td>
			</tr>
			<tr>
			  <td width="7%" valign="top" bgcolor="#C0C0C0" height="161" rowspan="2">&nbsp;<p>&nbsp;</p>
				<p></td>
			  <td width="78%" valign="top" bgcolor="#000080" height="19">
				<p align="center"><b><font face="Arial" color="#FFFFFF">RECEIPT&nbsp;&nbsp;
				INFORMATION</font></b></td>
			  <td width="14%" valign="top" bgcolor="#C0C0C0" height="161" rowspan="2">
				<p align="left"><font size="2">&nbsp;&nbsp;&nbsp;
				<font color="#FF0000"><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pls Do not<br><br>
&nbsp;Forget to send the<br>
				<br>
&nbsp;generated pdf to <br>
				<br>
&nbsp; the
			      client's email <br>
				<br>
&nbsp;&nbsp;&nbsp; address as an<br>
				<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; attachment </font></font></p></td>
			</tr>
			<tr>
			  <td width="78%" valign="top" bgcolor="#FFFFFF" height="142">
				<form name="myform" method="POST" action="createreceipt.php" onSubmit="return submitForms()">
							<center><table border="0" width="100%" cellspacing="0" cellpadding="0">
							<tr>
								<td width="142"><b>
								<font size="2" face="Arial" color="#000080">&nbsp;
								Date</font></b></td>
								<td colspan="2"><input type="text" name="tdate" size="12" value="<?php echo date("d/m/Y"); ?>" readonly="true"></td>
							</tr>
							<tr>
								<td width="142"><b>
								<font size="2" face="Arial" color="#000080">&nbsp;
								Received From:</font></b></td>
							  <td colspan="2">
								<input type="text" name="receivedfrom" size="50">
								<span class="style58">*</span></td>
							</tr>
							<tr>
							  <td><div align="left">&nbsp; <b>
								<font size="2" face="Arial" color="#000080">
								Designated Address:</font></b></div></td>
							  <td colspan="2">
								<input type="text" name="companyrepresented" size="80"> <span class="style58">*</span></td>
							  </tr>
							<tr>
								<td width="142"><b>
								<font size="2" face="Arial" color="#000080">&nbsp; </font></b></td>
							  <td colspan="2">
								<input type="text" name="companyrepresented2" size="80"></td>
							</tr>
							<tr>
								<td width="142">&nbsp; <b>
								<font size="2" face="Arial" color="#000080">Email
								Address:</font></b></td>
							  <td colspan="2"><input type="text" name="email" size="39">
							    <span class="style58">*</span></td>
							</tr>
							<tr>
								<td width="142"><b>
								<font size="2" face="Arial" color="#000080">&nbsp;
								In The Sum of:</font></b></td>
							  <td colspan="2"><input type="text" name="sumof" size="80">
							    <span class="style58">*</span></td>
							</tr>
							<tr>
							  <td>&nbsp;</td>
							  <td colspan="2"><input type="text" name="sumof2" size="80"></td>
							</tr>
							<tr>
								<td width="142"><b>
								<font size="2" face="Arial" color="#000080">&nbsp;
								Being Payment for:</font></b></td>
							  <td colspan="2"><input type="text" name="paymentfor" size="76">
							    <span class="style58">*</span></td>
							</tr>
							<tr>
								<td width="142"><b>
								<font size="2" face="Arial" color="#000080">&nbsp;
								Cheque No/Amount:</font></b></td>
							  <td colspan="2">
								<input type="text" name="amountinvolved" size="50">
								<span class="style58">*</span></td>
							</tr>
							<tr>
								<td width="142">&nbsp;</td>
								<td width="279"><input type="submit" value="Submit" name="B1" style="font-size: 8pt; color: #000080; font-weight: bold"></td>
								<td width="216">
								<p align="center"><b>
								<font size="2" face="Arial" color="#FF0000">
								<a href="http://www.jaoaudit.com/">
							  <font color="#FF0000">Log out </font></a></font></b> </td>
							</tr>
						</table>
				</form>
				</td>
			</tr>
		  </table>
		  </td>
		</tr>
		<tr>
		  <td width="951" bgcolor="#000000" height="19">
		  <p align="left"></td>
		</tr>
		<tr>
		  <td width="951" bgcolor="#008000" height="23">
		  <p align="center">
		  <font face="Arial" color="#ffffff" size="1">
		  Copyright (c), All rights reserved, </font>
			  <font color="#FFFFFF" face="Arial" size="1">J.A. OLAWIN
		  &amp; CO.</font><font face="Arial" color="#ffffff" size="1">,
		  2010</font></td>
		</tr>
	  </table>
	  </center>
	</div>

	</body>
	</html>
<?php
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