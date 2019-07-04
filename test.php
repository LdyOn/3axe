<?php
// file_put_contents('data.txt', $_FILES['file']['name'], FILE_APPEND);
copy("php://input", "aa.jpg");
// $f = fopen('data.text', 'w');
// foreach ($_SERVER as $key => $value) {
// 	$s =  $key.'='.$value.'\n';
// 	// file_put_contents('data.txt', $s, FILE_APPEND);
// 	fwrite($f, $s);
// };
// file_put_contents('data.txt', var_export($_SERVER,true), FILE_APPEND);
// file_put_contents('data.txt', $_FILES['file']['type'], FILE_APPEND);
// file_put_contents('data.txt', $_FILES['file']['size'], FILE_APPEND);
