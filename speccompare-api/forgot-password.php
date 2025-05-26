<?php
// ตั้ง Timezone เป็นประเทศไทย เพื่อให้เวลา reset_token_expire ตรง
date_default_timezone_set('Asia/Bangkok');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

header('Content-Type: application/json');

// รับอีเมลจากแอป
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
if (!$email) {
    echo json_encode(['status' => 'error', 'message' => 'กรุณากรอกอีเมล']);
    exit;
}

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli("localhost", "root", "", "speccompare");
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'DB error']);
    exit;
}

// ตรวจสอบว่าอีเมลมีอยู่หรือไม่
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'ไม่พบบัญชีที่ใช้อีเมลนี้']);
    exit;
}

$row = $result->fetch_assoc();
$userId = $row['id'];

// สร้าง token และหมดอายุ 1 ชั่วโมง
$token = bin2hex(random_bytes(32));
$expire = date('Y-m-d H:i:s', time() + 3600); // ✅ 1 ชั่วโมง

$stmt = $conn->prepare("UPDATE users SET reset_token = ?, reset_token_expire = ? WHERE id = ?");
$stmt->bind_param("ssi", $token, $expire, $userId);
$stmt->execute();

// ลิงก์รีเซ็ตรหัสผ่าน
$resetLink = "http://localhost/speccompare-api/reset-password.php?token=$token";



// ข้อมูล Gmail ที่ใช้ส่ง (แก้ตรงนี้ให้ถูก)
$gmailUser = 'kittipitwongwan3@gmail.com';     // บัญชี Gmail ที่ใช้ส่งเมล
$gmailPass = 'grxoltwqiebmdxku';              // App Password แบบไม่มีช่องว่าง


$mail = new PHPMailer(true);
try {
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $gmailUser;
    $mail->Password   = $gmailPass;
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom($gmailUser, 'SpecCompare Support');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'ลิงก์รีเซ็ตรหัสผ่าน SpecCompare';
    $mail->Body    = "กดลิงก์นี้เพื่อตั้งรหัสผ่านใหม่:<br><a href='$resetLink'>$resetLink</a><br><br>ลิงก์นี้หมดอายุใน 1 ชั่วโมง";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'ไม่สามารถส่งอีเมล: ' . $mail->ErrorInfo]);
}
