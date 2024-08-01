<?php
require_once '../db.php';

$stmt = $pdo->query('SELECT * FROM weather_logs ORDER BY created_at DESC');
$weatherLogs = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($weatherLogs);
?>
