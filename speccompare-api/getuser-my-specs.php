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

    $user = isset($_GET['user']) ? $_GET['user'] : '';

    if (empty($user)) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing username"
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $sql = "SELECT * FROM saved_specs WHERE user = :user ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user', $user);
    $stmt->execute();

    $data = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // แปลง spec จาก JSON string → object
        $specDecoded = json_decode($row['spec'], true);

        // ถ้า image_url ว่าง → fallback ไปใช้ spec.gpu หรือ spec.cpu
        if (empty($row['image_url'])) {
            $fallbackImage = $specDecoded['gpu']['image_url']
                ?? $specDecoded['cpu']['image_url']
                ?? null;

            $row['image_url'] = $fallbackImage;
        }

        // เก็บ spec ที่ถูกแปลงแล้ว
        $row['spec'] = $specDecoded;

        $data[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "data" => $data
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>