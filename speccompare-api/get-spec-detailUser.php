<?php
header("Content-Type: application/json");
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? '';

if (!$id) {
    echo json_encode(['status' => 'error', 'message' => 'Missing spec ID']);
    exit;
}

$sql = "SELECT * FROM saved_specs WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $row['spec'] = json_decode($row['spec'], true);
        echo json_encode(['status' => 'success', 'data' => $row]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Spec not found']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Query failed']);
}
?>
