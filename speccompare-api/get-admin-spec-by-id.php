<?php
header("Content-Type: application/json");
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));
$is_ai = isset($data->is_ai) ? intval($data->is_ai) : 2; // ตั้งค่า default เป็น 2

$sql = "SELECT * FROM saved_specs WHERE is_ai = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $is_ai);
$stmt->execute();
$result = $stmt->get_result();

$specs = [];
while ($row = $result->fetch_assoc()) {
    $specs[] = $row;
}

echo json_encode([
    'status' => 'success',
    'data' => $specs
]);
