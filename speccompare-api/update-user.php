<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "speccompare";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("SET NAMES utf8");

    // รับข้อมูลจาก request
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';
    $first_name = $data['first_name'] ?? '';
    $last_name = $data['last_name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $oldUsername = $data['oldUsername'] ?? $username;

    if (empty($username) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "กรุณาระบุ username และ password"]);
        exit;
    }

    // ตรวจสอบว่าผู้ใช้เดิมมีจริง
    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = :oldUsername");
    $checkStmt->bindParam(':oldUsername', $oldUsername);
    $checkStmt->execute();
    if ($checkStmt->fetchColumn() == 0) {
        echo json_encode(["status" => "error", "message" => "ไม่พบผู้ใช้ที่มี username: $oldUsername"]);
        exit;
    }

    // ตรวจสอบว่าชื่อผู้ใช้ใหม่ซ้ำกับที่มีอยู่ในระบบหรือไม่ (ถ้าชื่อผู้ใช้ถูกเปลี่ยน)
    if ($oldUsername !== $username) {
        $checkNewUsernameStmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
        $checkNewUsernameStmt->bindParam(':username', $username);
        $checkNewUsernameStmt->execute();
        if ($checkNewUsernameStmt->fetchColumn() > 0) {
            echo json_encode(["status" => "error", "message" => "ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว"]);
            exit;
        }
    }

    // เริ่ม transaction เพื่อให้มั่นใจว่าการอัพเดททุกตารางสำเร็จหรือยกเลิกพร้อมกัน
    $conn->beginTransaction();

    // อัปเดตข้อมูลใน users
    $sql = "UPDATE users 
            SET username = :username, 
                password = :password, 
                first_name = :first_name, 
                last_name = :last_name, 
                email = :email, 
                phone = :phone 
            WHERE username = :oldUsername";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':oldUsername', $oldUsername);

    if ($stmt->execute()) {
        // อัปเดต saved_specs.user
        $updateSavedSpecs = $conn->prepare("UPDATE saved_specs SET user = :newUsername WHERE user = :oldUsername");
        $updateSavedSpecs->bindParam(':newUsername', $username);
        $updateSavedSpecs->bindParam(':oldUsername', $oldUsername);
        $updateSavedSpecs->execute();

        // อัปเดต spec_likes.username
        $updateSpecLikes = $conn->prepare("UPDATE spec_likes SET username = :newUsername WHERE username = :oldUsername");
        $updateSpecLikes->bindParam(':newUsername', $username);
        $updateSpecLikes->bindParam(':oldUsername', $oldUsername);
        $updateSpecLikes->execute();

        // Commit transaction
        $conn->commit();
        echo json_encode(["status" => "success", "message" => "บันทึกข้อมูลสำเร็จ"]);
    } else {
        // Rollback transaction ถ้ามีข้อผิดพลาด
        $conn->rollBack();
        echo json_encode(["status" => "error", "message" => "ไม่สามารถอัปเดตข้อมูลในฐานข้อมูลได้"]);
    }
} catch (PDOException $e) {
    // Rollback transaction ถ้ามีข้อผิดพลาด
    if (isset($conn) && $conn->inTransaction()) {
        $conn->rollBack();
    }
    echo json_encode(["status" => "error", "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()]);
}

$conn = null;
?>