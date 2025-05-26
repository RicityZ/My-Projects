<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$spec1 = $data["spec1"] ?? null;
$spec2 = $data["spec2"] ?? null;

if (!$spec1 || !$spec2) {
    echo json_encode(["status" => "error", "message" => "Missing spec data"]);
    exit;
}

$apiKey = "AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk"; // 🔑 เปลี่ยนตรงนี้ให้ถูกต้อง

$prompt = "คุณคือผู้เชี่ยวชาญด้านฮาร์ดแวร์ เปรียบเทียบคอมพิวเตอร์สองฝั่งตามหัวข้อ CPU, GPU, RAM, SSD, HDD, PSU, CASE, MAINBOARD, COOLER ให้ออกมาเป็น JSON ที่มี winner กับ reason เช่น
{
  \"CPU\": { \"winner\": \"ฝั่ง1\", \"reason\": \"เพราะเร็วกว่า\" },
  ...
}

ฝั่ง1: " . json_encode($spec1, JSON_UNESCAPED_UNICODE) . "
ฝั่ง2: " . json_encode($spec2, JSON_UNESCAPED_UNICODE);

$body = json_encode([
  "contents" => [[ "parts" => [[ "text" => $prompt ]] ]],
  "generationConfig" => [
    "temperature" => 0.7,
    "maxOutputTokens" => 1024
  ]
]);

// ✅ ใช้ cURL เพื่อป้องกัน error แบบ <html>
$ch = curl_init("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// ✅ ตรวจเช็คว่า HTTP ตอบกลับ 200 หรือไม่
if ($httpCode !== 200) {
    echo json_encode([
        "status" => "error",
        "message" => "Gemini API error",
        "http_code" => $httpCode,
        "raw" => $response
    ]);
    exit;
}

// ✅ พยายามดึงเฉพาะ JSON ตรงจากข้อความที่ได้
$result = json_decode($response, true);
$text = $result["candidates"][0]["content"]["parts"][0]["text"] ?? "";

// ✅ บันทึก debug (สามารถดูได้บน server)
file_put_contents("debug_gemini.txt", $text);

// ✅ ดึง JSON จากข้อความ
$jsonStart = strpos($text, "{");
if ($jsonStart === false) {
    echo json_encode(["status" => "error", "message" => "No JSON found", "raw" => $text]);
    exit;
}

$json = substr($text, $jsonStart);
$decoded = json_decode($json, true);

if (!$decoded) {
    echo json_encode(["status" => "error", "message" => "แปลง JSON ไม่สำเร็จ", "raw" => $text]);
    exit;
}

echo json_encode(["status" => "success", "result" => $decoded]);
