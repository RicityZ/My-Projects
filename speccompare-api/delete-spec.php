<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['id'])) {
  echo json_encode(['status' => 'error', 'message' => 'Missing ID']);
  exit;
}

$conn = new mysqli("localhost", "root", "", "speccompare");
$conn->set_charset("utf8");

if ($conn->connect_error) {
  echo json_encode(['status' => 'error', 'message' => 'DB connection failed']);
  exit;
}

$id = intval($data['id']);

$stmt = $conn->prepare("DELETE FROM saved_specs WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(['status' => 'success']);
} else {
  echo json_encode(['status' => 'error', 'message' => 'Delete failed']);
}

$stmt->close();
$conn->close();
?>
