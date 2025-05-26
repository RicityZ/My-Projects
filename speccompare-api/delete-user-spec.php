<?php
header("Content-Type: application/json");
include 'db_connect.php';

// รับค่าที่ส่งมา
$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? '';

if (!$id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing ID']);
    exit;
}

// ลบจากฐานข้อมูล
$sql = "DELETE FROM saved_specs WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}
?>
