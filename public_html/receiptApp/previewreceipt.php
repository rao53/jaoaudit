<?php

 require_once("dompdf_config.inc.php");

 session_start();
 $htmlfile=$_SESSION['htmlfile'];

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


