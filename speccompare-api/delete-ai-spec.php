<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? null;

if (!$id) {
  echo json_encode(['status' => 'error', 'message' => 'Missing ID']);
  exit;
}

$stmt = $conn->prepare("DELETE FROM saved_specs WHERE id = ? AND is_ai = 1");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(['status' => 'success']);
} else {
  echo json_encode(['status' => 'error', 'message' => 'Delete failed']);
}

$stmt->close();
$conn->close();
?>
