<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$dbname = "speccompare";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $specName = isset($_GET['spec_name']) ? $_GET['spec_name'] : '';

    if (empty($specName)) {
        echo json_encode(["status" => "error", "message" => "กรุณาระบุ spec_name"]);
        exit;
    }

    $sql = "SELECT * FROM saved_specs WHERE spec_name = :spec_name";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':spec_name', $specName);
    $stmt->execute();

    $spec = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($spec) {
        echo json_encode(["status" => "success", "data" => $spec]);
    } else {
        echo json_encode(["status" => "error", "message" => "ไม่พบข้อมูลสเปค"]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()]);
}
?>
