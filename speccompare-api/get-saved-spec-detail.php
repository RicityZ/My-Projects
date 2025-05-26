<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));
$id = isset($data->id) ? intval($data->id) : null;

if (!$id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing ID']);
    exit;
}

$sql = "SELECT * FROM saved_specs WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $row['spec'] = json_decode($row['spec'], true);  // ✅ สำคัญมาก
    echo json_encode([
        'status' => 'success',
        'data' => $row
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'ไม่พบข้อมูล'
    ]);
}
?>
