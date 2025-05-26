<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db_connect.php';

$id = $_POST['id'] ?? null;
$name = $_POST['name'] ?? '';
$price = $_POST['price'] ?? '';
$category = strtolower($_POST['category'] ?? '');

if (!$id || !$name || !$price || !$category) {
  echo json_encode(['status' => 'error', 'message' => 'ข้อมูลไม่ครบ']);
  exit;
}

// เตรียมอัปเดตรูปภาพถ้ามี
$imageUrl = null;
if (isset($_FILES['image'])) {
  $folderPath = "images/parts/$category/";
  if (!is_dir($folderPath)) {
    mkdir($folderPath, 0777, true);
  }

  $fileName = uniqid() . "_" . basename($_FILES['image']['name']);
  $targetPath = $folderPath . $fileName;

  if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
    $imageUrl = "http://10.0.2.2/speccompare-api/" . $targetPath;
  } else {
    echo json_encode(['status' => 'error', 'message' => 'อัปโหลดรูปภาพล้มเหลว']);
    exit;
  }
}

// เตรียม SQL อัปเดต
if ($imageUrl) {
  $stmt = $conn->prepare("UPDATE parts SET name = ?, price = ?, category = ?, image_url = ? WHERE id = ?");
  $stmt->bind_param("ssssi", $name, $price, $category, $imageUrl, $id);
} else {
  $stmt = $conn->prepare("UPDATE parts SET name = ?, price = ?, category = ? WHERE id = ?");
  $stmt->bind_param("sssi", $name, $price, $category, $id);
}

// รัน SQL
if ($stmt->execute()) {
  echo json_encode(['status' => 'success']);
} else {
  echo json_encode(['status' => 'error', 'message' => 'อัปเดตไม่สำเร็จ']);
}

$stmt->close();
$conn->close();
?>
