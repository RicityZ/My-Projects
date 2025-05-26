<?php
$host = 'localhost';
$user = 'root';
$password = ''; // ถ้ามีรหัสผ่านให้ใส่
$database = 'speccompare';

$conn = new mysqli($host, $user, $password, $database);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
