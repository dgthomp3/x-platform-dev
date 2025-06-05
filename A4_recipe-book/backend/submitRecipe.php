<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST method is allowed']);
    exit;
}

$required = ['username', 'title', 'ingredients', 'instructions', 'cuisine', 'difficulty'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(['error' => "Missing field: $field"]);
        exit;
    }
}

$data = [
    'id' => time(),
    'username' => $_POST['username'],
    'title' => $_POST['title'],
    'ingredients' => $_POST['ingredients'],
    'instructions' => $_POST['instructions'],
    'cuisine' => $_POST['cuisine'],
    'difficulty' => $_POST['difficulty'],
    'timestamp' => date('c')
];

error_log("DIR: " . __DIR__);
$directory = __DIR__ . '/recipes';
if (!is_dir($directory)) {
    mkdir($directory, 0755, true);
}

// Save each recipe as a JSON file
$filename = $directory . '/' . $data['id'] . '.json';
error_log("Saving to: $filename");
$result = file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));

if ($result === false) {
    echo json_encode(['success' => false, 'error' => 'Failed to write file.']);
} else {
    echo json_encode(['success' => true, 'id' => $data['id']]);
}
?>