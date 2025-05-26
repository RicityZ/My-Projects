<?php
header("Content-Type: application/json");

// 1. ตรวจสอบ request
$input = json_decode(file_get_contents("php://input"), true);
$price = $input["price"] ?? "";
$cpu = $input["cpu"] ?? "";
$type = $input["type"] ?? "";

// 2. เตรียม Prompt สำหรับ Gemini
$prompt = "Generate 1 PC build with the following filters:\n";
if ($price) $prompt .= "- Budget: $price Baht\n";
if ($cpu) $prompt .= "- CPU brand: $cpu\n";
if ($type) {
    $typeLabel = [
        "work" => "office work",
        "gaming" => "gaming",
        "graphic" => "graphic design"
    ][$type] ?? $type;
    $prompt .= "- Usage: $typeLabel\n";
}
$prompt .= "Include: CPU, Mainboard, GPU, RAM, SSD, HDD, PSU, Case, and CPU Cooler.\n";
$prompt .= "Reply in this JSON format only. Do not include any explanation:\n";
$prompt .= '{
  "spec_name": "AI Custom Build",
  "price": 25400,
  "compatibility": 100,
  "parts": {
    "cpu": "...",
    "mainboard": "...",
    "gpu": "...",
    "ram": "...",
    "ssd": "...",
    "hdd": "...",
    "psu": "...",
    "case": "...",
    "cooler": "..."
},
  "recommendation": "คำแนะนำหรือจุดเด่นของสเปคนี้ (เป็นภาษาไทย)"
}' . "\n";



// 3. เรียก Gemini API
$apiKey = "AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk"; // 🔐 ใส่ API Key ของคุณ
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk";

$body = [
  "contents" => [[ "parts" => [[ "text" => $prompt ]]]]
];

$options = [
  "http" => [
    "header"  => "Content-type: application/json",
    "method"  => "POST",
    "content" => json_encode($body),
  ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);
if ($response === FALSE) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => "Failed to connect to Gemini"]);
  exit;
}

// 4. แปลงข้อความกลับเป็น JSON
$data = json_decode($response, true);
$text = $data["candidates"][0]["content"]["parts"][0]["text"] ?? "";

// ✅ ใช้ regex เพื่อดึง JSON ตัวแรกที่เจอ
preg_match('/\{(?:[^{}]|(?R))*\}/s', $text, $matches);
$json = $matches[0] ?? '';

$result = json_decode($json, true);

// 5. ตรวจสอบความถูกต้อง
if (!$result || !isset($result["parts"])) {
  echo json_encode([
    "status" => "error",
    "message" => "Invalid format from Gemini",
    "raw" => $text
  ]);
  exit;
}

// 6. ส่งกลับผลลัพธ์ให้ React Native
echo json_encode(["status" => "success", "result" => $result]);
