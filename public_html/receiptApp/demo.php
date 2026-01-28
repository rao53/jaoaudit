<?php

require_once("dompdf_config.inc.php");


 session_start();
 $htmlfile=$_SESSION['htmlfile'];

// We check wether the user is accessing the demo locally
//$local = array("::1", "127.0.0.1");
//$is_local = in_array($_SERVER['REMOTE_ADDR'], $local);


  if ( get_magic_quotes_gpc() )
    $_POST["html"] = stripslashes($_POST["html"]);

  $dompdf = new DOMPDF();
  $dompdf->load_html($htmlfile);
  //$dompdf->set_paper($_POST["paper"], $_POST["orientation"]);
  $dompdf->set_paper("letter","portrait");
  $dompdf->render();

  $dompdf->stream("mypdf_out.pdf", array("Attachment" => false));

  exit(0);

?>

<a name="demo"> </a>
<h2>Demo</h2>

<?php if ($is_local) { ?>

<p>Enter your html snippet in the text box below to see it rendered as a
PDF: (Note by default, remote stylesheets, images &amp; inline PHP are disabled.)</p>

<form action="<?php echo $_SERVER["PHP_SELF"];?>" method="post">
<p>Paper size and orientation:
<select name="paper">
<?php
foreach ( array_keys(CPDF_Adapter::$PAPER_SIZES) as $size )
  echo "<option ". ($size == "letter" ? "selected " : "" ) . "value=\"$size\">$size</option>\n";
?>
</select>
<select name="orientation">
  <option value="portrait">portrait</option>
  <option value="landscape">landscape</option>
</select>
</p>

<textarea name="html" cols="60" rows="20">

</textarea>

<div style="text-align: center; margin-top: 1em;">
  <button type="submit">Download</button>
</div>

</form>
<p style="font-size: 0.65em; text-align: center;">(Note: if you use a KHTML
based browser and are having difficulties loading the sample output, try
saving it to a file first.)</p>

<?php } else { ?>

  <p style="color: red;">
    User input has been disabled for remote connections.
  </p>

<?php } ?>

