<?php

 require_once("dompdf_config.inc.php");

 @session_start();

 $htmlfile=$_SESSION['htmlfile'];

  $dompdf = new DOMPDF();
  $dompdf->load_html($htmlfile);
  //$dompdf->set_paper($_POST["paper"], $_POST["orientation"]);
  $dompdf->set_paper("letter","portrait");
  $dompdf->render();

  $dompdf->stream("receipt.pdf", array("Attachment" => false));

  exit(0);

?>


