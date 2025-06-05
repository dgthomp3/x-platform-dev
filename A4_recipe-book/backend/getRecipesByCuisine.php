<?php
header('Content-Type: application/json');

// Require a cuisine parameter
if (!isset($_GET['cuisine']) || empty($_GET['cuisine'])) {
    echo json_encode(['error' => 'Missing cuisine parameter']);
    exit;
}

$cuisineParam = strtolower(trim($_GET['cuisine']));
$directory = __DIR__ . '/recipes';

$filteredRecipes = [];

if (is_dir($directory)) {
    $files = scandir($directory);

    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
            $content = file_get_contents("$directory/$file");
            $data = json_decode($content, true);

            if ($data && isset($data['cuisine']) && strtolower($data['cuisine']) === $cuisineParam) {
                $filteredRecipes[] = $data;
            }
        }
    }
}

echo json_encode($filteredRecipes);