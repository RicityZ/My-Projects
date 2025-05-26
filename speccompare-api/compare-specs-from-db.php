<?php
header("Content-Type: application/json");
require_once 'db_connect.php'; // เชื่อมต่อฐานข้อมูล

// รับ ID จาก React Native
$input = json_decode(file_get_contents("php://input"), true);
$left_id = $input['left_id'] ?? null;
$right_id = $input['right_id'] ?? null;

if (!$left_id || !$right_id) {
    echo json_encode(['status' => 'error', 'message' => 'ต้องระบุ left_id และ right_id']);
    exit;
}

// คำสั่ง SQL ดึงข้อมูลทั้งสองสเปค
$stmtL = $conn->prepare("SELECT * FROM saved_specs WHERE id = ?");
$stmtL->bind_param("i", $left_id);
$stmtL->execute();
$resultL = $stmtL->get_result();
$left = $resultL->fetch_assoc();

$stmtR = $conn->prepare("SELECT * FROM saved_specs WHERE id = ?");
$stmtR->bind_param("i", $right_id);
$stmtR->execute();
$resultR = $stmtR->get_result();
$right = $resultR->fetch_assoc();

if (!$left || !$right) {
    echo json_encode(['status' => 'error', 'message' => 'ไม่พบข้อมูล spec ทั้งสอง']);
    exit;
}

// แปลง JSON ของสเปค
$leftSpec = json_decode($left['spec'], true);
$rightSpec = json_decode($right['spec'], true);

// รายชื่อชิ้นส่วนที่จะเปรียบเทียบ
$parts = ['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler'];
$comparison = [];

foreach ($parts as $part) {
    // ดึงชื่อส่วนประกอบ โดยรองรับทั้งกรณีที่มี 'name' โดยตรงและกรณีที่เป็น object
    $leftValue = '-';
    $rightValue = '-';

    if (isset($leftSpec[$part])) {
        if (is_array($leftSpec[$part]) && isset($leftSpec[$part]['name'])) {
            $leftValue = $leftSpec[$part]['name'];
        } elseif (is_string($leftSpec[$part])) {
            $leftValue = $leftSpec[$part];
        }
    }

    if (isset($rightSpec[$part])) {
        if (is_array($rightSpec[$part]) && isset($rightSpec[$part]['name'])) {
            $rightValue = $rightSpec[$part]['name'];
        } elseif (is_string($rightSpec[$part])) {
            $rightValue = $rightSpec[$part];
        }
    }

    $comparison[$part] = [
        'left' => $leftValue,
        'right' => $rightValue
    ];
}

// ส่งข้อมูลกลับ
echo json_encode([
    'status' => 'success',
    'result' => [
        'left_spec_name' => $left['spec_name'],
        'right_spec_name' => $right['spec_name'],
        'left_price' => (int) $left['price'],
        'right_price' => (int) $right['price'],
        'comparison' => $comparison
        
    ]
]);