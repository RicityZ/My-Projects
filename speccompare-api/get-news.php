<?php
header("Content-Type: application/json");
$host = "localhost";
$db = "speccompare";
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "เชื่อมต่อฐานข้อมูลไม่ได้"]);
    exit;
}

$sql = "SELECT id, title, content, image_url, link FROM news ORDER BY id DESC LIMIT 5";
$result = $conn->query($sql);

$news = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $news[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $news]);
} else {
    echo json_encode(["status" => "error", "message" => "ไม่พบข่าวสาร"]);
}

$conn->close();
?>
