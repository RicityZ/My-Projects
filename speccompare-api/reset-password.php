<?php
date_default_timezone_set('Asia/Bangkok');

$token = $_GET['token'] ?? '';

$conn = new mysqli("localhost", "root", "", "speccompare");
if ($conn->connect_error) {
    die("DB error");
}

$stmt = $conn->prepare("SELECT id FROM users WHERE reset_token = ? AND reset_token_expire > NOW()");
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "<div class='error-box'>ลิงก์ไม่ถูกต้องหรือหมดอายุแล้ว</div>";
    exit;
}

$row = $result->fetch_assoc();
$userId = $row['id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newPassword = $_POST['new_password'];

    $stmt = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, reset_token_expire = NULL WHERE id = ?");
    $stmt->bind_param("si", $newPassword, $userId);
    $stmt->execute();

    echo "<div class='success-box'>เปลี่ยนรหัสผ่านเรียบร้อยแล้ว</div>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>ตั้งรหัสผ่านใหม่</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');

    body {
      margin: 0;
      padding: 0;
      font-family: 'Prompt', sans-serif;
      background-color: #f0f4ff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .reset-container {
      background-color: #ffffff;
      padding: 40px 30px;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      width: 90%;
      max-width: 400px;
      text-align: center;
    }

    .reset-container h2 {
      color: #007bff;
      margin-bottom: 20px;
    }

    input[type="text"] {
      width: 100%;
      padding: 12px;
      margin-bottom: 20px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
      outline: none;
    }

    button {
      background-color: #007bff;
      color: #fff;
      padding: 12px 24px;
      font-size: 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: 0.2s;
    }

    button:hover {
      background-color: #0056b3;
    }

    .error-box, .success-box {
      font-family: 'Prompt', sans-serif;
      text-align: center;
      margin-top: 20%;
      padding: 20px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
      border-radius: 8px;
      font-size: 18px;
    }

    .error-box {
      background-color: #ffebee;
      color: #d32f2f;
      border: 1px solid #d32f2f;
    }

    .success-box {
      background-color: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #2e7d32;
    }
  </style>
</head>
<body>
  <div class="reset-container">
    <h2>ตั้งรหัสผ่านใหม่</h2>
    <form method="POST">
      <input type="text" name="new_password" placeholder="กรอกรหัสผ่านใหม่" required>
      <button type="submit">ยืนยัน</button>
    </form>
  </div>
</body>
</html>
