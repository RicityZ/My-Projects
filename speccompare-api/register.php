<?php
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);

$host = "localhost";
$db = "speccompare";
$user = "root";
$pass = "";
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'เชื่อมต่อฐานข้อมูลไม่ได้']);
    exit;
}

$username = $data["username"];
$password = $data["password"];
$firstName = $data["firstName"];
$lastName = $data["lastName"];
$email = $data["email"];
$phone = $data["phone"];

$sql = "INSERT INTO users (username, password, first_name, last_name, email, phone, role)
        VALUES ('$username', '$password', '$firstName', '$lastName', '$email', '$phone', 'user')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}
$conn->close();
?>
