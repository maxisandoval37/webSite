<?php

$headers = "Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
$headers .= "From: test@email.com" . "\r\n" .
"Reply-To: test@email.com" . "\r\n" .
"X-Mailer: PHP/" . phpversion();

$to = 'abc@xyz.com';
$subject = 'test';
$message = '';
$message = '<label>Contact Detail</label>';
$message .= '<div style="width:100%;margin:0 auto;">';
$message .= '<label style="float:left;width:100%;font-weight:bold;">Name : '.$_REQUEST['name'].'</label><br>';
$message .= '<label style="float:left;width:100%;font-weight:bold;">Email : '.$_REQUEST['email'].' </label><br>';
$message .= '<label style="float:left;width:100%;font-weight:bold;">Subject : '.$_REQUEST['subject'].' </label><br>';
$message .= '<label style="float:left;width:100%;font-weight:bold;">Phone : '.$_REQUEST['tel'].' </label><br>';
$message .= '<label style="float:left;width:100%;font-weight:bold;">Message : '.$_REQUEST['message'].' </label><br>';
$message .= '</div>';
$message = wordwrap($message, 70);
echo mail($to, $subject, $message, $headers);

?>