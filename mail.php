<?php
// Enable error reporting (development only — remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set response content type
header('Content-Type: application/json');

// Load environment variables
require_once __DIR__ . '/load_env.php';
load_env(__DIR__ . '/.env');

// PHPMailer imports
require(__DIR__ . '/PHPMailer/src/Exception.php');
require(__DIR__ . '/PHPMailer/src/PHPMailer.php');
require(__DIR__ . '/PHPMailer/src/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

date_default_timezone_set("Asia/Kolkata");

function log_debug($message) {
    error_log("[MAILER] " . $message);
}

function send_mail($uemail, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = $_ENV['MAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['MAIL_USERNAME'];
        $mail->Password = $_ENV['MAIL_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $_ENV['MAIL_PORT'];

        // Recipients
        $mail->setFrom($_ENV['MAIL_FROM_EMAIL'], $_ENV['MAIL_FROM_NAME']);
        $mail->addAddress($uemail);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = nl2br($body); // Convert line breaks to <br>

        $mail->send();
        log_debug("Mail sent successfully to $uemail");
        return true;
    } catch (Exception $e) {
        log_debug("Mailer Error: " . $mail->ErrorInfo);
        return false;
    }
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $raw = file_get_contents("php://input");
    log_debug("Raw POST: " . $raw);

    $data = json_decode($raw, true);

    if (!$data) {
        http_response_code(400);
        log_debug("Invalid JSON received.");
        echo json_encode(["message" => "Invalid JSON input."]);
        exit;
    }

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $message = trim($data['message'] ?? '');

    log_debug("Parsed Input — Name: $name, Email: $email, Message: $message");

    if (empty($name) || empty($email)) {
        http_response_code(400);
        echo json_encode(["message" => "Missing required fields."]);
        exit;
    }

    $subject = "New Subscription from WordWise";
    $body = "Name: $name\nEmail: $email\nMessage: $message";

    if (send_mail("admin@wordwise.com", $subject, $body)) {
        echo json_encode(["message" => "Thank you for subscribing! We will notify you soon."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "There was an error. Please try again later."]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Invalid request method."]);
}
?>
