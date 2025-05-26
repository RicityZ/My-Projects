<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);
$price = $data['price'] ?? '';
$cpu = $data['cpu'] ?? '';
$type = $data['type'] ?? '';

// เพิ่ม debug log
error_log("Received data: " . json_encode($data));

$conn = new mysqli("localhost", "root", "", "speccompare");
$conn->set_charset("utf8");

if ($conn->connect_error) {
  error_log("Connection failed: " . $conn->connect_error);
  echo json_encode(['status' => 'error', 'message' => 'DB connection failed']);
  exit;
}

// สร้าง SQL query พร้อม WHERE ตาม filter
$sql = "SELECT * FROM saved_specs WHERE is_ai IN (0, 2)";

$params = [];
$types = "";

if ($price) {
  if (strpos($price, '+') !== false) {
    $sql .= " AND price >= ?";
    $params[] = intval(str_replace('+', '', $price));
    $types .= "i";
  } else {
    list($min, $max) = explode('-', $price);
    $sql .= " AND price BETWEEN ? AND ?";
    $params[] = intval($min);
    $params[] = intval($max);
    $types .= "ii";
  }
}

if ($cpu) {
  // แก้ไขให้ตรงกับรูปแบบการเก็บข้อมูล CPU ในฐานข้อมูล
  $sql .= " AND (spec LIKE ? OR JSON_EXTRACT(spec, '$.cpu.name') LIKE ?)";
  $params[] = "%$cpu%";
  $params[] = "%$cpu%";
  $types .= "ss";
}

if ($type) {
  $sql .= " AND category = ?";
  $params[] = $type;
  $types .= "s";
}

$sql .= " ORDER BY RAND() LIMIT 1";

// เพิ่ม debug log
error_log("SQL Query: " . $sql);
error_log("Params: " . json_encode($params));

$stmt = $conn->prepare($sql);

if (!empty($params) && $stmt) {
  $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $spec = $result->fetch_assoc();
  echo json_encode(['status' => 'success', 'result' => $spec]);
} else {
  echo json_encode(['status' => 'error', 'message' => 'ไม่พบสเปคตามเงื่อนไข']);
}

$stmt->close();
$conn->close();
?>