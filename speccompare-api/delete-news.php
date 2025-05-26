<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// เชื่อมต่อฐานข้อมูล
require 'db_connect.php'; // หรือ connect.php ตามที่คุณใช้

// ตรวจสอบว่ามีการส่ง id มาหรือไม่
if (!isset($_GET['id'])) {
    echo json_encode(["status" => "error", "message" => "ไม่มี id ที่ส่งมา"]);
    exit;
}

$id = intval($_GET['id']);

// ตรวจสอบว่าข่าวนี้มีอยู่หรือไม่
$check = mysqli_query($conn, "SELECT * FROM news WHERE id = $id");
if (mysqli_num_rows($check) === 0) {
    echo json_encode(["status" => "error", "message" => "ไม่พบข่าว"]);
    exit;
}

// ลบข่าว
$delete = mysqli_query($conn, "DELETE FROM news WHERE id = $id");
if ($delete) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "ลบข่าวไม่สำเร็จ"]);
}
?>
    