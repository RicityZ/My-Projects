<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($_POST['name']) &&
        isset($_POST['price']) &&
        isset($_POST['category']) &&
        isset($_FILES['image'])
    ) {
        $name = $_POST['name'];
        $price = $_POST['price'];
        $category = strtolower($_POST['category']);
        $image = $_FILES['image'];

        $targetDir = "images/parts/$category/";

        // ตรวจสอบว่าโฟลเดอร์หมวดหมู่มีอยู่
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $imageName = uniqid() . "_" . basename($image["name"]);
        $targetPath = $targetDir . $imageName;

        if (move_uploaded_file($image["tmp_name"], $targetPath)) {
            $imageUrl = "http://10.0.2.2/speccompare-api/" . $targetPath;

            // เชื่อมต่อฐานข้อมูล
            $conn = new mysqli("localhost", "root", "", "speccompare");
            if ($conn->connect_error) {
                echo json_encode(["status" => "error", "message" => "เชื่อมต่อฐานข้อมูลล้มเหลว"]);
                exit;
            }

            $stmt = $conn->prepare("INSERT INTO parts (name, price, category, image_url) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $name, $price, $category, $imageUrl);

            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "เพิ่มข้อมูลสำเร็จ"]);
            } else {
                echo json_encode(["status" => "error", "message" => "เพิ่มข้อมูลล้มเหลว"]);
            }

            $stmt->close();
            $conn->close();
        } else {
            echo json_encode(["status" => "error", "message" => "อัปโหลดรูปภาพล้มเหลว"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบถ้วน"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "ไม่รองรับคำขอประเภทนี้"]);
}
?>
