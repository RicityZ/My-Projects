<?php
include 'db_connect.php'; 

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
  echo json_encode(['status' => 'error', 'message' => 'Missing part ID']);
  exit;
}

$id = $data->id;
$sql = "DELETE FROM parts WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  echo json_encode(['status' => 'success']);
} else {
  echo json_encode(['status' => 'error', 'message' => 'Failed to delete']);
}
?>
