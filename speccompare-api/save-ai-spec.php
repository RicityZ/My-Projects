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

    $data = json_decode(file_get_contents("php://input"), true);

    $user = $data['user'] ?? '';
    $spec_name = $data['spec_name'] ?? '';
    $spec = json_encode($data['spec'] ?? []);
    $compatibility = $data['compatibility'] ?? 0;
    $recommendation = $data['recommendation'] ?? '';
    $price = $data['price'] ?? 0;
    $category = strtolower($data['category'] ?? '');

    // ✅ ชุดภาพสุ่มตามหมวดหมู่
    $gaming = [
        'https://notebookspec.com/web/wp-content/uploads/2021/01/Omen_Tracer_M_Clearpanel_Aircooledsystem_Intel_noSPDIF_REDled_2080HPModified_Backlit_Woodstock_Daisy_Vortex_Hero_Environment_Gameplay.jpg',
        'https://notebookspec.com/web/wp-content/uploads/2021/01/william2006523-1-780x585.jpg',
        'https://cdn.shopify.com/s/files/1/0724/4247/8904/files/blog1_a74979b0-19d5-4cc2-a422-ea4c6f9e2e57_480x480.png?v=1712740574'
    ];
    $workImages = [
        'https://fortunetown.co.th/wp-content/uploads/2022/01/photo-1614624532983-4ce03382d63d.jpeg',
        'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/09/Items-that-should-be-on-your-Workstation(8).png',
        'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/09/Items-that-should-be-on-your-Workstation(5).png'
    ];
    $graphicImages = [
        'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2022/08/Blog/%E0%B8%88%E0%B8%AD%2032%20%E0%B8%99%E0%B8%B4%E0%B9%89%E0%B8%A7/decor%201.jpg',
        'https://notebookspec.com/web/wp-content/uploads/2021/01/%E0%B8%AA%E0%B9%80%E0%B8%9B%E0%B8%84%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%A3%E0%B8%B2%E0%B8%9F%E0%B8%9F%E0%B8%B4%E0%B8%84-2021-%E0%B8%A2%E0%B9%88%E0%B8%AD-scaled.jpg',
        'https://notebookspec.com/web/wp-content/uploads/2021/01/tophero-PA32UCX-PK-e1610785282634.jpg'
    ];

    // ✅ สุ่มภาพจากหมวดหมู่
    switch ($category) {
        case 'gaming':
            $image_url = $gaming[array_rand($gaming)];
            break;
        case 'work':
            $image_url = $workImages[array_rand($workImages)];
            break;
        case 'graphic':
            $image_url = $graphicImages[array_rand($graphicImages)];
            break;
        default:
            $image_url = '';
    }

    // ✅ บันทึกข้อมูล
    $stmt = $conn->prepare("INSERT INTO saved_specs (user, spec_name, spec, compatibility, recommendation, price, category, image_url, is_ai)
                            VALUES (:user, :spec_name, :spec, :compatibility, :recommendation, :price, :category, :image_url, 1)");

    $stmt->bindParam(':user', $user);
    $stmt->bindParam(':spec_name', $spec_name);
    $stmt->bindParam(':spec', $spec);
    $stmt->bindParam(':compatibility', $compatibility);
    $stmt->bindParam(':recommendation', $recommendation);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':category', $category);
    $stmt->bindParam(':image_url', $image_url);

    if ($stmt->execute()) {
        $id = $conn->lastInsertId(); // ✅ ส่งกลับ ID เพื่อให้กดถูกใจได้
        echo json_encode(["status" => "success", "id" => $id]);
    } else {
        echo json_encode(["status" => "error", "message" => "ไม่สามารถบันทึกข้อมูลได้"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()]);
}
?>
