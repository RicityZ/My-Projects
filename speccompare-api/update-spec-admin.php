<?php
header("Content-Type: application/json");
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

// ตรวจสอบค่าที่จำเป็น
$id = isset($data->id) ? intval($data->id) : null;
$spec_name = $data->spec_name ?? null;
$category = $data->category ?? null;
$price = $data->price ?? 0;
$spec = isset($data->spec) ? json_encode($data->spec, JSON_UNESCAPED_UNICODE) : null;

if (!$id || !$spec_name || !$category || !$spec) {
  echo json_encode(['status' => 'error', 'message' => 'ข้อมูลไม่ครบถ้วน']);
  exit;
}

// อัปเดตเฉพาะแถวที่ is_ai = 2 (ของแอดมินเท่านั้น)
$sql = "UPDATE saved_specs SET spec_name = ?, category = ?, spec = ?, price = ? WHERE id = ? AND is_ai = 2";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssdi", $spec_name, $category, $spec, $price, $id);

if ($stmt->execute()) {
  echo json_encode(['status' => 'success', 'message' => 'อัปเดตสำเร็จ']);
} else {
  echo json_encode(['status' => 'error', 'message' => 'อัปเดตไม่สำเร็จ']);
}
?>
