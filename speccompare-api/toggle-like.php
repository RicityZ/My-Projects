<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "speccompare");
$conn->set_charset("utf8");

if ($conn->connect_error) {
  echo json_encode(['status' => 'error', 'message' => 'DB connection failed']);
  exit;
}

$spec_id = $_POST['spec_id'] ?? '';
$username = $_POST['username'] ?? '';

if (!$spec_id || !$username) {
  echo json_encode(['status' => 'error', 'message' => 'Missing parameters']);
  exit;
}

// 1. ตรวจสอบว่าผู้ใช้เคยไลค์ spec นี้แล้วหรือยัง
$checkStmt = $conn->prepare("SELECT id FROM spec_likes WHERE spec_id = ? AND username = ?");
$checkStmt->bind_param("is", $spec_id, $username);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
  // ✅ เคยไลค์แล้ว → ลบออก (ยกเลิกไลค์)
  $deleteStmt = $conn->prepare("DELETE FROM spec_likes WHERE spec_id = ? AND username = ?");
  $deleteStmt->bind_param("is", $spec_id, $username);
  $deleteStmt->execute();
  $deleteStmt->close();

  // ลดจำนวน likes ใน saved_specs
  $updateStmt = $conn->prepare("UPDATE saved_specs SET likes = GREATEST(0, likes - 1) WHERE id = ?");
  $updateStmt->bind_param("i", $spec_id);
  $updateStmt->execute();
  $updateStmt->close();

  $liked = false;
} else {
  // ❌ ยังไม่เคยไลค์ → เพิ่มไลค์
  $insertStmt = $conn->prepare("INSERT INTO spec_likes (spec_id, username) VALUES (?, ?)");
  $insertStmt->bind_param("is", $spec_id, $username);
  $insertStmt->execute();
  $insertStmt->close();

  // เพิ่ม likes ใน saved_specs
  $updateStmt = $conn->prepare("UPDATE saved_specs SET likes = likes + 1 WHERE id = ?");
  $updateStmt->bind_param("i", $spec_id);
  $updateStmt->execute();
  $updateStmt->close();

  $liked = true;
}

// ดึงจำนวน likes ล่าสุด
$likesStmt = $conn->prepare("SELECT likes FROM saved_specs WHERE id = ?");
$likesStmt->bind_param("i", $spec_id);
$likesStmt->execute();
$likesResult = $likesStmt->get_result();
$likesRow = $likesResult->fetch_assoc();
$totalLikes = $likesRow['likes'] ?? 0;

// ดึงรายชื่อผู้ใช้ที่กดไลค์
$likedByStmt = $conn->prepare("SELECT username FROM spec_likes WHERE spec_id = ?");
$likedByStmt->bind_param("i", $spec_id);
$likedByStmt->execute();
$likedByResult = $likedByStmt->get_result();
$likedBy = [];
while ($row = $likedByResult->fetch_assoc()) {
  $likedBy[] = $row['username'];
}

echo json_encode([
  'status' => 'success', 
  'liked' => $liked,
  'likes' => $totalLikes,
  'likedBy' => $likedBy
]);

$checkStmt->close();
$likesStmt->close();
$likedByStmt->close();
$conn->close();
?>