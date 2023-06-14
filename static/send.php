<?php 
   
    $site = 'SARP_GROUP';
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['tel'];
    $comment = $_POST['comment'];
    //Отправка в Telegram

    $token = "6072434392:AAGk8D37swsdZnkkKnAC0lK5gzk6HQVcHkc";
    $chat_id = "-971314841";
    
    $arr = array(
        'Заявка с сайта: ' => $site,
        'Имя пользователя: ' => $name,
        'Телефон: ' => $phone,
    );

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");



// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Формирование самого письма
$title = "SARP_GROUP";
$body = "
<h2>Заявка с сайта</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br>
";
// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    $mail->Host       = 'smtp.mail.ru'; 
    $mail->Username   = 'web-prog-dn@mail.ru'; 
    $mail->Password   = '6W1EU4RUb7ptcmCvtHCQ';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('web-prog-dn@mail.ru', 'SARP_GROUP'); 
    // Получатель письма
    $mail->addAddress('danikoktysyk@gmail.com');  

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);

if ($sendToTelegram) {$result = "success";} 
else {$result = "error";}
?>
