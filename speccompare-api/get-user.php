<?php
header('Content-Type: application/json');

$username = $_GET['username'] ?? '';

if (!$username) {
  echo json_encode(['status' => 'error', 'message' => 'Missing username']);
  exit;
}

$conn = new mysqli("localhost", "root", "", "speccompare");
$conn->set_charset("utf8");

if ($conn->connect_error) {
  echo json_encode(['status' => 'error', 'message' => 'DB connect failed']);
  exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
  echo json_encode(['status' => 'success', 'user' => $user], JSON_UNESCAPED_UNICODE);
} else {
  echo json_encode(['status' => 'error', 'message' => 'User not found']);
}

$stmt->close();
$conn->close();
?>
