<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// เปิด error
error_reporting(E_ALL);
ini_set('display_errors', 1);

// เชื่อมต่อฐานข้อมูล
include 'db_connect.php';

// รับข้อมูล JSON ที่ส่งมา
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['id']) &&
    isset($data['first_name']) &&
    isset($data['last_name']) &&
    isset($data['email']) &&
    isset($data['phone'])
) {
    $id = $data['id'];
    $first_name = $data['first_name'];
    $last_name = $data['last_name'];
    $email = $data['email'];
    $phone = $data['phone'];

    // เตรียมคำสั่ง SQL
    $stmt = $conn->prepare("UPDATE users SET first_name=?, last_name=?, email=?, phone=? WHERE id=?");
    $stmt->bind_param("ssssi", $first_name, $last_name, $email, $phone, $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
}
?>
