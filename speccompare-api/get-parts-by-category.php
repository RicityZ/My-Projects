<?php
header("Content-Type: application/json");
require_once 'db_connect.php';

$category = $_GET['category'] ?? '';

if ($category) {
    $stmt = $conn->prepare("SELECT * FROM parts WHERE category = ?");
    $stmt->bind_param("s", $category);
} else {
    $stmt = $conn->prepare("SELECT * FROM parts");
}

$stmt->execute();
$result = $stmt->get_result();

$parts = [];
while ($row = $result->fetch_assoc()) {
    $parts[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $parts
]);

$stmt->close();
$conn->close();
?>
