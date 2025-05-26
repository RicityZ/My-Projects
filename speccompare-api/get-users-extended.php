<?php
header('Content-Type: application/json');

// เชื่อมต่อฐานข้อมูล
require 'db_connect.php'; 

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'เชื่อมต่อฐานข้อมูลล้มเหลว']);
    exit();
}

// รับค่าที่ส่งมาจาก frontend
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

$search = isset($data['search']) ? $conn->real_escape_string($data['search']) : '';
$role = isset($data['role']) ? $conn->real_escape_string($data['role']) : 'all';

// สร้าง query
$query = "SELECT * FROM users WHERE 1 ";

if ($role !== 'all') {
    $query .= "AND role = '$role' ";
}

if (!empty($search)) {
    $query .= "AND (first_name LIKE '%$search%' OR last_name LIKE '%$search%' OR email LIKE '%$search%') ";
}

$query .= "ORDER BY id DESC";

$result = $conn->query($query);

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $users]);

$conn->close();
?>
