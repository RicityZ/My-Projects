<?php
header("Access-Control-Allow-Origin: *"); // ✅ อนุญาตให้มือถือเข้าถึง
header("Content-Type: application/json; charset=UTF-8");

// ปิดการแสดง error HTML
ini_set('display_errors', 0);
error_reporting(0);

// รับข้อมูล JSON จากแอป
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบค่าว่าง
if (!isset($data["username"]) || !isset($data["password"])) {
    echo json_encode(['status' => 'error', 'message' => 'กรุณาระบุชื่อผู้ใช้และรหัสผ่าน']);
    exit;
}

$username = $data["username"];
$password = $data["password"];

// เชื่อมต่อฐานข้อมูล (WampServer)
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "speccompare";

$conn = new mysqli($host, $user, $pass, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'เชื่อมต่อฐานข้อมูลไม่ได้']);
    exit;
}

// ใช้ prepared statement ป้องกัน SQL injection
$stmt = $conn->prepare("SELECT id, username, first_name, role FROM users WHERE username=? AND password=?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(['status' => 'success', 'user' => $user]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง']);
}

$stmt->close();
$conn->close();
?>
