<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$targetDir = "images/News/";

// ตรวจสอบว่ามีไฟล์ส่งมาหรือไม่
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $fileTmp = $_FILES['image']['tmp_name'];
    $originalName = basename($_FILES['image']['name']);
    $ext = pathinfo($originalName, PATHINFO_EXTENSION);
    $newFileName = uniqid('news_', true) . '.' . $ext;
    $targetPath = $targetDir . $newFileName;

    if (move_uploaded_file($fileTmp, $targetPath)) {
        $imageURL = "http://" . $_SERVER['HTTP_HOST'] . "/speccompare-api/" . $targetPath;
        echo json_encode([
            "status" => "success",
            "url" => $imageURL
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "ไม่สามารถอัปโหลดไฟล์ได้"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "ไม่พบไฟล์ภาพที่ส่งมา"
    ]);
}
?>
