<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "speccompare");
$conn->set_charset("utf8");

if ($conn->connect_error) {
  echo json_encode(['status' => 'error', 'message' => 'DB connection failed']);
  exit;
}

if (isset($_GET['category'])) {
  $category = $_GET['category'];

  // เพิ่มเงื่อนไขให้ดึงทั้งสเปคปกติและสเปค AI
  // ซึ่งจะทำให้สเปค AI ที่ผู้ใช้กดไลค์มาสามารถแสดงในหน้า Home ได้
  $stmt = $conn->prepare("
    SELECT s.id, s.spec_name, s.spec, s.category, s.price, s.image_url, s.is_ai,
           COUNT(l.username) AS likes
    FROM saved_specs s
    LEFT JOIN spec_likes l ON s.id = l.spec_id
    WHERE s.category = ?
    GROUP BY s.id
    ORDER BY likes DESC
     LIMIT 6

  ");
  $stmt->bind_param("s", $category);
  $stmt->execute();
  $result = $stmt->get_result();

  $specs = [];
  while ($row = $result->fetch_assoc()) {
    $spec_id = $row['id'];

    // ดึงชื่อคนที่เคยกดไลก์
    $liked_by_stmt = $conn->prepare("SELECT username FROM spec_likes WHERE spec_id = ?");
    $liked_by_stmt->bind_param("i", $spec_id);
    $liked_by_stmt->execute();
    $liked_by_result = $liked_by_stmt->get_result();

    $liked_by = [];
    while ($liked_row = $liked_by_result->fetch_assoc()) {
      $liked_by[] = $liked_row['username'];
    }

    $specs[] = array_merge($row, [
      'likedBy' => $liked_by
    ]);

    $liked_by_stmt->close();
  }

  echo json_encode(['status' => 'success', 'data' => $specs]);
  $stmt->close();
  $conn->close();
  exit;
}

echo json_encode(['status' => 'error', 'message' => 'No category specified']);
$conn->close();
?>