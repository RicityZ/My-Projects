<?php
$host = "localhost";
$db = "speccompare";
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);
header('Content-Type: application/json');

$userId = $_GET['user_id'];
$pcId = $_GET['pc_id'];

$sql = "SELECT * FROM likes WHERE user_id = ? AND pc_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $userId, $pcId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  echo json_encode(["liked" => true]);
} else {
  echo json_encode(["liked" => false]);
}
?>
