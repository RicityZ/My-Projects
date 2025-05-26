<?php
header("Content-Type: application/json");
include 'db_connect.php';

// ดึงข้อมูลที่ is_ai = 0 ทั้งหมด
$sql = "SELECT * FROM saved_specs WHERE is_ai = 0 ORDER BY created_at DESC";
$result = $conn->query($sql);

$specs = [];

while ($row = $result->fetch_assoc()) {
    $specs[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $specs]);
?>
