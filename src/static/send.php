<?php 
   $site = 'GILDIA';
   $name = $_POST['name'];
   $phone = $_POST['tel'];
   //Отправка в Telegram
  
   $token = "6175032800:AAEjE6ZY2gFttQ6RC4peVyi7mou72IHciA4";
   
   $chat_id = "-862719183";
   
  
   // Формирование текста сообщения
  $message = "Заявка с сайта: $site\n";
  $message .= "Имя пользователя: $name\n";
  $message .= "Телефон: $phone\n";
  // Добавьте еще необходимые поля в сообщение, если нужно
  
  // Отправка запроса в Телеграм
  $url = "https://api.telegram.org/bot$token/sendMessage";
  $data = array(
      'chat_id' => $chat_id,
      'text' => $message
  );
  
  $options = array(
      'http' => array(
          'method' => 'POST',
          'header' => "Content-Type:application/x-www-form-urlencoded\r\n",
          'content' => http_build_query($data)
      )
  );
  
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  
  if ($result === false) {
    // Обработка ошибки
    echo "Ошибка при отправке заявки в Телеграм.";
  } else {
    // Успешная отправка
    echo "Заявка успешно отправлена в Телеграм.";
  }


// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Формирование самого письма
$title = "GILDIA";
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
    // 
    $mail->Password   = '6W1EU4RUb7ptcmCvtHCQ';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('web-prog-dn@mail.ru', 'GILDIA'); 
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