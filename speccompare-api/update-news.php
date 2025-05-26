<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// เชื่อมต่อฐานข้อมูล
require 'db_connect.php'; // หรือ connect.php แล้วแต่คุณใช้

// รับข้อมูล JSON จาก client
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบข้อมูลที่ส่งมาครบหรือไม่
if (
    !isset($data['id']) ||
    !isset($data['title']) ||
    !isset($data['content']) ||
    !isset($data['link'])
) {
    echo json_encode([
        "status" => "error",
        "message" => "ข้อมูลไม่ครบถ้วน"
    ]);
    exit;
}

$id = intval($data['id']);
$title = mysqli_real_escape_string($conn, $data['title']);
$content = mysqli_real_escape_string($conn, $data['content']);
$link = mysqli_real_escape_string($conn, $data['link']);

// ตรวจสอบว่าข่าวมีอยู่หรือไม่
$check = mysqli_query($conn, "SELECT * FROM news WHERE id = $id");
if (mysqli_num_rows($check) === 0) {
    echo json_encode(["status" => "error", "message" => "ไม่พบข่าว"]);
    exit;
}

// อัปเดตข้อมูลข่าว
$image_url = mysqli_real_escape_string($conn, $data['image_url']);
$sql = "UPDATE news SET title='$title', content='$content', link='$link', image_url='$image_url' WHERE id = $id";


if (mysqli_query($conn, $sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
}
?>
