<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "speccompare");
$conn->set_charset("utf8");

if ($conn->connect_error) {
  echo json_encode(['status' => 'error', 'message' => 'DB connection failed']);
  exit;
}

$username = $_GET['username'] ?? '';
if (!$username) {
  echo json_encode(['status' => 'error', 'message' => 'Missing username']);
  exit;
}

// JOIN กับ saved_specs เพื่อเอาข้อมูลสเปค
$stmt = $conn->prepare("
 SELECT s.id, s.spec_name, s.category, s.price, s.image_url, s.spec
  FROM spec_likes l 
  JOIN saved_specs s ON l.spec_id = s.id 
  WHERE l.username = ?
");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $data]);

$stmt->close();
$conn->close();
?>
