<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "speccompare");
$conn->set_charset("utf8");

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'DB connection failed']);
    exit;
}

if (!isset($_GET['spec_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing spec_id']);
    exit;
}

$spec_id = $_GET['spec_id'];

// ดึงข้อมูลสเปคจาก ID
$stmt = $conn->prepare("SELECT id, spec_name, spec, compatibility, price, recommendation FROM saved_specs WHERE id = ?");
$stmt->bind_param("i", $spec_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'ไม่พบข้อมูล']);
} else {
    $row = $result->fetch_assoc();

    // แปลง JSON ของ spec ให้เป็น array
    $specJson = $row['spec'];
    $parsed = json_decode($specJson, true);

    // กำหนดส่วนประกอบทั้งหมดที่แอปคาดหวัง
    $components = ['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler'];
    $formattedSpec = [];

    if (json_last_error() === JSON_ERROR_NONE && is_array($parsed)) {
        // แปลงโครงสร้างข้อมูลให้อยู่ในรูปแบบที่แอปต้องการ
        foreach ($components as $component) {
            if (isset($parsed[$component])) {
                if (is_string($parsed[$component])) {
                    $formattedSpec[$component] = ['name' => $parsed[$component]]; // แปลงจาก "AMD Ryzen 7" เป็น {"name":"AMD Ryzen 7"}
                } else {
                    $formattedSpec[$component] = $parsed[$component];
                }
            } else {
                $formattedSpec[$component] = ['name' => '-'];
            }
        }
    } else {
        // ถ้า JSON ไม่ถูกต้องหรือว่างเปล่า ให้ใช้ค่าเริ่มต้นสำหรับทุกส่วนประกอบ
        foreach ($components as $component) {
            $formattedSpec[$component] = ['name' => '-'];
        }
    }

    $row['parsedSpec'] = $formattedSpec;
    echo json_encode(['status' => 'success', 'data' => $row]);
}

$stmt->close();
$conn->close();
?>