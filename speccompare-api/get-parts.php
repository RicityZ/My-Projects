<?php
header('Content-Type: application/json');
include 'db_connect.php'; // ต้องมีไฟล์นี้ในโปรเจกต์

if (!isset($_GET['part'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing part parameter'
    ]);
    exit;
}

$part = $_GET['part'];

// SQL: เรียงตามยี่ห้อ (AMD, Intel, อื่นๆ) + ตามชื่อ
$sql = "SELECT * FROM parts 
        WHERE category = ? 
        ORDER BY 
            CASE 
                WHEN name LIKE 'AMD%' THEN 1
                WHEN name LIKE 'Intel%' THEN 2
                ELSE 3
            END,
            name";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to prepare statement'
    ]);
    exit;
}

$stmt->bind_param("s", $part);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode([
    'status' => 'success',
    'data' => $data
]);

$stmt->close();
$conn->close();
?>
