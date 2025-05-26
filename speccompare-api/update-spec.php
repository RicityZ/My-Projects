<?php
header("Content-Type: application/json");
include 'db_connect.php';

// รับข้อมูลจาก React Native
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? '';
$spec_name = $data['spec_name'] ?? '';
$category = $data['category'] ?? '';
$price = $data['price'] ?? 0;
$spec = $data['spec'] ?? [];

if (!$id || !$spec_name || !$category || empty($spec)) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

// แปลง spec เป็น JSON
$spec_json = json_encode($spec, JSON_UNESCAPED_UNICODE);

// อัปเดตข้อมูลในฐานข้อมูล
$sql = "UPDATE saved_specs SET spec_name = ?, category = ?, price = ?, spec = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssisi", $spec_name, $category, $price, $spec_json, $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
}
?>
