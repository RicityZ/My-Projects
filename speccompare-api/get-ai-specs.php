<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db_connect.php';

// รับ JSON input (optionally รองรับ search/filter)
$data = json_decode(file_get_contents("php://input"));
$category = $data->category ?? 'all';
$search = $data->search ?? '';

// เตรียม SQL
$sql = "SELECT * FROM saved_specs WHERE is_ai = 1";
$params = [];

if ($category !== 'all') {
  $sql .= " AND category = ?";
  $params[] = $category;
}

if (!empty($search)) {
  $sql .= " AND spec_name LIKE ?";
  $params[] = "%" . $search . "%";
}

$stmt = $conn->prepare($sql);

// Bind params dynamically
if (!empty($params)) {
  $types = str_repeat('s', count($params));
  $stmt->bind_param($types, ...$params);
}

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

$stmt->close();
$conn->close();
?>
