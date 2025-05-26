<?php
header("Content-Type: application/json");
require 'db_connect.php'; // เชื่อมฐานข้อมูล

// รับ JSON ที่ส่งมาจากแอป
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่าได้ข้อมูลครบหรือไม่
if (
    isset($data['title']) &&
    isset($data['content']) &&
    isset($data['image_url']) &&
    isset($data['link'])
) {
    // รับข้อมูลและป้องกัน SQL Injection
    $title = mysqli_real_escape_string($conn, $data['title']);
    $content = mysqli_real_escape_string($conn, $data['content']);
    $image_url = mysqli_real_escape_string($conn, $data['image_url']);
    $link = mysqli_real_escape_string($conn, $data['link']);

    // คำสั่ง SQL เพิ่มข้อมูล
    $sql = "INSERT INTO news (title, content, image_url, link)
            VALUES ('$title', '$content', '$image_url', '$link')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(["status" => "success", "message" => "เพิ่มข่าวสำเร็จ"]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "เพิ่มข่าวไม่สำเร็จ: " . mysqli_error($conn)
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "กรุณาส่งข้อมูลให้ครบถ้วน"
    ]);
}
?>
