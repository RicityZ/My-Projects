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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $spec_id = $_POST['spec_id'];
    $likes = $_POST['likes'];

    // SQL เพื่ออัพเดตยอดไลค์
    $sql = "UPDATE saved_specs SET likes = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $likes, $spec_id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "อัพเดตยอดไลค์สำเร็จ"]);
    } else {
        echo json_encode(["status" => "error", "message" => "ไม่สามารถอัพเดตยอดไลค์"]);
    }

    $stmt->close();
}

$conn->close();
?>
